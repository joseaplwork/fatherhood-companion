import { auth, currentUser } from "@clerk/nextjs/server";
import {
  AI_CONFIG,
  anthropic,
  buildCompanionSystemPrompt,
  CRISIS_RESOURCES,
  containsCrisisKeyword,
  generateSummary,
  shouldSummarize,
} from "@fatherhood-companion/ai";
import { db } from "@fatherhood-companion/db";
import type { ChildProfile } from "@fatherhood-companion/domain";
import { streamText } from "ai";
import type { NextRequest } from "next/server";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { messages } = (await req.json()) as { messages: IncomingMessage[] };

  // Children come from Clerk private metadata — never stored in our DB
  const user = await currentUser();
  const children = (user?.privateMetadata?.children ?? []) as ChildProfile[];

  // Mood average over the last 7 days for context
  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setUTCHours(0, 0, 0, 0);
  const recentMoods = await db.moodEntry.findMany({
    where: { clerkUserId: userId, date: { gte: since } },
    select: { mood: true },
  });
  const moodAverage =
    recentMoods.length > 0
      ? Math.round(
          (recentMoods.reduce((sum: number, m: { mood: number }) => sum + m.mood, 0) /
            recentMoods.length) *
            10,
        ) / 10
      : null;

  // Get or create the single active AI Buddy conversation
  let conversation = await db.aIConversation.findFirst({
    where: { clerkUserId: userId, archivedAt: null },
    orderBy: { updatedAt: "desc" },
  });
  if (!conversation) {
    conversation = await db.aIConversation.create({
      data: { clerkUserId: userId, title: "AI Buddy" },
    });
  }
  const conversationId = conversation.id;

  const systemPrompt = buildCompanionSystemPrompt({
    moodAverage,
    conversationSummary: conversation.summary,
    children,
  });

  // Fast keyword crisis check before the LLM round-trip
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const hasCrisis = lastUserMessage ? containsCrisisKeyword(lastUserMessage.content) : false;
  const system = hasCrisis
    ? `${systemPrompt}\n\nIMPORTANT: The user has expressed crisis signals. Respond with empathy first, then include these resources:\n${CRISIS_RESOURCES}`
    : systemPrompt;

  const currentMessageCount = await db.conversationMessage.count({
    where: { conversationId },
  });

  const result = streamText({
    model: anthropic(AI_CONFIG.model),
    system,
    messages,
    maxTokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
    onFinish: async ({ text, usage }) => {
      if (!lastUserMessage) return;

      // Persist user + assistant turn atomically
      await db.$transaction([
        db.conversationMessage.create({
          data: {
            conversationId,
            role: "USER",
            content: lastUserMessage.content,
            tokensUsed: 0,
          },
        }),
        db.conversationMessage.create({
          data: {
            conversationId,
            role: "ASSISTANT",
            content: text,
            tokensUsed: usage.completionTokens,
          },
        }),
        db.aIConversation.update({
          where: { id: conversationId },
          data: {
            tokensUsed: { increment: usage.totalTokens },
            ...(moodAverage !== null && { moodContext: Math.round(moodAverage) }),
          },
        }),
      ]);

      // Rolling summary: compress history after threshold
      const newCount = currentMessageCount + 2;
      if (shouldSummarize(newCount)) {
        const allMessages = await db.conversationMessage.findMany({
          where: { conversationId },
          orderBy: { createdAt: "asc" },
          select: { role: true, content: true },
        });
        const summary = await generateSummary(
          allMessages.map((m: { role: string; content: string }) => ({
            role: m.role as "USER" | "ASSISTANT",
            content: m.content,
          })),
        );
        await db.aIConversation.update({
          where: { id: conversationId },
          data: { summary },
        });
      }
    },
  });

  return result.toDataStreamResponse();
}

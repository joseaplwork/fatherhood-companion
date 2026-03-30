import { auth } from "@clerk/nextjs/server";
import { db } from "@fatherhood-companion/db";

export type ChatMessageRow = {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: Date;
};

/**
 * Returns the most recent 50 messages from the user's active AI Buddy conversation.
 * Returns an empty array if no conversation exists yet (first visit).
 */
export async function getActiveConversationMessages(): Promise<ChatMessageRow[]> {
  const { userId } = await auth();
  if (!userId) return [];

  const conversation = await db.aIConversation.findFirst({
    where: { clerkUserId: userId, archivedAt: null },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        take: 50,
        select: { id: true, role: true, content: true, createdAt: true },
      },
    },
  });

  return conversation?.messages ?? [];
}

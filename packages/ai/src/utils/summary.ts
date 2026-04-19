import { generateText } from "ai";
import { SUMMARY_TRIGGER_COUNT } from "@/grove-companion/domain";

import { buildSummarizePrompt } from "../prompts/summarize";
import { getAIModel } from "../providers";

export type MessageLike = {
  role: "USER" | "ASSISTANT";
  content: string;
};

/** Returns true when a conversation has crossed the summary threshold */
export function shouldSummarize(messageCount: number): boolean {
  return messageCount >= SUMMARY_TRIGGER_COUNT;
}

/** Compress a list of messages into a rolling summary string */
export async function generateSummary(messages: MessageLike[]): Promise<string> {
  const conversationText = messages
    .map((m) => `${m.role === "USER" ? "User" : "Companion"}: ${m.content}`)
    .join("\n");

  const { text } = await generateText({
    model: getAIModel(),
    prompt: buildSummarizePrompt(conversationText),
    maxTokens: 256,
  });

  return text.trim();
}

import { SUMMARY_TRIGGER_COUNT } from "@fatherhood-companion/domain";
import { generateText } from "ai";
import { AI_CONFIG, anthropic } from "../config";
import { buildSummarizePrompt } from "../prompts/summarize";

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
    .map((m) => `${m.role === "USER" ? "Dad" : "Companion"}: ${m.content}`)
    .join("\n");

  const { text } = await generateText({
    model: anthropic(AI_CONFIG.model),
    prompt: buildSummarizePrompt(conversationText),
    maxTokens: 256,
  });

  return text.trim();
}

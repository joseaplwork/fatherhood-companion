import { createAnthropic } from "@ai-sdk/anthropic";

export const anthropic = createAnthropic();

/** Single place to change the model version for all AI calls */
export const DEFAULT_MODEL = "claude-sonnet-4-6" as const;

export const AI_CONFIG = {
  model: DEFAULT_MODEL,
  maxTokens: 1024,
  temperature: 0.7,
} as const;

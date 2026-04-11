import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModelV1 } from "ai";

/**
 * Returns a model backed by Google AI Studio (free-tier compatible).
 *
 * Environment variables:
 *   GOOGLE_AI_API_KEY — required; obtain from https://aistudio.google.com/app/apikey
 *   GOOGLE_MODEL      — defaults to "gemini-2.0-flash"
 */
export function createGoogleModel(): LanguageModelV1 {
  const model = process.env.GOOGLE_MODEL ?? "gemini-2.0-flash";
  const provider = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
  return provider(model);
}

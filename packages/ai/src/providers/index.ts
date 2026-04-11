import type { LanguageModelV1 } from "ai";

import { createGoogleModel } from "./google";
import { createOllamaModel } from "./ollama";
import type { AIProviderName } from "./types";

export type { AIProviderName };

/**
 * Single entry point for obtaining an AI model instance.
 *
 * Reads AI_PROVIDER from the environment and returns the corresponding
 * LanguageModelV1. All call sites use this function — never instantiate a
 * provider SDK directly outside this module.
 *
 * AI_PROVIDER values:
 *   "ollama"  — local Ollama Docker container (default for local dev)
 *   "google"  — Google AI Studio free tier (default for production)
 */
export function getAIModel(): LanguageModelV1 {
  const provider = (process.env.AI_PROVIDER ?? "ollama") as AIProviderName;
  switch (provider) {
    case "google":
      return createGoogleModel();
    default:
      return createOllamaModel();
  }
}

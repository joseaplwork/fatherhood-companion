import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModelV1 } from "ai";

/**
 * Returns a model backed by a local Ollama instance.
 * Ollama exposes an OpenAI-compatible API, so the @ai-sdk/openai adapter works
 * by pointing its baseURL at the Ollama endpoint.
 *
 * Environment variables:
 *   OLLAMA_BASE_URL — defaults to "http://localhost:11434/v1"
 *   OLLAMA_MODEL    — defaults to "llama3.2"
 */
export function createOllamaModel(): LanguageModelV1 {
  const baseURL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1";
  const model = process.env.OLLAMA_MODEL ?? "llama3.2";
  const provider = createOpenAI({ baseURL, apiKey: "ollama" });
  return provider(model);
}

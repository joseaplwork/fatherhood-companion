// Configuration
export { AI_CONFIG } from "./config";
// Prompts
export type { CompanionContext } from "./prompts/companion";
export { buildCompanionSystemPrompt } from "./prompts/companion";
export type { InsightsContext } from "./prompts/insights";
export { buildInsightsPrompt } from "./prompts/insights";
export { buildSummarizePrompt } from "./prompts/summarize";
// Providers
export type { AIProviderName } from "./providers";
export { getAIModel } from "./providers";
// Tools
export { CRISIS_RESOURCES, containsCrisisKeyword, crisisCheckTool } from "./tools/crisis-check";
// Utilities
export type { MessageLike } from "./utils/summary";
export { generateSummary, shouldSummarize } from "./utils/summary";

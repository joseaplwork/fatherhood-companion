// Configuration
export { AI_CONFIG, anthropic, DEFAULT_MODEL } from "./config";
export type { CompanionContext } from "./prompts/companion";
// Prompts
export { buildCompanionSystemPrompt } from "./prompts/companion";
export type { InsightsContext } from "./prompts/insights";
export { buildInsightsPrompt } from "./prompts/insights";
export { buildSummarizePrompt } from "./prompts/summarize";
// Tools
export { CRISIS_RESOURCES, containsCrisisKeyword, crisisCheckTool } from "./tools/crisis-check";
export type { MessageLike } from "./utils/summary";
// Utilities
export { generateSummary, shouldSummarize } from "./utils/summary";

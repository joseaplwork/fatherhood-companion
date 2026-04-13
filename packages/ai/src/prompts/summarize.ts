export function buildSummarizePrompt(conversationText: string): string {
  return `You are summarizing a support conversation between a co-parent and an AI companion. Create a concise summary (2-4 sentences) that captures:
- The main emotional themes and concerns discussed
- Any important context about their children or situation
- The general emotional state and trajectory of the conversation

This summary will be used to give the AI companion context in future conversations, so focus on what matters most for continuity of care.

Conversation to summarize:
${conversationText}

Summary:`.trim();
}

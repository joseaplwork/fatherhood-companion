# ADR 0004 — AI Integration

## Status

Superseded by [ADR 0007 — AI Provider Abstraction](./0007-ai-provider-abstraction.md).
The Vercel AI SDK and prompt/tool conventions below remain in force; only the provider coupling
(Anthropic-specific) has been replaced by the `getAIModel()` factory.

## Context

AI is a first-class feature across all five pillars. The chat support pillar requires
streaming responses. Other pillars require AI-generated insights, recommendations, and
content enhancements. A consistent, Next.js-native approach is needed.

## Decision

Use the **Vercel AI SDK** (`ai` package) with the **Anthropic Claude** provider.

- All AI interactions go through the Vercel AI SDK — never call the Anthropic API directly
  from application code.
- The AI SDK handles streaming, tool calls, and message formatting in a Next.js-compatible way.
- Claude is the default model for all AI features. The specific model version is configured
  in a single `lib/ai/config.ts` file — never hardcoded at the call site.
- Prompt templates and system prompts live in `lib/ai/prompts/` (or `packages/ai` once
  that package is extracted). They are plain TypeScript strings or functions — never
  embedded inline in route handlers or server actions.
- Conversation history passed to the AI is compressed using the rolling summary stored
  in `AIConversation.summary` to stay within context limits.

## Consequences

- Switching Claude model versions requires changing one config value.
- Streaming chat responses use the AI SDK's `streamText` / `useChat` utilities.
- Prompt logic is centralized and testable independently of route handlers.
- Cost tracking is possible because `tokens_used` is recorded on each `ConversationMessage`.

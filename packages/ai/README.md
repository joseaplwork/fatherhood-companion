# @fatherhood-companion/ai

## Responsibility

`packages/ai` wraps the Vercel AI SDK and Anthropic Claude provider. It owns all prompt
templates, the streaming utility, rolling summary logic, and the crisis-detection tool definition.

## Public API

- `streamCompanion` — streamText wrapper for Buddy Support chat.
- `generateSummary` — compresses a conversation into a rolling summary.
- `detectCrisis` — evaluates a message for distress signals.
- `getInsights` — generates dashboard mood pattern insights.
- Exported from `src/index.ts` only.

## Allowed Dependencies

- `ai` (Vercel AI SDK)
- `@ai-sdk/anthropic`
- `@fatherhood-companion/domain` (types and constants)

## Forbidden Dependencies

- No imports from any app workspace.
- No React or Next.js code.
- No database access — this package is pure AI logic.

## Notes

- Model version is configured in `src/config.ts`. Changing it there changes it everywhere.
- Crisis detection keywords come from `@fatherhood-companion/domain` constants.

# Grove Companion

AI-first pnpm monorepo for building products with predictable code generation, hard architectural boundaries, and explicit learning loops.

## Workspace Layout

- `apps/*`: deployable applications and composition roots.
- `packages/*`: reusable modules with explicit public APIs.
- `docs/ai/*`: operating rules, boundaries, and the mistake log that future feature work must learn from.
- `scripts/*`: framework-agnostic automation that validates repo contracts.

## Commands

- `pnpm dev:web`: run the Next.js app in `apps/web`.
- `pnpm dev:ui`: run Storybook for `packages/ui`.
- `pnpm lint`: run Biome across the repo.
- `pnpm typecheck`: run workspace type-checking.
- `pnpm check:docs`: verify required AI/project docs are present.
- `pnpm check:context`: ensure the generated AI context index is up to date.
- `pnpm check:boundaries`: enforce cross-workspace import boundaries.
- `pnpm guardrails`: run the repo checks AI-generated changes must satisfy.
- `pnpm context:update`: regenerate `docs/ai/context-index.generated.md`.

## AI-First Rules

1. Read [AGENTS.md](./AGENTS.md) before implementing changes with an AI assistant.
2. Treat [docs/ai/boundaries.md](./docs/ai/boundaries.md) as the architecture contract.
3. When a bug or regression happens, update [docs/ai/mistake-log.md](./docs/ai/mistake-log.md) in the same change.
4. Run `pnpm guardrails` before considering an AI-generated change complete.

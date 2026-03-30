# Claude Working Agreement

This file is loaded automatically by Claude Code at the start of every session. It is the single source of truth for rules, reading order, and definition of done.

## Read These First

Before implementing any change:

1. [README.md](./README.md)
2. [docs/product/vision.md](./docs/product/vision.md)
3. [DESIGN.md](./DESIGN.md)
4. [docs/ai/operating-model.md](./docs/ai/operating-model.md)
5. [docs/ai/boundaries.md](./docs/ai/boundaries.md)
6. [docs/ai/domain-model.md](./docs/ai/domain-model.md)
7. [docs/ai/coding-conventions.md](./docs/ai/coding-conventions.md)
8. [docs/ai/context-index.generated.md](./docs/ai/context-index.generated.md)
9. [docs/ai/mistake-log.md](./docs/ai/mistake-log.md)
10. The README inside each impacted workspace
11. The relevant ADR(s) in [docs/decisions/](./docs/decisions/) for any tech choice touched

## Non-Negotiable Rules

- Prefer explicit public APIs over deep imports or hidden coupling.
- Keep deployable logic in `apps/*` and reusable logic in `packages/*`.
- Never import an app from another workspace.
- Never deep import another workspace's internal files.
- Make architectural constraints executable through scripts whenever possible.
- If you add or remove a workspace or change a `package.json` script, run `pnpm context:update` and stage the result in the same commit.
- If a bug exposes a repeated failure mode, update the mistake log and either add automation or tighten docs in the same change.

## Definition Of Done

- The change is bounded to the correct workspace.
- Public APIs remain explicit.
- Documentation is updated if the repo contract changed.
- `pnpm guardrails` passes.

## Commands

- `pnpm guardrails` — full validation gate (lint, typecheck, docs, context, boundaries)
- `pnpm context:update` — regenerate `docs/ai/context-index.generated.md`
- `pnpm lint:fix` — auto-fix lint issues

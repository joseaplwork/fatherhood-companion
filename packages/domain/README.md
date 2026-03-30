# @fatherhood-companion/domain

## Responsibility

`packages/domain` is the single source of truth for all shared TypeScript types, enums, and pure
business rule constants used across the monorepo. It has zero runtime dependencies and no
framework code.

## Public API

- Export all types, enums, and constants through `src/index.ts`.
- Treat anything not exported from `src/index.ts` as a private implementation detail.

## Forbidden Dependencies

- No runtime dependencies (only TypeScript types).
- No imports from any app or other package.
- No React, no Node.js APIs, no framework code.

## Notes

- Types here mirror the Prisma schema but are framework-agnostic.
- Enums here are the canonical source; Prisma enums are derived from these.

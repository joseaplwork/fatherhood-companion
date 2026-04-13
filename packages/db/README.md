# @grove-companion/db

## Responsibility

`packages/db` owns the Prisma schema, database migrations, and a singleton PrismaClient wrapper.
It is the single source of truth for all database structure and access.

## Public API

- `db` — singleton `PrismaClient` instance (exported from `src/index.ts`).
- Treat internal Prisma migration files as private implementation detail.

## Allowed Dependencies

- `@prisma/client` — generated database client.

## Forbidden Dependencies

- No imports from any app workspace.
- No React or framework code.
- No business logic — this package only provides DB access primitives.

## Notes

- Run `pnpm --filter @grove-companion/db db:generate` after schema changes.
- Run `pnpm --filter @grove-companion/db db:migrate` to apply migrations.
- `DATABASE_URL` must be set in `.env.local` at the repo root or in the consuming app.

# ADR 0006 — Validation and Forms

## Status

Decided

## Context

Data validation is needed at server action boundaries and optionally at the form level for
immediate user feedback. The approach must be type-safe and consistent across the codebase.

## Decision

Use **Zod** for all runtime validation. Use **React Hook Form** with the Zod resolver for
form state management.

- **Zod schemas** are the single source of truth for the shape of data entering the system.
  Every server action validates its input against a Zod schema before processing.
- Zod schemas live in `lib/schemas/[domain].ts` — co-located with the actions that use them.
- **React Hook Form** handles form field state, dirty tracking, and submission on the client.
  It is wired to the Zod schema via `@hookform/resolvers/zod` so client-side and server-side
  validation share the same rules.
- Form components (inputs, selects, etc.) remain dumb atoms/molecules in `packages/ui`.
  React Hook Form's `register` and `Controller` are used in molecules or views, not in atoms.

## Consequences

- TypeScript types for validated data can be inferred from Zod schemas with `z.infer<>`.
- Client and server validation are never out of sync — the same schema runs on both sides.
- Form state (touched, dirty, errors) is owned by React Hook Form, not `useState`.
  This is the one exception to the "useState only" state rule — form state is framework-managed.

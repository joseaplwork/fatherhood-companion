# ADR 0003 — State Management

## Status

Decided

## Context

The app needs a clear, consistent approach to client-side state to keep components predictable
and testable. The design separates dumb presentational components from smart view components,
which reduces the need for complex global state.

## Decision

Use only **`useState`** and **`useContext`** for client-side state. No external state
management libraries are introduced.

| Pattern | When to use |
|---|---|
| `useState` | Local UI state scoped to a single component (toggle open/closed, form field value, active step in a wizard) |
| `useContext` | Shared ambient state needed across a component subtree without drilling (current user profile, active conversation, theme) |

**Server state is not managed on the client.** Data fetched from the database lives in
Server Components and is passed down as props. Mutations use Server Actions followed by
`revalidatePath` / `revalidateTag` to trigger a server re-fetch.

## Consequences

- No dependency on Zustand, Redux, Jotai, TanStack Query, or similar libraries.
- Client bundle stays minimal — no state library overhead.
- The prop drilling limit (max 3 levels) enforced in `docs/ai/coding-conventions.md` keeps
  context usage intentional rather than a workaround for poor component design.
- Complex optimistic UI patterns (if needed in the future) must be implemented with
  `useOptimistic` (React 19 built-in) rather than a third-party library.

# ADR 0005 — Testing

## Status

Decided

## Context

Tests are required to give the guardrails a behavioral gate, not just a structural one.
The testing approach must align with the atomic design architecture: dumb components are
easy to test in isolation; smart views need integration-level testing.

## Decision

Use **Vitest** as the test runner with **React Testing Library** for component tests.

- Unit tests: pure functions, utilities, and server action logic.
- Component tests: atoms, molecules, and organisms tested in isolation via React Testing Library.
  Test behavior (what the user sees and can do), not implementation details.
- View tests: integration-level tests that render a view with mocked server data and assert
  the correct organisms are rendered and interactions trigger the correct actions.
- No snapshot tests — they couple tests to markup rather than behavior.
- Test files live in a `__tests__/` directory adjacent to the code they test, or in a
  workspace-level `tests/` directory for integration tests.

`pnpm test` is added to `pnpm guardrails` so tests must pass before a change is considered done.

## Consequences

- Vitest is fast and shares the same config as the TypeScript build — no separate Babel setup.
- React Testing Library encourages testing from the user's perspective, which aligns with
  the dumb/smart component boundary.
- E2E tests (Playwright) are deferred until the first stable screen exists. When added, they
  will be a separate `pnpm test:e2e` command.

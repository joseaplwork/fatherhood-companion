# AI Operating Model

## Goal

Produce code that stays predictable across feature requests by making constraints explicit, machine-checkable, and easy to discover.

## Core Principles

- Prefer small public APIs over implicit coupling.
- Keep domain decisions close to the code that owns them.
- Move reusable logic into packages instead of copying it between apps.
- Keep framework code at the edges and stable contracts in shared modules.
- Turn repeated mistakes into either automation or durable documentation.

## Delivery Loop

1. Identify the bounded context and target workspace before writing code.
2. Change the smallest possible public surface first.
3. Keep internal modules cohesive and easy to explain.
4. Validate with `pnpm guardrails`.
5. If the work changed repo contracts, update the relevant docs.
6. If the work fixed a defect or regression, add a mistake log entry with the new safeguard.

## When A Change Becomes A Rule

Promote a local fix into a repo rule when one of these is true:

- The same mistake can happen in multiple workspaces.
- An AI assistant is likely to repeat the mistake.
- The rule can be checked automatically.
- A future contributor would not infer the constraint from code alone.

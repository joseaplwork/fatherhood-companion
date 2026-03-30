# Architecture Boundaries

## Workspace Boundaries

- `apps/*` are deployable applications and composition roots.
- `packages/*` are reusable modules.
- Packages may depend on packages.
- Apps may depend on packages.
- Packages must never depend on apps.
- Apps must never import other apps.

## Import Rules

- Cross-workspace imports must use the target workspace package name.
- Deep imports into another workspace are forbidden.
- Relative imports must stay inside the current workspace root.
- Every cross-workspace dependency must be declared in `package.json`.

## Public API Rules

- Each reusable package should expose a small, explicit public API.
- Internal implementation files are private unless re-exported intentionally.
- Composition belongs in apps; reusable capabilities belong in packages.

## Internal Design Guidance

Use these layers when a workspace grows large enough to need them:

- `domain`: business rules, pure models, and invariants.
- `application`: use cases and orchestration.
- `infrastructure`: IO, SDK, storage, and framework adapters.
- `presentation`: UI, routes, controllers, and composition.

Keep dependencies moving inward. The more stable the rule, the closer it should live to `domain`.

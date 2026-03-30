# UI Package

## Responsibility

`packages/ui` contains reusable interface primitives and Storybook stories for validating them in isolation.

## Public API

- Export reusable components through `src/index.ts`.
- Treat anything not exported from `src/index.ts` as private implementation detail.

## Forbidden Dependencies

- Imports from any app workspace.
- Deep imports into another workspace.
- Product-specific logic that belongs in an app or a domain package.

## Notes

- Storybook is the proving ground for component behavior and documentation.
- Keep the package reusable and presentation-focused.

# ADR 0002 — Styling

## Status

Decided

## Context

A consistent, scalable styling approach is required across the design system (`packages/ui`)
and the app (`apps/web`). The approach must support the atomic design hierarchy and produce
predictable output across all components.

## Decision

Use **Tailwind CSS v4** as the sole styling mechanism.

- All visual styles are expressed as Tailwind utility classes directly in JSX.
- No CSS Modules, no styled-components, no inline `style` props for layout or theme values.
- Design tokens (colors, spacing, typography, radius) are defined in the Tailwind config and
  are the single source of truth — never hardcoded values in component classes.
- `packages/ui` owns the Tailwind config and design tokens. `apps/web` extends it.

## Consequences

- Component styles are co-located with component markup — no context switching.
- The design system's token layer (in Tailwind config) is the only place to change brand values.
- Tailwind's purging ensures only used classes are shipped.
- Contributors must understand Tailwind utility classes. No custom CSS is written except
  for cases where Tailwind has no equivalent (documented on a case-by-case basis in the
  mistake log).

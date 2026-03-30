# Mistake Log

This file is the permanent memory for failures the repository should not repeat.

## Entry Template

Use this structure for every new entry:

- `Date`:
- `Area`:
- `Symptom`:
- `Root cause`:
- `Prevention`:
- `Automation or docs updated`:

## Entries

---

- `Date`: 2026-03-30
- `Area`: `packages/ui` — `CalendarGrid` component
- `Symptom`: Calendar displayed month number ("03") instead of name, and days stacked vertically instead of forming a grid.
- `Root cause`: Destructuring order was reversed: `const [monthStr, yearStr] = month.split("-")` when the `month` prop format is `"YYYY-MM"`. This made `monthStr = "2026"` and `yearStr = "03"`, causing `monthIndex = 2025` (an invalid array index) and the year label to show "03".
- `Prevention`: When destructuring the result of `split("-")` on a date-like string, always match the order to the format. Use named intermediate variables if the format is non-obvious. Add a unit test for `CalendarGrid` covering the month label output.
- `Automation or docs updated`: N/A — fix was a one-line swap.

---

- `Date`: 2026-03-30
- `Area`: `apps/web` — Tailwind v4 CSS setup
- `Symptom`: Tailwind utility classes from `packages/ui` components (e.g. `grid-cols-7`, `bg-primary`, `text-on-surface`) were not generated in the compiled CSS. UI components rendered completely unstyled.
- `Root cause`: Two compounding issues: (1) The `@source` directive path in `globals.css` was computed relative to the CSS file location (`apps/web/app/globals.css`), not the project root. The path `../../packages/ui/src` resolved to `apps/packages/ui/src` (nonexistent). (2) Even after correcting the path, Tailwind's PostCSS plugin is initialised once at server startup. Editing the CSS file triggers a hot reload of the CSS but does NOT re-run PostCSS plugin initialisation — so the new `@source` path is never picked up without a full cold restart (`Ctrl+C` → `pnpm dev`).
- `Prevention`: (1) When adding `@source` directives, always count directory levels from the CSS file, not the project root. The CSS file lives at `apps/web/app/` — three levels up (`../../../`) reaches the monorepo root. Use an explicit glob: `@source "../../../packages/ui/src/**/*.tsx"`. (2) After any change to `@source` directives, a full dev server restart is required. Hot reload is insufficient.
- `Automation or docs updated`: N/A — path corrected in `globals.css`.

---

- `Date`: 2026-03-30
- `Area`: `apps/web/views` — Biome lint false positive
- `Symptom`: `biome check` reported `useValidAriaRole` errors on `<ChatMessage role="assistant" ...>` even though `ChatMessage` is a custom React component, not an HTML element.
- `Root cause`: Biome's `useValidAriaRole` rule fires on any JSX prop named `role` regardless of whether the element is a native HTML element or a custom component. Passing `role="assistant"` directly as a JSX prop triggers the rule because `"assistant"` is not a valid ARIA role.
- `Prevention`: When a custom component has a prop named `role` that carries domain values (not ARIA roles), pass it via object spread: `const msg = { role: "assistant" as const, ... }; <ChatMessage {...msg} />`. This avoids the static analysis pattern that triggers the false positive.
- `Automation or docs updated`: N/A — pattern documented here for future reference.

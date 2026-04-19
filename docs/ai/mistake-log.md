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

- `Date`: 2026-04-19
- `Area`: `packages/ui`, `apps/web` — domain constant duplication
- `Symptom`: `MOOD_LABELS`, `MOOD_EMOJIS`, `RESOURCE_CATEGORY_LABELS` were redefined locally inside `diary-entry-card.tsx` and `resource-meta.tsx`. `InterestKey`/`INTEREST_KEYS`/`INTEREST_LABELS` were redefined in `lib/schemas/onboarding.ts` and `views/onboarding/` — duplicating `ResourceCategory`/`RESOURCE_CATEGORY_VALUES`/`RESOURCE_CATEGORY_LABELS` which already existed in `packages/domain`.
- `Root cause`: New code was written without checking the Domain Constants Registry in `coding-conventions.md`. Constants that belong to `packages/domain` were re-invented locally because the registry was not consulted.
- `Prevention`: Before defining any constant that maps an enum to a label, check the Domain Constants Registry table in `coding-conventions.md`. If the constant already exists in `packages/domain`, import it — do not copy it. If it doesn't exist and it is domain-level (used in more than one workspace or by the AI layer), add it to `packages/domain` and register it in the table.
- `Automation or docs updated`: `coding-conventions.md` — Domain Constants Registry updated with `RESOURCE_CATEGORY_VALUES`; Import Aliases section added; "What Not To Do" already lists "No redefining constants that already exist in `@domain/constants`".

---

- `Date`: 2026-04-19
- `Area`: `apps/web/lib` — authentication and session design
- `Symptom`: `getAuthUserId()` was calling `db.userProfile.upsert()` (an `ensureUserProfile` side effect) inside a function whose name implied a pure Clerk read. This caused a DB write on every authenticated request, hid the side effect from callers, and made the function untestable without a database.
- `Root cause`: Defensive workaround — "upsert in case the webhook hasn't fired yet" — was baked into the hot path instead of being addressed at the source. The webhook is the canonical profile creation path; defensive hot-path upserts mask missing webhook reliability, create hidden coupling, and scale poorly.
- `Prevention`: Auth boundary functions (`lib/auth.ts`) are pure Clerk calls only — no DB access. `lib/session.ts` resolves the session with a plain `findUnique`; it does not create records. Profile creation belongs exclusively in the `user.created` webhook handler.
- `Automation or docs updated`: `docs/ai/coding-conventions.md` — Session Contract section added.

---

- `Date`: 2026-04-19
- `Area`: `packages/db/prisma/schema.prisma` — foreign key design
- `Symptom`: `providerUserId` (Clerk external ID) was used as the FK field on all 11 child models, spreading an external auth provider concept across the entire database schema. Changing auth providers or Clerk account IDs would require migrating every child table.
- `Root cause`: Identity records were related directly to the Clerk ID rather than through an internal stable key. The application-internal `UserProfile.id` was not used as the FK.
- `Prevention`: Only `UserProfile` holds `providerUserId` — as the bridge between Clerk and the DB. All other models use `userId → UserProfile.id` (internal cuid). Auth provider concepts must not leak past the `UserProfile` row.
- `Automation or docs updated`: `docs/ai/domain-model.md` — UserProfile section and relationship diagram updated.

---

- `Date`: 2026-03-31
- `Area`: `apps/web` — TypeScript strict mode across monorepo workspaces
- `Symptom`: CI `typecheck` fails with `TS7006: Parameter implicitly has an 'any' type` on `reduce` callback parameters (`sum`, `m`) and on `map` callback parameters inside nested `async` callbacks.
- `Root cause`: Two patterns: (1) TypeScript's strict mode requires the `reduce` accumulator to have an explicit type annotation when the initial value alone isn't sufficient for inference across workspace boundaries — `array.reduce((sum, m) => ...)` must be `array.reduce((sum: number, m) => ...)`. (2) Callback parameter types inside deeply nested async functions (e.g. `onFinish` → `allMessages.map((m) =>)`) may not be inferred when Prisma client types are resolved across workspace package boundaries in CI.
- `Prevention`: Always annotate the accumulator in `reduce` calls: `reduce((sum: number, m) => ...)`. When calling `.map()` or `.filter()` inside nested async callbacks that operate on Prisma query results, annotate `m` explicitly if the query uses `select`.
- `Automation or docs updated`: N/A — rule documented here.

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

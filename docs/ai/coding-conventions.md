# Coding Conventions

Rules for how code is written in this repo. These complement the Biome formatter/linter config
and the architecture boundaries in `docs/ai/boundaries.md`.

---

## Component Architecture: Atomic Design

This codebase follows **strict atomic design**. Every UI element has an explicit level, and that
level determines which workspace owns it.

### Levels and Ownership

| Level | Description | Owner |
|---|---|---|
| **Atom** | Smallest indivisible UI primitive. No business knowledge. | `packages/ui` |
| **Molecule** | Composed of atoms. Still no business knowledge. | `packages/ui` |
| **Organism** | Complex, self-contained UI section. No business knowledge. | `packages/ui` |
| **Template** | Page-level layout skeleton. Defines regions, no real data. | `packages/ui` |
| **View** | Connects business logic to a template. Smart component. | `apps/web/views/` |
| **Page** | Next.js route file. Server-side only — fetches data, renders a view. | `apps/web/app/` |

**The boundary:** `packages/ui` goes up through Organism. Template and Views and above live in `apps/web`.
Views are the only place where business logic and UI meet. Pages are the only place where
server-side rendering happens.

### What "dumb" means

An atom, molecule, organism, or template:
- Receives all its data through props.
- Has no knowledge of the application domain (no user, no conversation, no mood entry).
- Has no server calls, no context reads, no business logic.
- Can use `useState` for purely local UI state (e.g., open/closed, active tab).

### What a View does

A view (`apps/web/views/`):
- Receives server-fetched data as props from the page.
- Orchestrates `useState` and `useContext` for client interaction state.
- Calls server actions for mutations.
- Composes organisms and templates from `packages/ui` into a real, data-connected screen.

### What a Page does

A Next.js page file (`apps/web/app/**/page.tsx`):
- Is a React Server Component by default.
- Fetches data from the database or external APIs.
- Passes data down to the corresponding view.
- Never contains JSX presentation logic beyond rendering the view.

---

## Prop Drilling Rule

**Props must not be drilled more than 3 component levels deep.**

If a value needs to travel more than 3 levels through the component tree, that is a signal to
refactor — not to add another prop.

When this limit is reached, choose one of:

1. **Split into a new sub-view.** Extract the subtree into a dedicated view that receives
   the data directly and owns its own connecting logic. This is the preferred option when the
   subtree represents a distinct piece of the screen.
2. **Introduce a `useContext`.** If the data is genuinely ambient (e.g., current user, theme,
   active conversation), create a context and consume it at the leaf without drilling.

Never work around this rule by merging unrelated concerns into a shared object just to reduce
prop count. Fewer props is not the goal — shallower coupling is.

---

## State Management

The only state primitives used in this codebase are `useState` and `useContext`.

| Pattern | When to use |
|---|---|
| `useState` | Local UI state within a single component (toggle, form input, active step) |
| `useContext` | Shared client state needed across multiple components in a subtree |

No external state management libraries (Zustand, Redux, Jotai, etc.) are used.

For server state (data that lives in the database):
- Fetch in Server Components and pass down as props.
- Mutate with Server Actions, then use `revalidatePath` / `revalidateTag` to refresh.
- Do not replicate server data into client state.

---

## File and Directory Structure

### `packages/ui`

```
src/
  atoms/          # Button, Input, Label, Avatar, Icon, Badge, Spinner...
  molecules/      # FormField, SearchBar, MoodPicker, UserCard...
  organisms/      # PostCard, ChatMessage, EventCard, NavSidebar...
  templates/      # DashboardTemplate, ChatTemplate, CommunityTemplate...
  index.ts        # Public API — only exports intended for consumers
```

### `apps/web`

```
app/                        # Next.js App Router — server-side only
  (auth)/                   # Auth flow (login, signup, onboarding)
  (platform)/               # Authenticated shell
    dashboard/
      page.tsx              # Fetches data → renders <DashboardView />
    chat/
      [conversationId]/
        page.tsx
    community/
      events/
    calendar/
    resources/
      [slug]/
    layout.tsx
    loading.tsx
    error.tsx
views/                      # Smart components — one per screen (or sub-screen)
  dashboard/
    dashboard-view.tsx
  chat/
    chat-view.tsx
    conversation-view.tsx
  community/
    community-view.tsx
    event-detail-view.tsx
  calendar/
    calendar-view.tsx
  resources/
    resources-view.tsx
    resource-detail-view.tsx
lib/
  auth.ts                   # Clerk server boundary — only file allowed to import @clerk/nextjs (server)
  auth-client.ts            # Clerk client boundary — only file allowed to import @clerk/nextjs (client)
  session.ts                # Public session contract — exports getSession() only
  format-date.ts            # Date formatting + local date utilities (formatDateShort/Long/Full, getLocalDateString, formatEventTime)
  nav-links.ts              # Static navigation link definitions
  actions/                  # Server Actions (mutations, one file per domain)
    mood.ts                 # createMoodEntry, updateMoodEntry
    onboarding.ts           # completeOnboarding
  queries/                  # Data fetching functions (one file per domain)
    calendar.ts             # getUpcomingWeekEvents
    chat.ts                 # getActiveConversationMessages
    dashboard.ts            # getDashboardSummary
    mood.ts                 # getMoodHistory, getMoodByDate, getMoodTrends
    user-profile.ts         # ensureUserProfile (webhook use only)
  schemas/                  # Zod validation schemas (one file per domain)
    mood.ts                 # MoodEntrySchema, UpdateMoodEntrySchema
    onboarding.ts           # OnboardingSchema, ChildProfileSchema (no id — server generates)
  utils/                    # Pure utility functions — no side effects, no imports from @db/@ai/session
    calendar.ts             # buildDaysForMonth, toMonthString, CalendarDay type
    birth-date.ts           # MONTH_NAMES, BIRTH_YEARS, buildBirthDateString, formatBirthDateLabel
```

---

## File and Directory Naming

- All files: `kebab-case` — `chat-message.tsx`, `use-mood.ts`
- React component files: kebab-case file, PascalCase export
- Hooks: `use-` prefix — `use-conversation.ts` exports `useConversation`
- Server actions: `lib/actions/[domain].ts` — e.g., `lib/actions/mood.ts`
- Query functions: `lib/queries/[domain].ts` — e.g., `lib/queries/conversations.ts`

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| React component | PascalCase | `ConversationView`, `MoodPicker` |
| Hook | `use` prefix, camelCase | `useConversation`, `useMoodContext` |
| Server action | verb + noun, camelCase | `createMoodEntry`, `deleteConversation` |
| Query function | `fetch` prefix, camelCase | `fetchConversations`, `fetchResourceBySlug` |
| Event handler | `handle` prefix | `handleSubmit`, `handleDeletePost` |
| Boolean var/prop | `is`, `has`, `can`, `should` prefix | `isLoading`, `hasError`, `canEdit` |
| TypeScript type | PascalCase, no `I` prefix | `MoodEntry`, `ConversationMessage` |
| Module-level constant | SCREAMING_SNAKE_CASE | `MAX_MESSAGE_LENGTH` |

---

## TypeScript

- `strict: true` is non-negotiable (set in `tsconfig.base.json`).
- Prefer `type` over `interface` for object shapes.
- Prefer `unknown` over `any`. Never use `any` except at verified external system boundaries.
- Use `as const` for literal value unions.
- Do not use type assertions (`as SomeType`) without an accompanying comment explaining why.

---

## Import Aliases

All internal monorepo package imports use the `@/grove-companion/` prefix — never the short
forms (`@domain`, `@db`, etc.). This prefix is how Biome distinguishes internal packages from
third-party npm packages when sorting imports.

| Alias | Package |
|---|---|
| `@/grove-companion/domain` | `packages/domain` |
| `@/grove-companion/db` | `packages/db` |
| `@/grove-companion/ai` | `packages/ai` |
| `@/grove-companion/ui` | `packages/ui` |

Each workspace's `tsconfig.json` maps these aliases to the correct package entry point.

---

## Exports

- `default export` is reserved for Next.js page, layout, loading, and error files only
  (framework requirement). Use named exports everywhere else.
- Packages expose their public API **only** through `src/index.ts`.
- Do not create barrel `index.ts` files inside `apps/web` folders.

---

## Authentication Boundary

All Clerk imports are isolated to two files:

- `lib/auth.ts` — server-side Clerk calls (`auth()`, `currentUser()`, metadata writes). Nothing
  outside this file may import `@clerk/nextjs` server APIs.
- `lib/auth-client.ts` — client-side Clerk hooks (`useClerk`, etc.). Nothing outside this file
  may import `@clerk/nextjs` client APIs.

Components, queries, actions, and API routes must never import from `@clerk/nextjs` directly.

## Session Contract

`lib/session.ts` exports a single function: `getSession(): Promise<UserSession>`.

`UserSession` contains the internal `UserProfile.id` (as `userId`), display name, avatar, and
children. It contains no Clerk-specific concepts.

`getSession()` redirects to `/sign-in` if no session is found. It is the only entry point
for establishing who is logged in. Every protected page, layout, query, action, and API route
calls it — never `auth()` directly.

`UserProfile` is created by the Clerk `user.created` webhook. `getSession()` does a plain
`findUnique` — it never upserts or creates rows. A missing profile redirects, it does not create.

## Server Actions

- All mutations use Next.js Server Actions.
- Validate all inputs at the action boundary.
- Return typed results: `{ data: T } | { error: string }` — never throw to the client.
- Co-locate actions in `lib/actions/[domain].ts`.

---

## Error Handling

- Use Next.js `error.tsx` for route-level error boundaries.
- Server actions return typed errors — never let exceptions propagate to the client.
- Never swallow errors silently.
- Do not add error handling for states that are impossible in valid application flow.

---

## Logic Placement Decision Map

When writing new code, use this table to determine where it belongs. Do not guess.

| What you're writing | Where it goes | Never in |
|---|---|---|
| Pure calculation, date math, string formatting | `lib/utils/[topic].ts` | views, hooks, actions |
| Domain-level constants (mood labels, calendar colors, category names) | `packages/domain/src/constants/index.ts` | any `apps/web` file |
| UI-only constants (nav links, step counts, interest labels for a single flow) | co-located `*-constants.ts` in the view folder | `packages/domain` |
| DB read (no mutation) | `lib/queries/[domain].ts` | views, actions, components |
| DB write / mutation | `lib/actions/[domain].ts` | views, queries, components |
| Input validation shape | `lib/schemas/[domain].ts` | views, queries |
| Session resolution | `lib/session.ts` only | anywhere else |
| Clerk server call | `lib/auth.ts` only | anywhere else |
| Clerk client hook | `lib/auth-client.ts` only | anywhere else |
| Server Component (fetches data, no interactivity) | `app/**/page.tsx` or `app/**/layout.tsx` | `views/` |
| Client interaction + template composition | `views/[feature]/[feature]-view.tsx` | `app/`, `lib/` |
| Multi-step client form state | `views/[feature]/use-[feature]-flow.ts` | page files |
| Reusable UI primitive | `packages/ui/src/atoms/` or `molecules/` | `apps/web` |
| Page-level layout skeleton | `packages/ui/src/templates/` | `apps/web` |

**Before creating anything new in `lib/utils/`:** search for the function in existing utils files
and in `packages/domain/src/constants/index.ts`. Duplicate utilities are a recurrent failure mode.

## Domain Constants Registry

`packages/domain` already exports these constants — do not redefine them locally:

| Export | Description |
|---|---|
| `MOOD_LABELS` | `Record<MoodScale, string>` — "Struggling" / "Low" / "Okay" / "Good" / "Great" |
| `MOOD_EMOJIS` | `Record<MoodScale, string>` — emoji per mood level |
| `CALENDAR_ENTRY_TYPE_LABELS` | `Record<CalendarEntryType, string>` — human-readable event type names |
| `RESOURCE_CATEGORY_LABELS` | `Record<ResourceCategory, string>` — human-readable category names |
| `RESOURCE_CATEGORY_VALUES` | `ResourceCategory[]` as const — use with `z.enum()` for Zod validation |
| `CALENDAR_COLORS` | Design-system-aligned hex colors for calendar entries |
| `CRISIS_KEYWORDS` | Crisis detection keyword list (used by AI layer) |
| `SUMMARY_TRIGGER_COUNT` | Message count threshold for AI conversation summarisation |

When adding a new domain-level constant, add it here and register it in the table above.

---

## Keeping Documentation Current

Documentation is updated **in the same change** as the code it describes — not after.

| When you… | Also update… |
|---|---|
| Add a file to `lib/utils/` | The utils directory listing above |
| Add a constant to `@domain/constants` | The Domain Constants Registry table above |
| Add a new `lib/actions/` or `lib/queries/` file | The directory listing above |
| Add a new view, page, or template | The `views/` or `app/` listing above |
| Discover a new failure mode | `docs/ai/mistake-log.md` |
| Change the session or auth contract | The Authentication Boundary / Session Contract sections |

The file inventory in this document is the primary reference an AI uses to decide where code
belongs. If it is stale, code will be placed in the wrong location. Keeping it current is not
optional.

---

## What Not To Do

- No `console.log` in production code.
- No `any` types.
- No business logic in atoms, molecules, organisms, or templates.
- No data fetching in client components — pass data as props from Server Components.
- No external state management libraries beyond `useState` and `useContext`.
- No prop drilling deeper than 3 levels — split or use context instead.
- No deep imports into other workspaces.
- No relative imports that escape the current workspace root.
- No client-side UUID or ID generation — IDs are always generated server-side.
- No redefining constants that already exist in `@domain/constants` — check the registry first.

---

## Planned Future Packages

When these needs grow beyond `apps/web`:

- `packages/domain` — shared TypeScript types used across packages
- `packages/ai` — AI SDK integration, prompt templates, streaming utilities
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
  actions/                  # Server Actions (mutations, one file per domain)
  queries/                  # Data fetching functions (one file per domain)
  utils/                    # Pure utility functions
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

## Exports

- `default export` is reserved for Next.js page, layout, loading, and error files only
  (framework requirement). Use named exports everywhere else.
- Packages expose their public API **only** through `src/index.ts`.
- Do not create barrel `index.ts` files inside `apps/web` folders.

---

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

---

## Planned Future Packages

When these needs grow beyond `apps/web`:

- `packages/domain` — shared TypeScript types used across packages
- `packages/ai` — AI SDK integration, prompt templates, streaming utilities
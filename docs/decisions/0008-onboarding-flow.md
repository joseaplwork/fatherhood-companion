# ADR 0008 — Onboarding Flow

## Status

Decided

## Context

When a user signs up via Clerk, no `UserProfile` row is created in our database. Every model
that stores user data (MoodEntry, AIConversation, etc.) has a foreign key on
`UserProfile.providerUserId`, so any write before onboarding completes throws a constraint error.

Additionally, there was no middleware protecting routes — unauthenticated users could access
any platform page, and newly signed-up users had no mechanism to be routed to onboarding.

## Decisions

### 1. Clerk `publicMetadata` flag for the middleware gate

Middleware runs on every request. A database query in middleware would add latency to every
page load. Clerk's session JWT already includes `publicMetadata` as a signed claim, so it is
readable synchronously in middleware without a network round-trip.

After `completeOnboarding` succeeds, we write `{ onboardingComplete: true }` to the user's
`publicMetadata` via the Clerk backend API. The middleware reads
`sessionClaims.metadata.onboardingComplete` to decide whether to gate the user.

The authoritative source of truth remains `UserProfile.onboardingState` in PostgreSQL.
`publicMetadata` is a cache of that state for middleware performance only.

**Trade-off**: Clerk session tokens are short-lived JWTs. After writing `publicMetadata`, the
client must call `session.reload()` before navigating away — otherwise the in-memory JWT still
carries the old claims and the middleware will redirect back to `/onboarding`. The
`OnboardingView` handles this explicitly before `router.push('/dashboard')`.

### 2. Webhook for production-safe profile creation

`apps/web/app/api/webhooks/clerk/route.ts` handles the `user.created` Clerk event and upserts
a stub `UserProfile` row (`onboardingState: PENDING`) immediately on sign-up. This eliminates
the FK constraint window between sign-up and onboarding completion.

The webhook route is marked public in middleware (no auth required) and verifies the request
signature via `svix` before touching the database.

**Required env var**: `CLERK_WEBHOOK_SECRET` — obtain from Clerk Dashboard → Webhooks.

### 3. `ensureUserProfile` lazy guard

`apps/web/lib/queries/user-profile.ts` exports `ensureUserProfile(providerUserId)`, which
performs an idempotent upsert. It is called at the top of any server action or API route that
writes FK-backed records. This covers local development (no webhook configured) and any
race conditions.

### 4. Onboarding in its own route group

The onboarding page moved from `(platform)/onboarding/` to `(onboarding)/onboarding/`. The
`(platform)` layout renders `NavSidebar` — onboarding must be distraction-free. The
`(onboarding)` group has a minimal centered layout with no navigation chrome.

### 5. `ChildProfile.birthDate` format

Child birth date is stored as `MM-YYYY` (e.g. `"03-2021"`). Day is omitted for privacy. This
replaces the previous `birthYear: number` + `birthMonth: number` pair with a single string
field, making the shape simpler to store, display, and validate. The regex
`/^(0[1-9]|1[0-2])-\d{4}$/` enforces the format at the action boundary.

## Consequences

- New sign-ups are routed to `/onboarding` immediately after email verification.
- Returning users with `onboardingComplete: true` skip onboarding and land on `/dashboard`.
- FK constraint errors on pre-onboarding writes are eliminated in both production (webhook)
  and local dev (`ensureUserProfile` guard).
- Adding a new platform route requires no changes — middleware protects everything by default.
- The `CLERK_WEBHOOK_SECRET` env var must be configured in all environments.

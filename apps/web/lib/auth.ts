/**
 * Auth abstraction — the only file in apps/web that imports session primitives
 * from the auth provider (@clerk/nextjs/server).
 *
 * Switching auth providers means changing this file only.
 *
 * Public API (used by app code):
 *   setUserPrivateMetadata — write server-only metadata to the auth provider
 *   setUserPublicMetadata  — write JWT-claim metadata to the auth provider
 *
 * Internal helpers (used only by lib/session.ts):
 *   getAuthUserId    — resolves Clerk session → internal UserProfile.id
 *   getAuthProfile — resolves Clerk session → display data (name, avatar, children)
 */
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import type { ChildProfile } from "@/grove-companion/domain";

// ---------------------------------------------------------------------------
// Internal helpers — consumed by lib/session.ts only
// ---------------------------------------------------------------------------

/** Returns the current session's provider user ID, or null if unauthenticated. */
export async function getAuthUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

/** Resolves the provider session to display-oriented user data. */
export async function getAuthProfile(): Promise<{
  userName: string;
  userAvatarSrc: string | null;
  children: ChildProfile[];
}> {
  const user = await currentUser();
  return {
    userName: user?.fullName ?? user?.firstName ?? "",
    userAvatarSrc: user?.imageUrl ?? null,
    children: (user?.privateMetadata?.children ?? []) as ChildProfile[],
  };
}

// ---------------------------------------------------------------------------
// Public API — write operations back to the auth provider
// ---------------------------------------------------------------------------

/**
 * Merges key/value pairs into the current user's private metadata.
 * Private metadata is server-only and never exposed to the client.
 */
export async function setUserPrivateMetadata(metadata: Record<string, unknown>): Promise<void> {
  const { userId } = await auth();
  if (!userId) return;
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, { privateMetadata: metadata });
}

/**
 * Merges key/value pairs into the current user's public metadata.
 * Public metadata is included in the session JWT claims and is readable
 * by middleware without a database round-trip.
 */
export async function setUserPublicMetadata(metadata: Record<string, unknown>): Promise<void> {
  const { userId } = await auth();
  if (!userId) return;
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, { publicMetadata: metadata });
}

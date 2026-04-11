/**
 * Auth abstraction — the only file in apps/web that imports session primitives
 * from the auth provider (@clerk/nextjs/server).
 *
 * Switching auth providers means changing this file only.
 * All queries, actions, and API routes import from here, not from the provider directly.
 */
import { auth, clerkClient } from "@clerk/nextjs/server";

/** Returns the current session's user ID, or null if unauthenticated. */
export async function getAuthUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

/**
 * Merges key/value pairs into the current user's private metadata.
 * Private metadata is server-only and never exposed to the client.
 */
export async function setUserPrivateMetadata(
  userId: string,
  metadata: Record<string, unknown>,
): Promise<void> {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, { privateMetadata: metadata });
}

/**
 * Merges key/value pairs into the current user's public metadata.
 * Public metadata is included in the session JWT claims and is readable
 * by middleware without a database round-trip.
 */
export async function setUserPublicMetadata(
  userId: string,
  metadata: Record<string, unknown>,
): Promise<void> {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, { publicMetadata: metadata });
}

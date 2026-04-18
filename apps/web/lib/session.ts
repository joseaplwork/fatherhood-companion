import { redirect } from "next/navigation";
import { cache } from "react";

import { db } from "@db";
import type { ChildProfile } from "@domain";

import { getAuthProfile, getAuthUserId } from "./auth";

export type UserSession = {
  /** Internal UserProfile.id (cuid) — use this for all DB relations. */
  userId: string;
  userName: string;
  userAvatarSrc: string | null;
  children: ChildProfile[];
};

const resolveSession = cache(async (): Promise<UserSession | null> => {
  const [providerUserId, authProfile] = await Promise.all([getAuthUserId(), getAuthProfile()]);
  if (!providerUserId) return null;
  const profile = await db.userProfile.findUnique({
    where: { providerUserId },
    select: { id: true },
  });
  if (!profile) return null;
  return { userId: profile.id, ...authProfile };
});

/**
 * Returns the current user session. Redirects to /sign-in if absent.
 *
 * Use in every protected page, layout, query, action, and API route.
 * The middleware guarantees auth before any of these run — a missing
 * session here means a genuine error state, not a normal unauthenticated visit.
 */
export async function getSession(): Promise<UserSession> {
  const session = await resolveSession();
  if (!session) redirect("/sign-in");
  return session;
}

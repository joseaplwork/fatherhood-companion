import { db } from "@db";

/**
 * Ensures a UserProfile row exists for the given Clerk user ID.
 *
 * This is a belt-and-suspenders guard for local development (no webhook)
 * and any race conditions between sign-up and the first authenticated request.
 * The Clerk webhook handles the normal production path.
 *
 * Always idempotent — safe to call before any FK-backed write.
 */
export async function ensureUserProfile(providerUserId: string): Promise<void> {
  await db.userProfile.upsert({
    where: { providerUserId },
    create: { providerUserId, interests: [], onboardingState: "PENDING" },
    update: {},
  });
}

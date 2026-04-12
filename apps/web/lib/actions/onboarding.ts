"use server";

import { revalidatePath } from "next/cache";

import { db } from "@db";

import { getAuthUserId, setUserPrivateMetadata, setUserPublicMetadata } from "../auth";
import type { OnboardingInput } from "../schemas/onboarding";
import { OnboardingSchema } from "../schemas/onboarding";

type Result<T> = { data: T } | { error: string };

export async function completeOnboarding(input: OnboardingInput): Promise<Result<{ id: string }>> {
  const userId = await getAuthUserId();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const parsed = OnboardingSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { bio, location, interests, children } = parsed.data;

  try {
    // Upsert user profile — sets onboardingState to COMPLETE
    const profile = await db.userProfile.upsert({
      where: { providerUserId: userId },
      create: {
        providerUserId: userId,
        bio,
        location,
        interests: interests ?? [],
        onboardingState: "COMPLETE",
      },
      update: {
        bio,
        location,
        interests: interests ?? [],
        onboardingState: "COMPLETE",
      },
    });

    // Store children with full ChildProfile shape in Clerk private metadata.
    const childProfiles = (children ?? []).map((child) => ({
      id: child.id,
      nickname: child.nickname,
      birthDate: child.birthDate,
    }));

    await setUserPrivateMetadata(userId, { children: childProfiles });

    // Set the session flag that middleware reads.
    // Must happen AFTER the DB write succeeds so the gate only opens for
    // users with a valid profile row.
    await setUserPublicMetadata(userId, { onboardingComplete: true });

    revalidatePath("/dashboard");
    return { data: { id: profile.id } };
  } catch (err) {
    console.error("[completeOnboarding]", err);
    return { error: "Failed to save profile" };
  }
}

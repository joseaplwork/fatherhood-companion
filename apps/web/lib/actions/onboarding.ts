"use server";

import { revalidatePath } from "next/cache";

import { db } from "@db";

import { getAuthUserId, setUserPrivateMetadata } from "../auth";
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
    // Upsert user profile
    const profile = await db.userProfile.upsert({
      where: { clerkUserId: userId },
      create: {
        clerkUserId: userId,
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

    // Store children in Clerk private metadata
    if (children && children.length > 0) {
      await setUserPrivateMetadata(userId, { children });
    }

    revalidatePath("/dashboard");
    return { data: { id: profile.id } };
  } catch (err) {
    console.error("[completeOnboarding]", err);
    return { error: "Failed to save profile" };
  }
}

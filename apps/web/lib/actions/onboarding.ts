"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@fatherhood-companion/db";
import { revalidatePath } from "next/cache";
import type { OnboardingInput } from "../schemas/onboarding";
import { OnboardingSchema } from "../schemas/onboarding";

type Result<T> = { data: T } | { error: string };

export async function completeOnboarding(input: OnboardingInput): Promise<Result<{ id: string }>> {
  const { userId } = await auth();
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
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        privateMetadata: { children },
      });
    }

    revalidatePath("/dashboard");
    return { data: { id: profile.id } };
  } catch (err) {
    console.error("[completeOnboarding]", err);
    return { error: "Failed to save profile" };
  }
}

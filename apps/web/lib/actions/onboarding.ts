"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/grove-companion/db";

import { setUserPrivateMetadata, setUserPublicMetadata } from "../auth";
import type { OnboardingInput } from "../schemas/onboarding";
import { OnboardingSchema } from "../schemas/onboarding";
import { getSession } from "../session";

type Result<T> = { data: T } | { error: string };

export async function completeOnboarding(input: OnboardingInput): Promise<Result<{ id: string }>> {
  const session = await getSession();

  const parsed = OnboardingSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { bio, location, interests, children } = parsed.data;

  try {
    // The webhook guarantees the UserProfile row exists before onboarding runs.
    const profile = await db.userProfile.update({
      where: { id: session.userId },
      data: {
        bio,
        location,
        interests: interests ?? [],
        onboardingState: "COMPLETE",
      },
    });

    // Store children with full ChildProfile shape in Clerk private metadata.
    // IDs are generated server-side — the client never supplies them.
    const childProfiles = (children ?? []).map((child) => ({
      id: crypto.randomUUID(),
      nickname: child.nickname,
      birthDate: child.birthDate,
    }));

    await setUserPrivateMetadata({ children: childProfiles });

    // Set the session flag that middleware reads.
    // Must happen AFTER the DB write succeeds so the gate only opens for
    // users with a valid profile row.
    await setUserPublicMetadata({ onboardingComplete: true });

    revalidatePath("/dashboard");

    return { data: { id: profile.id } };
  } catch (err) {
    console.error("[completeOnboarding]", err);
    return { error: "Failed to save profile" };
  }
}

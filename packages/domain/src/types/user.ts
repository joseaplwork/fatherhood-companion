import type { OnboardingState, SubscriptionTier } from "../enums/index";

export type UserProfile = {
  id: string;
  clerkUserId: string;
  bio: string | null;
  location: string | null;
  interests: string[];
  onboardingState: OnboardingState;
  subscriptionTier: SubscriptionTier;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Stored in Clerk private metadata under key "children".
 * Day of birth is intentionally omitted for child privacy.
 */
export type ChildProfile = {
  /** System-generated numeric string ID used as reference key across app */
  id: string;
  /** Preferred name or nickname — never stored in the database */
  nickname: string;
  /** Birth year — e.g. 2020 */
  birthYear: number;
  /** Birth month (1–12). Day is intentionally omitted for privacy. */
  birthMonth: number;
};

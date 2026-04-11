import type { OnboardingState, SubscriptionTier } from "../enums/index";

export type UserProfile = {
  id: string;
  providerUserId: string;
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
  /**
   * Birth month and year in MM-YYYY format, e.g. "03-2021".
   * Day is intentionally omitted for privacy.
   */
  birthDate: string;
};

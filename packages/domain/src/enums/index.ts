export type MoodScale = 1 | 2 | 3 | 4 | 5;

export type ReactionType = "HEART" | "SUPPORT" | "HELPFUL";

export type RsvpStatus = "GOING" | "MAYBE" | "NOT_GOING";

export type EventKind = "IN_PERSON" | "VIRTUAL";

export type CalendarEntryType =
  | "PERSONAL"
  | "CHILD_CARE"
  | "CUSTODY"
  | "MEDICAL"
  | "SCHOOL"
  | "COMMUNITY_EVENT"
  | "REMINDER";

export type ResourceCategory =
  | "MENTAL_HEALTH"
  | "CO_PARENTING"
  | "LEGAL"
  | "FINANCE"
  | "CHILD_DEVELOPMENT"
  | "SELF_CARE"
  | "COMMUNITY";

export type ResourceType = "ARTICLE" | "VIDEO" | "EXERCISE" | "MINI_COURSE" | "GUIDE";

export type NotificationType =
  | "EVENT_REMINDER"
  | "COMMUNITY_REPLY"
  | "AI_CHECKIN"
  | "MOOD_REMINDER"
  | "NEW_RESOURCE";

export type MessageRole = "USER" | "ASSISTANT";

export type SubscriptionTier = "FREE" | "PREMIUM";

export type OnboardingState = "PENDING" | "COMPLETE";

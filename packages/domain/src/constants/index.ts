import type { CalendarEntryType, MoodScale, ResourceCategory } from "../enums/index";

export const MOOD_LABELS: Record<MoodScale, string> = {
  1: "Really struggling",
  2: "Having a tough time",
  3: "Getting through it",
  4: "Doing pretty well",
  5: "Feeling great",
};

export const MOOD_EMOJIS: Record<MoodScale, string> = {
  1: "😔",
  2: "😟",
  3: "😐",
  4: "🙂",
  5: "😊",
};

export const RESOURCE_CATEGORY_LABELS: Record<ResourceCategory, string> = {
  MENTAL_HEALTH: "Mental Health",
  CO_PARENTING: "Co-Parenting",
  LEGAL: "Legal",
  FINANCE: "Finance",
  CHILD_DEVELOPMENT: "Child Development",
  SELF_CARE: "Self-Care",
  COMMUNITY: "Community",
};

export const CALENDAR_ENTRY_TYPE_LABELS: Record<CalendarEntryType, string> = {
  PERSONAL: "Personal",
  CHILD_CARE: "Child Care",
  CUSTODY: "Custody Visit",
  MEDICAL: "Medical",
  SCHOOL: "School",
  COMMUNITY_EVENT: "Community Event",
  REMINDER: "Reminder",
};

/** Calendar entry colors aligned to design system tokens */
export const CALENDAR_COLORS = [
  "#67794a", // primary-container (sage)
  "#7c6f7a", // tertiary-container (mauve)
  "#665d4f", // secondary (warm brown)
  "#4f6034", // primary (dark sage)
  "#bace97", // primary-fixed-dim (light sage)
] as const;

/**
 * Crisis detection keywords — used by the AI crisis-check tool.
 * These trigger escalation to helplines in Buddy Support.
 */
export const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "end my life",
  "don't want to be here",
  "want to die",
  "hurt myself",
  "self-harm",
  "no point living",
  "can't go on",
  "hopeless",
  "worthless",
  "nobody cares",
] as const;

/** Rolling summary trigger: compress conversation after this many messages */
export const SUMMARY_TRIGGER_COUNT = 20;

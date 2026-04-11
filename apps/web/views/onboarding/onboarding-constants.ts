import type { InterestKey } from "../../lib/schemas/onboarding";

export const TOTAL_STEPS = 4;

export const INTEREST_LABELS: Record<InterestKey, string> = {
  MENTAL_HEALTH: "Mental Health",
  CO_PARENTING: "Co-Parenting",
  LEGAL: "Legal & Rights",
  FINANCE: "Financial Wellness",
  CHILD_DEVELOPMENT: "Child Development",
  SELF_CARE: "Self-Care",
  COMMUNITY: "Community",
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const currentYear = new Date().getFullYear();

export const BIRTH_YEARS = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

export function formatBirthDateLabel(birthDate: string): string {
  const [mm, yyyy] = birthDate.split("-");
  const monthIndex = Number.parseInt(mm ?? "1", 10) - 1;
  const monthName = MONTH_NAMES[monthIndex] ?? mm;
  return `${monthName} ${yyyy}`;
}

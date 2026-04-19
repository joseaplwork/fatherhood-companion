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

/** All valid birth years from 1990 to the current year, most recent first. */
export const BIRTH_YEARS: number[] = Array.from(
  { length: new Date().getFullYear() - 1989 },
  (_, i) => new Date().getFullYear() - i,
);

/**
 * Builds a birth date string in MM-YYYY format from separate month and year inputs.
 * Month must be a zero-padded two-digit string (e.g. "03"), year a four-digit string.
 */
export function buildBirthDateString(month: string, year: string): string {
  return `${month.padStart(2, "0")}-${year}`;
}

/**
 * Formats a stored MM-YYYY birth date string into a human-readable label.
 * Example: "03-2021" → "March 2021"
 */
export function formatBirthDateLabel(birthDate: string): string {
  const [mm, yyyy] = birthDate.split("-");
  const monthIndex = Number.parseInt(mm ?? "1", 10) - 1;
  const monthName = MONTH_NAMES[monthIndex] ?? mm;
  return `${monthName} ${yyyy}`;
}

/** "Mon, Jan 1" — used in list views (diary list, dashboard recent entries) */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

/** "Monday, January 1" — used in headings (dashboard greeting, calendar day detail) */
export function formatDateLong(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

/** "Monday, January 1, 2026" — used in entry detail view */
export function formatDateFull(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

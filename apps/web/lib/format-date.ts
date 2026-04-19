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

/**
 * Returns today's date as a YYYY-MM-DD string using the local timezone.
 * Use this (not toISOString) whenever you need "today" for user-facing date logic —
 * toISOString gives UTC, which can be a different calendar day for users outside UTC.
 */
export function getLocalDateString(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Formats a calendar event's time label.
 * All-day events show only the date; timed events append the start time.
 * Example: "Mon, Apr 20" or "Mon, Apr 20 · 3:00 PM"
 */
export function formatEventTime(startAt: Date, allDay: boolean): string {
  const dateStr = formatDateShort(startAt);
  if (allDay) return dateStr;
  const timeStr = startAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${dateStr} · ${timeStr}`;
}

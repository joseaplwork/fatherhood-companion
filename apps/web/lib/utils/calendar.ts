export type CalendarDay = {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
};

/**
 * Builds the full grid of days for a monthly calendar view.
 * Pads with trailing days from the previous and next month so
 * every row in the grid is complete (7 cells).
 */
export function buildDaysForMonth(year: number, month: number): CalendarDay[] {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const todayY = today.getFullYear();
  const todayM = today.getMonth();
  const todayD = today.getDate();
  const days: CalendarDay[] = [];

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({ date: daysInPrevMonth - i, isCurrentMonth: false, isToday: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: d,
      isCurrentMonth: true,
      isToday: todayY === year && todayM === month && todayD === d,
    });
  }

  const trailing = days.length % 7 === 0 ? 0 : 7 - (days.length % 7);
  for (let d = 1; d <= trailing; d++) {
    days.push({ date: d, isCurrentMonth: false, isToday: false });
  }

  return days;
}

/** Returns the "YYYY-MM" string used as the grid's month identifier. */
export function toMonthString(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

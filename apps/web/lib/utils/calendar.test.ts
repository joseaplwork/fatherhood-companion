import { buildDaysForMonth, toMonthString } from "./calendar";
import { describe, expect, it } from "vitest";

describe("buildDaysForMonth", () => {
  it("returns a grid length that is a multiple of 7", () => {
    // Test several months to ensure all grids are complete rows
    const cases = [
      [2026, 0], // January (starts Thursday)
      [2026, 1], // February (28 days)
      [2026, 3], // April (starts Wednesday)
      [2024, 1], // Feb 2024 (leap year, 29 days)
    ] as const;
    for (const [year, month] of cases) {
      const days = buildDaysForMonth(year, month);
      expect(days.length % 7, `${year}-${month + 1} grid length`).toBe(0);
    }
  });

  it("contains exactly daysInMonth current-month days", () => {
    // April 2026 has 30 days
    const days = buildDaysForMonth(2026, 3);
    const currentMonthDays = days.filter((d) => d.isCurrentMonth);
    expect(currentMonthDays.length).toBe(30);
  });

  it("current-month days are numbered 1 through daysInMonth in order", () => {
    const days = buildDaysForMonth(2026, 3); // April
    const current = days.filter((d) => d.isCurrentMonth).map((d) => d.date);
    expect(current).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
  });

  it("leading padding days come from the previous month", () => {
    // April 2026: April 1 is a Wednesday (index 3), so 3 padding days from March
    // March has 31 days → padding should be [29, 30, 31]
    const days = buildDaysForMonth(2026, 3);
    const leading = days.slice(
      0,
      days.findIndex((d) => d.isCurrentMonth),
    );
    expect(leading.every((d) => !d.isCurrentMonth)).toBe(true);
    expect(leading.length).toBe(3);
    expect(leading.map((d) => d.date)).toEqual([29, 30, 31]);
  });

  it("trailing padding days are not part of the current month", () => {
    const days = buildDaysForMonth(2026, 3);
    const trailing = days.slice(days.findLastIndex((d) => d.isCurrentMonth) + 1);
    expect(trailing.every((d) => !d.isCurrentMonth)).toBe(true);
  });

  it("marks exactly one day as today when today is in the given month", () => {
    const now = new Date();
    const days = buildDaysForMonth(now.getFullYear(), now.getMonth());
    const todayDays = days.filter((d) => d.isToday);
    expect(todayDays.length).toBe(1);
    expect(todayDays[0]?.date).toBe(now.getDate());
    expect(todayDays[0]?.isCurrentMonth).toBe(true);
  });

  it("marks no day as today when the month is not the current month", () => {
    // Use a past month guaranteed not to be current
    const days = buildDaysForMonth(2020, 0); // January 2020
    expect(days.some((d) => d.isToday)).toBe(false);
  });

  it("handles months where the 1st falls on Sunday (no leading padding)", () => {
    // March 2026: March 1 is a Sunday (day index 0) → zero leading days
    const days = buildDaysForMonth(2026, 2);
    expect(days[0]?.isCurrentMonth).toBe(true);
    expect(days[0]?.date).toBe(1);
  });

  it("handles February in a leap year correctly", () => {
    const days = buildDaysForMonth(2024, 1); // Feb 2024 — 29 days
    expect(days.filter((d) => d.isCurrentMonth).length).toBe(29);
  });

  it("handles February in a non-leap year correctly", () => {
    const days = buildDaysForMonth(2026, 1); // Feb 2026 — 28 days
    expect(days.filter((d) => d.isCurrentMonth).length).toBe(28);
  });
});

describe("toMonthString", () => {
  it("formats month with zero-padding", () => {
    expect(toMonthString(2026, 0)).toBe("2026-01");
    expect(toMonthString(2026, 8)).toBe("2026-09");
    expect(toMonthString(2026, 11)).toBe("2026-12");
  });

  it("formats double-digit months without extra padding", () => {
    expect(toMonthString(2026, 9)).toBe("2026-10");
    expect(toMonthString(2026, 11)).toBe("2026-12");
  });
});

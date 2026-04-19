import { formatEventTime, getLocalDateString } from "./format-date";
import { describe, expect, it } from "vitest";

describe("getLocalDateString", () => {
  it("returns YYYY-MM-DD format", () => {
    const result = getLocalDateString(new Date(2026, 3, 19)); // April 19, 2026 local
    expect(result).toBe("2026-04-19");
  });

  it("zero-pads single-digit months and days", () => {
    expect(getLocalDateString(new Date(2026, 0, 5))).toBe("2026-01-05"); // Jan 5
    expect(getLocalDateString(new Date(2026, 8, 1))).toBe("2026-09-01"); // Sep 1
  });

  it("handles December correctly", () => {
    expect(getLocalDateString(new Date(2026, 11, 31))).toBe("2026-12-31");
  });

  it("returns today when called with no argument", () => {
    const today = new Date();
    const expected = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    expect(getLocalDateString()).toBe(expected);
  });

  it("uses local date, not UTC — does not shift for near-midnight local times", () => {
    // Simulate a Date that represents 11 PM local on April 19.
    // We test that getLocalDateString gives "2026-04-19", not a shifted UTC date.
    const d = new Date(2026, 3, 19, 23, 0, 0); // local April 19, 11 PM
    expect(getLocalDateString(d)).toBe("2026-04-19");
  });
});

describe("formatEventTime", () => {
  it("returns only the date for all-day events", () => {
    const date = new Date(2026, 3, 20); // April 20, 2026
    const result = formatEventTime(date, true);
    // Should not contain a time separator
    expect(result).not.toContain("·");
  });

  it("appends a time separator and time for timed events", () => {
    const date = new Date(2026, 3, 20, 15, 0, 0); // 3:00 PM
    const result = formatEventTime(date, false);
    expect(result).toContain("·");
    expect(result).toContain("3:00 PM");
  });

  it("formats midnight correctly for timed events", () => {
    const date = new Date(2026, 3, 20, 0, 0, 0);
    const result = formatEventTime(date, false);
    expect(result).toContain("12:00 AM");
  });

  it("formats noon correctly for timed events", () => {
    const date = new Date(2026, 3, 20, 12, 0, 0);
    const result = formatEventTime(date, false);
    expect(result).toContain("12:00 PM");
  });
});

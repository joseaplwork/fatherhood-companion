import { BIRTH_YEARS, buildBirthDateString, formatBirthDateLabel, MONTH_NAMES } from "./birth-date";
import { describe, expect, it } from "vitest";

describe("MONTH_NAMES", () => {
  it("has exactly 12 entries", () => {
    expect(MONTH_NAMES.length).toBe(12);
  });

  it("starts with January and ends with December", () => {
    expect(MONTH_NAMES[0]).toBe("January");
    expect(MONTH_NAMES[11]).toBe("December");
  });
});

describe("BIRTH_YEARS", () => {
  it("starts with the current year", () => {
    expect(BIRTH_YEARS[0]).toBe(new Date().getFullYear());
  });

  it("ends at 1990", () => {
    expect(BIRTH_YEARS[BIRTH_YEARS.length - 1]).toBe(1990);
  });

  it("is sorted descending", () => {
    for (let i = 0; i < BIRTH_YEARS.length - 1; i++) {
      expect((BIRTH_YEARS[i] as number) > (BIRTH_YEARS[i + 1] as number)).toBe(true);
    }
  });
});

describe("buildBirthDateString", () => {
  it("pads single-digit months to two digits", () => {
    expect(buildBirthDateString("3", "2021")).toBe("03-2021");
    expect(buildBirthDateString("9", "2020")).toBe("09-2020");
  });

  it("leaves already-padded months unchanged", () => {
    expect(buildBirthDateString("03", "2021")).toBe("03-2021");
    expect(buildBirthDateString("12", "2019")).toBe("12-2019");
  });

  it("combines month and year with a hyphen separator", () => {
    expect(buildBirthDateString("11", "2023")).toBe("11-2023");
  });
});

describe("formatBirthDateLabel", () => {
  it("formats a standard MM-YYYY string to a readable label", () => {
    expect(formatBirthDateLabel("03-2021")).toBe("March 2021");
    expect(formatBirthDateLabel("01-2019")).toBe("January 2019");
    expect(formatBirthDateLabel("12-2022")).toBe("December 2022");
  });

  it("formats all 12 months correctly", () => {
    const expected = [
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
    ];
    expected.forEach((name, i) => {
      const mm = String(i + 1).padStart(2, "0");
      expect(formatBirthDateLabel(`${mm}-2020`)).toBe(`${name} 2020`);
    });
  });

  it("round-trips correctly with buildBirthDateString", () => {
    const birthDate = buildBirthDateString("07", "2018");
    expect(formatBirthDateLabel(birthDate)).toBe("July 2018");
  });
});

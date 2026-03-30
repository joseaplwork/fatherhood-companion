"use client";

import { CalendarGrid, CalendarTemplate, NavSidebar } from "@fatherhood-companion/ui";
import { useState } from "react";
import { NAV_LINKS } from "../_shared/nav-links";

type DayData = {
  date: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
};

function buildDaysForMonth(year: number, month: number): DayData[] {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const days: DayData[] = [];

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({ date: daysInPrevMonth - i, isCurrentMonth: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: d,
      isCurrentMonth: true,
      isToday: today.getFullYear() === year && today.getMonth() === month && today.getDate() === d,
    });
  }

  const trailing = days.length % 7 === 0 ? 0 : 7 - (days.length % 7);
  for (let d = 1; d <= trailing; d++) {
    days.push({ date: d, isCurrentMonth: false });
  }

  return days;
}

export function CalendarView({ userName = "" }: { userName?: string }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(now.getDate());

  const days = buildDaysForMonth(year, month);
  const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;

  function prevMonth() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }

  const selectedDateLabel =
    selectedDate != null
      ? new Date(year, month, selectedDate).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      : null;

  return (
    <CalendarTemplate
      sidebar={<NavSidebar links={NAV_LINKS} userName={userName} />}
      calendarGrid={
        <div>
          <h1 className="font-display text-2xl font-semibold text-on-surface mb-6">Calendar</h1>
          <CalendarGrid
            month={monthStr}
            days={days}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
          />
        </div>
      }
      dayDetail={
        selectedDateLabel != null ? (
          <div className="rounded-2xl bg-surface-container-low px-5 py-4">
            <h2 className="font-display text-sm font-semibold text-on-surface mb-3">
              {selectedDateLabel}
            </h2>
            <p className="font-body text-sm text-on-surface-variant">No events for this day yet.</p>
          </div>
        ) : null
      }
    />
  );
}

"use client";

import { useState } from "react";
import { CalendarGrid, CalendarTemplate } from "@/grove-companion/ui";

import { formatDateLong } from "../../lib/format-date";
import { buildDaysForMonth, toMonthString } from "../../lib/utils/calendar";

export function CalendarView() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(now.getDate());

  const days = buildDaysForMonth(year, month);
  const monthStr = toMonthString(year, month);

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
    selectedDate != null ? formatDateLong(new Date(year, month, selectedDate)) : null;

  return (
    <CalendarTemplate
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

"use client";

import { Icon } from "../atoms/icon";

type CalendarDayData = {
  date: number;
  hasEvents?: boolean;
  hasMood?: boolean;
  isToday?: boolean;
  isCurrentMonth?: boolean;
};

type CalendarGridProps = {
  /** YYYY-MM format */
  month: string;
  days: CalendarDayData[];
  selectedDate?: number | null;
  onSelectDate?: (date: number) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  className?: string;
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
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

export function CalendarGrid({
  month,
  days,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  className = "",
}: CalendarGridProps) {
  const [yearStr, monthStr] = month.split("-");
  const monthIndex = Number.parseInt(monthStr ?? "1", 10) - 1;
  const year = yearStr ?? "";

  return (
    <div
      className={["rounded-2xl bg-surface-container-low p-4", className].filter(Boolean).join(" ")}
    >
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onPrevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          aria-label="Previous month"
        >
          <Icon name="chevron_left" size={20} className="text-on-surface-variant" />
        </button>
        <span className="font-display text-base font-semibold text-on-surface">
          {MONTH_NAMES[monthIndex]} {year}
        </span>
        <button
          type="button"
          onClick={onNextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          aria-label="Next month"
        >
          <Icon name="chevron_right" size={20} className="text-on-surface-variant" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className="text-center py-1">
            <span className="font-body text-xs font-medium text-on-surface-variant">{d}</span>
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, i) => {
          const isSelected = selectedDate === day.date && day.isCurrentMonth;
          return (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: calendar days are positionally stable
              key={i}
              type="button"
              disabled={!day.isCurrentMonth}
              onClick={() => day.isCurrentMonth && onSelectDate?.(day.date)}
              className={[
                "relative flex flex-col items-center justify-center rounded-full py-1.5 h-9",
                "font-body text-sm transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                !day.isCurrentMonth && "opacity-30 cursor-default",
                isSelected && "bg-primary-container text-on-primary-container",
                day.isToday && !isSelected && "text-primary font-semibold",
                day.isCurrentMonth && !isSelected && "hover:bg-surface-container text-on-surface",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {day.date}
              {/* Event / mood indicator dots */}
              {(day.hasEvents || day.hasMood) && (
                <span className="flex gap-0.5 mt-0.5">
                  {day.hasMood && <span className="h-1 w-1 rounded-full bg-primary-fixed-dim" />}
                  {day.hasEvents && <span className="h-1 w-1 rounded-full bg-tertiary-fixed-dim" />}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import type { Meta, StoryObj } from "@storybook/react";

import { AIInsightsPanel } from "../organisms/ai-insights-panel";
import { CalendarGrid } from "../organisms/calendar-grid";

import { CalendarTemplate } from "./calendar-template";

const APRIL_DAYS = Array.from({ length: 35 }, (_, i) => {
  const date = i - 1; // April starts on Tuesday (index 2 = 1st)
  const isCurrentMonth = date >= 1 && date <= 30;
  return {
    date: isCurrentMonth ? date : date <= 0 ? 31 + date : date - 30,
    isCurrentMonth,
    isToday: date === 8,
    hasMood: isCurrentMonth && [1, 3, 5, 7, 8].includes(date),
    hasEvents: isCurrentMonth && [3, 10, 17].includes(date),
  };
});

const Grid = <CalendarGrid month="2026-04" days={APRIL_DAYS} selectedDate={8} />;

const DayDetail = (
  <div className="rounded-2xl bg-surface-container-low p-5">
    <p className="font-display text-base font-semibold text-on-surface mb-3">Wednesday, 8 April</p>
    <div className="flex flex-col gap-2">
      <div className="rounded-xl bg-surface-container p-3">
        <p className="font-body text-sm font-medium text-on-surface">School run</p>
        <p className="font-body text-xs text-on-surface-variant mt-0.5">8:30 AM</p>
      </div>
      <div className="rounded-xl bg-surface-container p-3">
        <p className="font-body text-sm font-medium text-on-surface">Therapy appointment</p>
        <p className="font-body text-xs text-on-surface-variant mt-0.5">2:00 PM</p>
      </div>
    </div>
  </div>
);

const AiPanel = (
  <AIInsightsPanel
    title="This week"
    insight="You have 2 events on Wednesday. Your mood logged highest on days with structured schedules."
    metrics={[
      { label: "Events", value: "3", trend: "stable" },
      { label: "Mood days", value: "5", trend: "up" },
    ]}
  />
);

const meta = {
  title: "Templates/CalendarTemplate",
  component: CalendarTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "surface" },
  },
} satisfies Meta<typeof CalendarTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Grid only",
  args: { calendarGrid: Grid },
};

export const WithDayDetail: Story = {
  name: "With day detail",
  args: { calendarGrid: Grid, dayDetail: DayDetail },
};

export const WithAiPanel: Story = {
  name: "With AI panel",
  args: { calendarGrid: Grid, dayDetail: DayDetail, aiPanel: AiPanel },
};

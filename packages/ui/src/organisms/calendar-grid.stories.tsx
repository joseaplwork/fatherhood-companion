import type { Meta, StoryObj } from "@storybook/react";

import { CalendarGrid } from "./calendar-grid";

const marchDays = Array.from({ length: 35 }, (_, i) => {
  const dayNum = i - 5; // March 2026 starts on Sunday (offset 0)
  const date = dayNum + 1;
  const isCurrentMonth = dayNum >= 0 && dayNum < 31;
  return {
    date: isCurrentMonth ? date : dayNum < 0 ? 22 + i : date - 31,
    isCurrentMonth,
    isToday: date === 26 && isCurrentMonth,
    hasEvents: isCurrentMonth && [5, 12, 19, 26].includes(date),
    hasMood: isCurrentMonth && [1, 3, 7, 10, 14, 18, 20, 24, 26].includes(date),
  };
});

const meta = {
  title: "Organisms/CalendarGrid",
  component: CalendarGrid,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    month: { control: "text", description: "YYYY-MM format." },
    selectedDate: { control: { type: "number" } },
  },
} satisfies Meta<typeof CalendarGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const March2026: Story = {
  name: "March 2026",
  args: {
    month: "2026-03",
    days: marchDays,
    selectedDate: 26,
    onPrevMonth: () => {},
    onNextMonth: () => {},
    onSelectDate: () => {},
  },
};

export const NoSelection: Story = {
  name: "No selection",
  args: {
    month: "2026-03",
    days: marchDays,
    selectedDate: null,
    onPrevMonth: () => {},
    onNextMonth: () => {},
    onSelectDate: () => {},
  },
};

export const Empty: Story = {
  name: "Empty month (no events or moods)",
  args: {
    month: "2026-04",
    days: Array.from({ length: 35 }, (_, i) => {
      const date = i - 2;
      return { date: date < 0 ? 29 + i : date + 1, isCurrentMonth: date >= 0 && date < 30 };
    }),
    onPrevMonth: () => {},
    onNextMonth: () => {},
  },
};

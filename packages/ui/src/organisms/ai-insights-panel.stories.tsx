import type { Meta, StoryObj } from "@storybook/react";

import { AIInsightsPanel } from "./ai-insights-panel";

const meta = {
  title: "Organisms/AIInsightsPanel",
  component: AIInsightsPanel,
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
    title: { control: "text" },
    insight: { control: "text" },
  },
} satisfies Meta<typeof AIInsightsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InsightOnly: Story = {
  name: "Insight only",
  args: {
    title: "AI Insights",
    insight:
      "Your mood has improved by 0.8 points over the past week. The entries mentioning 'exercise' tend to correlate with your highest mood scores.",
  },
};

export const WithMetrics: Story = {
  name: "With metrics",
  args: {
    title: "Weekly summary",
    insight: "You're on a 7-day entry streak — your longest yet.",
    metrics: [
      { label: "Avg mood", value: "4.2", trend: "up" },
      { label: "Entries", value: "7", trend: "stable" },
      { label: "Top emotion", value: "Grateful", trend: "up" },
    ],
  },
};

export const MetricsOnly: Story = {
  name: "Metrics only",
  args: {
    title: "Quick stats",
    metrics: [
      { label: "Streak", value: "7 days", trend: "up" },
      { label: "Sleep", value: "6.2h", trend: "down" },
    ],
  },
};

export const Empty: Story = {
  args: { title: "AI Insights" },
};

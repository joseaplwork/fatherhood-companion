import type { Meta, StoryObj } from "@storybook/react";
import { MetricChip } from "./metric-chip";

const meta = {
  title: "Molecules/MetricChip",
  component: MetricChip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    trend: {
      control: "select",
      options: ["up", "down", "stable"],
      description: "up → primary (green arrow), down → error (red arrow), stable → neutral.",
    },
    label: { control: "text" },
    value: { control: "text" },
  },
} satisfies Meta<typeof MetricChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Improving: Story = {
  args: { label: "Avg mood", value: "4.2", trend: "up" },
};

export const Declining: Story = {
  args: { label: "Sleep quality", value: "2.8", trend: "down" },
};

export const Stable: Story = {
  args: { label: "Entries this week", value: "5", trend: "stable" },
};

export const Dashboard: Story = {
  name: "Dashboard row",
  args: { label: "Avg mood", value: "4.2" },
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <MetricChip label="Avg mood" value="4.2" trend="up" />
      <MetricChip label="Streak" value="7 days" trend="up" />
      <MetricChip label="Sleep" value="2.8" trend="down" />
      <MetricChip label="Entries" value="14" trend="stable" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { MoodBarChart } from "./mood-bar-chart";

const meta = {
  title: "Organisms/MoodBarChart",
  component: MoodBarChart,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80 p-4 rounded-2xl bg-surface-container-low">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    data: {
      control: "object",
      description: "7 values for Mon–Sun. 0 = no entry (renders grey stub).",
    },
  },
} satisfies Meta<typeof MoodBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GoodWeek: Story = {
  name: "Good week",
  args: { data: [4, 5, 4, 3, 4, 5, 5] },
};

export const MixedWeek: Story = {
  name: "Mixed week",
  args: { data: [3, 2, 4, 1, 3, 4, 5] },
};

export const PartialEntries: Story = {
  name: "Partial entries (gaps)",
  args: { data: [4, 0, 3, 0, 4, 0, 5] },
};

export const AllMissing: Story = {
  name: "No entries this week",
  args: { data: [0, 0, 0, 0, 0, 0, 0] },
};

export const FullStruggle: Story = {
  name: "Difficult week",
  args: { data: [1, 2, 1, 2, 1, 1, 2] },
};

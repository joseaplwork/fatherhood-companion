import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "./slider";

const meta = {
  title: "Atoms/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-72 px-2">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    value: { control: { type: "number" } },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MoodScale: Story = {
  name: "Mood scale (1–5)",
  args: { min: 1, max: 5, step: 1, defaultValue: 3 },
};

export const Percentage: Story = {
  name: "Percentage (0–100)",
  args: { min: 0, max: 100, step: 5, defaultValue: 60 },
};

export const Disabled: Story = {
  args: { min: 1, max: 5, step: 1, defaultValue: 2, disabled: true },
};

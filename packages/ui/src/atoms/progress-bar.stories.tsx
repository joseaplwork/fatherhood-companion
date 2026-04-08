import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./progress-bar";

const meta = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    label: { control: "text" },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { value: 0, label: "Progress" },
};

export const Quarter: Story = {
  args: { value: 25, label: "Progress" },
};

export const Half: Story = {
  args: { value: 50, label: "Progress" },
};

export const Complete: Story = {
  args: { value: 100, label: "Progress" },
};

export const Interactive: Story = {
  args: { value: 65, label: "Course completion" },
};

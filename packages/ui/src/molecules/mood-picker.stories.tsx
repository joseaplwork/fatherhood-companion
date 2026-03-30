import type { Meta, StoryObj } from "@storybook/react";
import { MoodPicker } from "./mood-picker";

const meta = {
  title: "Molecules/MoodPicker",
  component: MoodPicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-72 p-4 rounded-2xl bg-surface-container-low">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: "select",
      options: [1, 2, 3, 4, 5],
      description: "1=Struggling · 2=Low · 3=Okay · 4=Good · 5=Great",
    },
  },
} satisfies Meta<typeof MoodPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Struggling: Story = { args: { value: 1 } };
export const Low: Story = { args: { value: 2 } };
export const Okay: Story = { args: { value: 3 } };
export const Good: Story = { args: { value: 4 } };
export const Great: Story = { args: { value: 5 } };

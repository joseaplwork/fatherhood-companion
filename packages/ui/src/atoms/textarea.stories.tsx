import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
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
    error: {
      control: "boolean",
      description:
        "Error state. Normal state uses rounded-2xl (not rounded-full like Input) to allow comfortable multi-line editing.",
    },
    disabled: { control: "boolean" },
    rows: { control: { type: "number" } },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "What's on your mind today?", rows: 4 },
};

export const WithContent: Story = {
  args: {
    defaultValue:
      "Had a really tough morning with the kids — late start, missed the bus. But we laughed about it afterwards.",
    rows: 4,
  },
};

export const ErrorState: Story = {
  args: { placeholder: "Required field", error: true, rows: 3 },
};

export const Disabled: Story = {
  args: { placeholder: "Not editable", disabled: true, rows: 3 },
};

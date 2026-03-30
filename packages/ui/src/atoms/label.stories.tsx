import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";

const meta = {
  title: "Atoms/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    children: { control: "text" },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Mood today" },
};

export const WithHtmlFor: Story = {
  name: "Paired with input",
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Label htmlFor="demo-input">Your name</Label>
      <input
        id="demo-input"
        placeholder="Marcus Davies"
        className="rounded-full px-5 py-3 bg-white text-sm font-body outline-none ring-1 ring-outline-variant/30"
      />
    </div>
  ),
};

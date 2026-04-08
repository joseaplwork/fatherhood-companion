import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from "./toggle";

const meta = {
  title: "Atoms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: { label: "Daily mood reminder", defaultChecked: false },
};

export const On: Story = {
  args: { label: "Daily mood reminder", defaultChecked: true },
};

export const NoLabel: Story = {
  name: "No label",
  args: { defaultChecked: false },
};

export const Disabled: Story = {
  args: { label: "Locked setting", disabled: true, defaultChecked: false },
};

export const DisabledOn: Story = {
  name: "Disabled (on)",
  args: { label: "Locked setting", disabled: true, defaultChecked: true },
};

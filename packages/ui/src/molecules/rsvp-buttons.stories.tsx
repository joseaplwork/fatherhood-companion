import type { Meta, StoryObj } from "@storybook/react";
import { RsvpButtons } from "./rsvp-buttons";

const meta = {
  title: "Molecules/RsvpButtons",
  component: RsvpButtons,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    value: {
      control: "select",
      options: [null, "GOING", "MAYBE", "NOT_GOING"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof RsvpButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unanswered: Story = {
  args: { value: null, onChange: () => {} },
};

export const Going: Story = {
  args: { value: "GOING", onChange: () => {} },
};

export const Maybe: Story = {
  args: { value: "MAYBE", onChange: () => {} },
};

export const NotGoing: Story = {
  name: "Can't go",
  args: { value: "NOT_GOING", onChange: () => {} },
};

export const Disabled: Story = {
  args: { value: "GOING", disabled: true },
};

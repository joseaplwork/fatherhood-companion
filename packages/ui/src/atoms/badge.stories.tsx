import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "selected", "error", "secondary"],
      description:
        "default = neutral surface, selected = primary-container, error = error-container, secondary = secondary-fixed.",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "default", children: "Mental Health" },
};

export const Selected: Story = {
  args: { variant: "selected", children: "Co-Parenting" },
};

export const ErrorBadge: Story = {
  name: "Error",
  args: { variant: "error", children: "Overdue" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Self-Care" },
};

export const AllVariants: Story = {
  name: "All variants",
  args: { children: "Badge" },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="selected">Selected</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="secondary">Secondary</Badge>
    </div>
  ),
};

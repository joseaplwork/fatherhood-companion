import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "ai"],
      description: "Visual variant. 'ai' uses the gradient from primary→tertiary.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", size: "md", children: "Continue" },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "md", children: "Save draft" },
};

export const Ghost: Story = {
  args: { variant: "ghost", size: "md", children: "Cancel" },
};

export const AiAction: Story = {
  name: "AI Action",
  args: { variant: "ai", size: "md", children: "✦ Summarise" },
};

export const Small: Story = {
  args: { variant: "primary", size: "sm", children: "Small" },
};

export const Large: Story = {
  args: { variant: "primary", size: "lg", children: "Get started" },
};

export const Disabled: Story = {
  args: { variant: "primary", size: "md", disabled: true, children: "Unavailable" },
};

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="ai">✦ AI Action</Button>
    </div>
  ),
};

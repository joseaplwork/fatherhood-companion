import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "sm=16px, md=24px, lg=40px. Border uses primary-container.",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { size: "sm" },
};

export const Medium: Story = {
  args: { size: "md" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const AllSizes: Story = {
  name: "All sizes",
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./avatar";

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "sm=32px, md=40px, lg=48px, xl=64px",
    },
    src: { control: "text" },
    name: { control: "text" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInitials: Story = {
  args: { name: "Marcus Davies", size: "md" },
};

export const WithImage: Story = {
  args: {
    src: "https://api.dicebear.com/8.x/thumbs/svg?seed=dad",
    name: "Marcus Davies",
    size: "md",
  },
};

export const AllSizes: Story = {
  name: "All sizes",
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar name="Marcus Davies" size="sm" />
      <Avatar name="Marcus Davies" size="md" />
      <Avatar name="Marcus Davies" size="lg" />
      <Avatar name="Marcus Davies" size="xl" />
    </div>
  ),
};

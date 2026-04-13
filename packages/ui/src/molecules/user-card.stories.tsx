import type { Meta, StoryObj } from "@storybook/react";

import { UserCard } from "./user-card";

const meta = {
  title: "Molecules/UserCard",
  component: UserCard,
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
    name: { control: "text" },
    location: { control: "text" },
    bio: { control: "text" },
    isVerified: { control: "boolean" },
    helpCount: { control: { type: "number" } },
  },
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { name: "Marcus Davies" },
};

export const Full: Story = {
  args: {
    name: "Marcus Davies",
    location: "Manchester, UK",
    bio: "Co-parent of two. Co-parenting veteran. Happy to chat about custody schedules.",
    isVerified: true,
    helpCount: 34,
  },
};

export const Verified: Story = {
  args: {
    name: "Jamie Torres",
    location: "Austin, TX",
    isVerified: true,
    helpCount: 12,
  },
};

export const WithAvatar: Story = {
  args: {
    name: "Raj Patel",
    avatarSrc: "https://api.dicebear.com/8.x/thumbs/svg?seed=raj",
    location: "London, UK",
    bio: "Co-parent of one. Mental health advocate.",
    isVerified: false,
  },
};

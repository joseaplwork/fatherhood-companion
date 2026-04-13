import type { Meta, StoryObj } from "@storybook/react";

import { PostCard } from "./post-card";

const meta = {
  title: "Organisms/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isPinned: { control: "boolean" },
    isLocked: { control: "boolean" },
    title: { control: "text" },
    content: { control: "text" },
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "How do you handle bedtime routines solo?",
    content:
      "Struggling to get both kids down before 9pm. My 4-year-old refuses to sleep without a story and my 7-year-old wants to stay up. Any tips?",
    authorName: "Marcus Davies",
    createdAt: "2 hr ago",
    replyCount: 12,
    reactions: [
      { type: "HEART", count: 8 },
      { type: "HELPFUL", count: 5 },
    ],
  },
};

export const Pinned: Story = {
  args: {
    title: "Welcome to the Community Hub — read first!",
    content: "House rules, how to find a buddy, and what to expect here.",
    authorName: "Grove Companion Team",
    createdAt: "1 week ago",
    isPinned: true,
    replyCount: 3,
    reactions: [{ type: "HEART", count: 24 }],
  },
};

export const PinnedAndLocked: Story = {
  name: "Pinned + locked",
  args: {
    title: "Mega thread: custody schedule templates",
    content:
      "Share your custody schedule templates here. This thread is pinned and locked for new replies — DM mods to add yours.",
    authorName: "Marcus Davies",
    createdAt: "3 days ago",
    isPinned: true,
    isLocked: true,
    replyCount: 47,
  },
};

export const NoReactions: Story = {
  name: "No reactions yet",
  args: {
    title: "First post — feeling nervous!",
    content:
      "Hi everyone, just joined. Co-parent of one here, 18 months in. Not sure where to start.",
    authorName: "NewCoParent_2025",
    createdAt: "5 min ago",
    replyCount: 0,
    reactions: [],
  },
};

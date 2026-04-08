import type { Meta, StoryObj } from "@storybook/react";

import { NotificationItem } from "./notification-item";

const meta = {
  title: "Molecules/NotificationItem",
  component: NotificationItem,
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
    isRead: { control: "boolean", description: "Read items render at 60% opacity." },
    iconName: { control: "text" },
    title: { control: "text" },
    body: { control: "text" },
    time: { control: "text" },
  },
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unread: Story = {
  args: {
    title: "AI check-in",
    body: "You mentioned feeling stressed about finances last week. I have a resource that might help.",
    time: "2 min ago",
    iconName: "auto_awesome",
    isRead: false,
  },
};

export const Read: Story = {
  args: {
    title: "Community reply",
    body: "Jamie Torres replied to your post in 'Co-parenting wins'.",
    time: "1 hr ago",
    iconName: "forum",
    isRead: true,
  },
};

export const EventReminder: Story = {
  name: "Event reminder",
  args: {
    title: "Reminder: Dads Together meetup",
    body: "Starting in 2 hours at the Manchester Community Centre.",
    time: "Just now",
    iconName: "event",
    isRead: false,
  },
};

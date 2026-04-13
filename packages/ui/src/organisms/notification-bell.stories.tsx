import type { Meta, StoryObj } from "@storybook/react";

import { NotificationBell } from "./notification-bell";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "AI check-in",
    body: "You mentioned feeling stressed last week. I found a resource that might help.",
    time: "2 min ago",
    iconName: "auto_awesome",
    isRead: false,
  },
  {
    id: "2",
    title: "Community reply",
    body: "Jamie Torres replied to your post.",
    time: "1 hr ago",
    iconName: "forum",
    isRead: false,
  },
  {
    id: "3",
    title: "Event reminder",
    body: "Co-Parents Together meetup starts in 2 hours.",
    time: "2 hr ago",
    iconName: "event",
    isRead: true,
  },
];

const meta = {
  title: "Organisms/NotificationBell",
  component: NotificationBell,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="flex items-start justify-center pt-4 h-96">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    unreadCount: { control: { type: "number", min: 0, max: 99 } },
  },
} satisfies Meta<typeof NotificationBell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoUnread: Story = {
  name: "No unread",
  args: { unreadCount: 0, notifications: NOTIFICATIONS },
};

export const WithUnread: Story = {
  name: "2 unread (badge shown)",
  args: { unreadCount: 2, notifications: NOTIFICATIONS },
};

export const ManyUnread: Story = {
  name: "10+ unread",
  args: { unreadCount: 12, notifications: NOTIFICATIONS },
};

export const Empty: Story = {
  name: "Empty (caught up)",
  args: { unreadCount: 0, notifications: [] },
};

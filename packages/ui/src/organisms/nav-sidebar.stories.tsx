import type { Meta, StoryObj } from "@storybook/react";

import { NavSidebar } from "./nav-sidebar";

const NAV_LINKS = [
  { icon: "dashboard", label: "Dashboard", href: "#", active: true },
  { icon: "book", label: "Diary", href: "#" },
  { icon: "people", label: "Community", href: "#" },
  { icon: "calendar_today", label: "Calendar", href: "#" },
  { icon: "library_books", label: "Resources", href: "#" },
  { icon: "support_agent", label: "Buddy", href: "#" },
];

const meta = {
  title: "Organisms/NavSidebar",
  component: NavSidebar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="h-screen bg-surface-container-low flex">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    userName: { control: "text" },
  },
} satisfies Meta<typeof NavSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    links: NAV_LINKS,
    userName: "Marcus Davies",
    onSignOut: () => {},
  },
};

export const WithAvatar: Story = {
  args: {
    links: NAV_LINKS,
    userName: "Marcus Davies",
    userAvatarSrc: "https://api.dicebear.com/8.x/thumbs/svg?seed=dad",
    onSignOut: () => {},
  },
};

export const CommunityActive: Story = {
  name: "Community active",
  args: {
    links: NAV_LINKS.map((l, i) => ({ ...l, active: i === 2 })),
    userName: "Marcus Davies",
  },
};

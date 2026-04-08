import type { Meta, StoryObj } from "@storybook/react";

import { NavItem } from "./nav-item";

const meta = {
  title: "Molecules/NavItem",
  component: NavItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    active: {
      control: "boolean",
      description:
        "Active → primary-container background, filled icon. Inactive → ghost with hover.",
    },
    label: { control: "text" },
    icon: { control: "text" },
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: { icon: "dashboard", label: "Dashboard", active: false },
};

export const Active: Story = {
  args: { icon: "dashboard", label: "Dashboard", active: true },
};

export const NavStack: Story = {
  name: "Full nav stack",
  args: { icon: "dashboard", label: "Dashboard" },
  render: () => (
    <div className="flex flex-col gap-1 w-56">
      <NavItem icon="dashboard" label="Dashboard" active />
      <NavItem icon="book" label="Diary" />
      <NavItem icon="people" label="Community" />
      <NavItem icon="calendar_today" label="Calendar" />
      <NavItem icon="library_books" label="Resources" />
      <NavItem icon="support_agent" label="Buddy" />
    </div>
  ),
};

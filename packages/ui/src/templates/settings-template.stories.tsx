import type { Meta, StoryObj } from "@storybook/react";

import { NavSidebar } from "../organisms/nav-sidebar";

import { SettingsTemplate } from "./settings-template";

const NAV_LINKS = [
  { icon: "dashboard", label: "Dashboard", href: "#" },
  { icon: "book", label: "Diary", href: "#" },
  { icon: "chat", label: "Chat", href: "#" },
  { icon: "group", label: "Community", href: "#" },
  { icon: "settings", label: "Settings", href: "#", active: true },
];

const Sidebar = <NavSidebar links={NAV_LINKS} userName="Marcus" userAvatarSrc={null} />;

const SectionNav = (
  <nav className="flex flex-col gap-1">
    <p className="font-display text-xs font-semibold text-on-surface-variant uppercase tracking-wider px-3 mb-2">
      Settings
    </p>
    {["Profile", "Notifications", "Privacy", "Account"].map((label, i) => (
      <button
        key={label}
        type="button"
        className={[
          "w-full text-left rounded-xl px-3 py-2 font-body text-sm transition-colors",
          i === 0
            ? "bg-primary-container text-on-primary-container"
            : "text-on-surface hover:bg-surface-container-low",
        ].join(" ")}
      >
        {label}
      </button>
    ))}
  </nav>
);

const ProfileContent = (
  <div className="flex flex-col gap-6 max-w-lg">
    <div>
      <h1 className="font-display text-2xl font-semibold text-on-surface">Profile</h1>
      <p className="font-body text-sm text-on-surface-variant mt-1">
        Manage how you appear in the app
      </p>
    </div>
    <div className="flex flex-col gap-4 rounded-2xl bg-surface-container-low p-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="display-name" className="font-body text-sm font-medium text-on-surface">
          Display name
        </label>
        <input
          id="display-name"
          type="text"
          defaultValue="Marcus"
          className="rounded-xl bg-surface px-4 py-3 font-body text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="settings-email" className="font-body text-sm font-medium text-on-surface">
          Email
        </label>
        <input
          id="settings-email"
          type="email"
          defaultValue="marcus@example.com"
          className="rounded-xl bg-surface px-4 py-3 font-body text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  </div>
);

const meta = {
  title: "Templates/SettingsTemplate",
  component: SettingsTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "surface" },
  },
} satisfies Meta<typeof SettingsTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Profile section",
  args: {
    sidebar: Sidebar,
    sectionNav: SectionNav,
    content: ProfileContent,
  },
};

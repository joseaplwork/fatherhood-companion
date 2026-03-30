import type { Meta, StoryObj } from "@storybook/react";
import { AIInsightsPanel } from "../organisms/ai-insights-panel";
import { MoodBarChart } from "../organisms/mood-bar-chart";
import { NavSidebar } from "../organisms/nav-sidebar";
import { DashboardTemplate } from "./dashboard-template";

const NAV_LINKS = [
  { icon: "dashboard", label: "Dashboard", href: "#", active: true },
  { icon: "book", label: "Diary", href: "#" },
  { icon: "people", label: "Community", href: "#" },
  { icon: "calendar_today", label: "Calendar", href: "#" },
  { icon: "library_books", label: "Resources", href: "#" },
  { icon: "support_agent", label: "Buddy", href: "#" },
];

const Sidebar = <NavSidebar links={NAV_LINKS} userName="Marcus Davies" onSignOut={() => {}} />;

const AiPanel = (
  <AIInsightsPanel
    title="Weekly summary"
    insight="Your mood has trended upward this week — great work logging daily."
    metrics={[
      { label: "Avg mood", value: "4.2", trend: "up" },
      { label: "Streak", value: "7 days", trend: "up" },
    ]}
  />
);

const Main = (
  <div className="flex flex-col gap-6 max-w-2xl">
    <div>
      <h1 className="font-display text-3xl font-semibold text-on-surface">Good morning, Marcus</h1>
      <p className="font-body text-sm text-on-surface-variant mt-1">Wednesday, 26 March 2026</p>
    </div>
    <div className="rounded-2xl bg-surface-container-low p-5">
      <h2 className="font-display text-base font-semibold text-on-surface mb-4">Mood this week</h2>
      <MoodBarChart data={[4, 5, 3, 4, 5, 0, 0]} />
    </div>
  </div>
);

const meta = {
  title: "Templates/DashboardTemplate",
  component: DashboardTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "surface" },
  },
} satisfies Meta<typeof DashboardTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAiPanel: Story = {
  name: "With AI panel",
  args: {
    sidebar: Sidebar,
    main: Main,
    aiPanel: AiPanel,
  },
};

export const NoAiPanel: Story = {
  name: "Without AI panel",
  args: {
    sidebar: Sidebar,
    main: Main,
  },
};

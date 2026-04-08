import type { Meta, StoryObj } from "@storybook/react";

import { AIInsightsPanel } from "../organisms/ai-insights-panel";
import { DiaryEntryCard } from "../organisms/diary-entry-card";

import { DiaryTemplate } from "./diary-template";

const entries = [
  {
    id: "1",
    date: "Wednesday, 26 Mar",
    mood: 4 as const,
    note: "Had a good morning with the kids. Felt present and calm.",
    emotions: ["Calm", "Connected"],
  },
  {
    id: "2",
    date: "Tuesday, 25 Mar",
    mood: 2 as const,
    note: "Rough day at work. Hard to switch off in the evening.",
    emotions: ["Stressed", "Tired"],
  },
  {
    id: "3",
    date: "Monday, 24 Mar",
    mood: 3 as const,
  },
];

const EntryList = (
  <div className="flex flex-col gap-4 max-w-2xl">
    <div className="flex items-center justify-between mb-2">
      <h1 className="font-display text-3xl font-semibold text-on-surface">Diary</h1>
    </div>
    {entries.map((e) => (
      <DiaryEntryCard key={e.id} date={e.date} mood={e.mood} note={e.note} emotions={e.emotions} />
    ))}
  </div>
);

const AiPanel = (
  <AIInsightsPanel
    title="Mood patterns"
    insight="You tend to log lower moods mid-week. Consider a short wind-down ritual on Tuesday evenings."
    metrics={[
      { label: "Avg mood", value: "3.0", trend: "stable" },
      { label: "Entries", value: "3", trend: "up" },
    ]}
  />
);

const meta = {
  title: "Templates/DiaryTemplate",
  component: DiaryTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "surface" },
  },
} satisfies Meta<typeof DiaryTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Entry list only",
  args: { entryList: EntryList },
};

export const WithAiPanel: Story = {
  name: "With AI panel",
  args: { entryList: EntryList, aiPanel: AiPanel },
};

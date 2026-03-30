import type { Meta, StoryObj } from "@storybook/react";
import { DiaryEntryCard } from "./diary-entry-card";

const meta = {
  title: "Organisms/DiaryEntryCard",
  component: DiaryEntryCard,
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
    mood: {
      control: "select",
      options: [1, 2, 3, 4, 5],
      description: "1=Struggling · 2=Low · 3=Okay · 4=Good · 5=Great",
    },
    date: { control: "text" },
    note: { control: "text" },
  },
} satisfies Meta<typeof DiaryEntryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GreatDay: Story = {
  name: "Great day with emotions",
  args: {
    date: "Wed, 26 Mar 2026",
    mood: 5,
    note: "Had the best morning with the kids. We baked pancakes and they were so proud of themselves. These are the moments that make it all worth it.",
    emotions: ["JOYFUL", "GRATEFUL", "PROUD"],
  },
};

export const ToughDay: Story = {
  name: "Tough day",
  args: {
    date: "Tue, 25 Mar 2026",
    mood: 2,
    note: "Rough day at work and then a difficult call with the ex about the schedule. Feeling pretty drained.",
    emotions: ["ANXIOUS", "FRUSTRATED"],
  },
};

export const NoteOnly: Story = {
  name: "Note only (no emotions)",
  args: {
    date: "Mon, 24 Mar 2026",
    mood: 3,
    note: "Quiet day. Got some work done. Kids were at their mum's.",
    emotions: [],
  },
};

export const MoodOnly: Story = {
  name: "Mood only (no note)",
  args: {
    date: "Sun, 23 Mar 2026",
    mood: 4,
    emotions: ["HOPEFUL"],
  },
};

export const WithImages: Story = {
  name: "With photos",
  args: {
    date: "Sat, 22 Mar 2026",
    mood: 5,
    note: "Park day!",
    emotions: ["JOYFUL"],
    imageUrls: [
      "https://picsum.photos/seed/park1/200/200",
      "https://picsum.photos/seed/park2/200/200",
      "https://picsum.photos/seed/park3/200/200",
    ],
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { EmotionTag } from "./emotion-tag";

const meta = {
  title: "Molecules/EmotionTag",
  component: EmotionTag,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    emotion: {
      control: "select",
      options: [
        "JOYFUL",
        "REFLECTIVE",
        "ANXIOUS",
        "GRATEFUL",
        "LONELY",
        "HOPEFUL",
        "FRUSTRATED",
        "PROUD",
      ],
      description: "Each emotion maps to a specific surface color from the design system.",
    },
  },
} satisfies Meta<typeof EmotionTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Joyful: Story = { args: { emotion: "JOYFUL" } };
export const Reflective: Story = { args: { emotion: "REFLECTIVE" } };
export const Anxious: Story = { args: { emotion: "ANXIOUS" } };
export const Grateful: Story = { args: { emotion: "GRATEFUL" } };
export const Lonely: Story = { args: { emotion: "LONELY" } };
export const Hopeful: Story = { args: { emotion: "HOPEFUL" } };
export const Frustrated: Story = { args: { emotion: "FRUSTRATED" } };
export const Proud: Story = { args: { emotion: "PROUD" } };

export const AllEmotions: Story = {
  name: "All emotions",
  args: { emotion: "JOYFUL" },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {[
        "JOYFUL",
        "REFLECTIVE",
        "ANXIOUS",
        "GRATEFUL",
        "LONELY",
        "HOPEFUL",
        "FRUSTRATED",
        "PROUD",
      ].map((emotion) => (
        <EmotionTag key={emotion} emotion={emotion} />
      ))}
    </div>
  ),
};

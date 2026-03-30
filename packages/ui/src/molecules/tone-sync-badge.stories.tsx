import type { Meta, StoryObj } from "@storybook/react";
import { ToneSyncBadge } from "./tone-sync-badge";

const meta = {
  title: "Molecules/ToneSyncBadge",
  component: ToneSyncBadge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    tone: {
      control: "select",
      options: ["Calm", "Direct", "Encouraging", "Empathetic", "Analytical"],
      description: "The AI tone the assistant has synced to based on the user's mood pattern.",
    },
  },
} satisfies Meta<typeof ToneSyncBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Calm: Story = { args: { tone: "Calm" } };
export const Direct: Story = { args: { tone: "Direct" } };
export const Encouraging: Story = { args: { tone: "Encouraging" } };
export const Empathetic: Story = { args: { tone: "Empathetic" } };

export const AllTones: Story = {
  name: "All tones",
  args: { tone: "Calm" },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {["Calm", "Direct", "Encouraging", "Empathetic", "Analytical"].map((tone) => (
        <ToneSyncBadge key={tone} tone={tone} />
      ))}
    </div>
  ),
};

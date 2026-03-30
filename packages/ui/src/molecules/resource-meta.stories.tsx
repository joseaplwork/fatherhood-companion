import type { Meta, StoryObj } from "@storybook/react";
import { ResourceMeta } from "./resource-meta";

const meta = {
  title: "Molecules/ResourceMeta",
  component: ResourceMeta,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80 p-4 rounded-2xl bg-surface-container-low">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: "select",
      options: ["ARTICLE", "VIDEO", "EXERCISE", "MINI_COURSE", "GUIDE"],
    },
    category: {
      control: "select",
      options: [
        "MENTAL_HEALTH",
        "CO_PARENTING",
        "LEGAL",
        "FINANCE",
        "CHILD_DEVELOPMENT",
        "SELF_CARE",
        "COMMUNITY",
      ],
    },
    isSaved: { control: "boolean" },
    isCompleted: { control: "boolean" },
  },
} satisfies Meta<typeof ResourceMeta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {
  args: {
    type: "ARTICLE",
    category: "MENTAL_HEALTH",
    isSaved: false,
    isCompleted: false,
    onSave: () => {},
    onComplete: () => {},
  },
};

export const VideoSaved: Story = {
  name: "Video (saved)",
  args: {
    type: "VIDEO",
    category: "CO_PARENTING",
    isSaved: true,
    isCompleted: false,
    onSave: () => {},
    onComplete: () => {},
  },
};

export const Completed: Story = {
  args: {
    type: "GUIDE",
    category: "LEGAL",
    isSaved: true,
    isCompleted: true,
    onSave: () => {},
    onComplete: () => {},
  },
};

export const ReadOnly: Story = {
  name: "Read only (no actions)",
  args: {
    type: "MINI_COURSE",
    category: "FINANCE",
  },
};

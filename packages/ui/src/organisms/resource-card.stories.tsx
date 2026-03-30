import type { Meta, StoryObj } from "@storybook/react";
import { ResourceCard } from "./resource-card";

const meta = {
  title: "Organisms/ResourceCard",
  component: ResourceCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-72">
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
    isAiEnhanced: { control: "boolean" },
    isSaved: { control: "boolean" },
    isCompleted: { control: "boolean" },
  },
} satisfies Meta<typeof ResourceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {
  args: {
    title: "Understanding Your Rights: A Guide to Sole Custody",
    description:
      "A plain-English overview of sole custody arrangements, what they mean day-to-day, and how to navigate disputes.",
    type: "ARTICLE",
    category: "LEGAL",
    isAiEnhanced: false,
    isSaved: false,
    onSave: () => {},
    onComplete: () => {},
  },
};

export const VideoWithThumbnail: Story = {
  name: "Video with thumbnail",
  args: {
    title: "5-Minute Mindfulness for Dads",
    description: "A short guided session designed for busy dads who have just 5 minutes.",
    type: "VIDEO",
    category: "MENTAL_HEALTH",
    thumbnailUrl: "https://picsum.photos/seed/mindfulness/400/200",
    isAiEnhanced: true,
    isSaved: true,
    onSave: () => {},
    onComplete: () => {},
  },
};

export const AiEnhancedNoThumbnail: Story = {
  name: "AI enhanced (no thumbnail)",
  args: {
    title: "Personalised Co-Parenting Communication Plan",
    description: "AI-generated based on your recent diary entries and tone preferences.",
    type: "GUIDE",
    category: "CO_PARENTING",
    isAiEnhanced: true,
    isSaved: false,
    onSave: () => {},
  },
};

export const Completed: Story = {
  args: {
    title: "Finance Basics for Single Parents",
    description: "Budgeting, tax credits, and child maintenance — everything in one place.",
    type: "MINI_COURSE",
    category: "FINANCE",
    isSaved: true,
    isCompleted: true,
    onSave: () => {},
    onComplete: () => {},
  },
};

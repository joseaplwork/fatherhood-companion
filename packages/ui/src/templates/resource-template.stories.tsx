import type { Meta, StoryObj } from "@storybook/react";

import { ResourceCard } from "../organisms/resource-card";

import { ResourceTemplate } from "./resource-template";

const resources = [
  {
    id: "1",
    title: "Understanding Parental Alienation",
    description:
      "A practical guide to recognising and responding to parental alienation with compassion.",
    category: "Legal",
    readTime: "8 min read",
    isSaved: true,
  },
  {
    id: "2",
    title: "Mindfulness for Busy Dads",
    description: "Short mindfulness practices that fit into a packed schedule.",
    category: "Wellbeing",
    readTime: "5 min read",
    isSaved: false,
  },
  {
    id: "3",
    title: "Co-parenting Communication Scripts",
    description: "Ready-to-use scripts for difficult co-parenting conversations.",
    category: "Co-parenting",
    readTime: "12 min read",
    isSaved: false,
  },
  {
    id: "4",
    title: "School Transitions — What to Expect",
    description: "How to support your child through primary to secondary school changes.",
    category: "Parenting",
    readTime: "6 min read",
    isSaved: true,
  },
];

const Grid = (
  <div className="flex flex-col gap-6 max-w-2xl">
    <h1 className="font-display text-3xl font-semibold text-on-surface">Resources</h1>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {resources.map((r) => (
        <ResourceCard
          key={r.id}
          title={r.title}
          description={r.description}
          category={r.category}
          readTime={r.readTime}
          isSaved={r.isSaved}
        />
      ))}
    </div>
  </div>
);

const SavedPanel = (
  <div className="flex flex-col gap-4">
    <p className="font-display text-sm font-semibold text-on-surface">Saved</p>
    {resources
      .filter((r) => r.isSaved)
      .map((r) => (
        <ResourceCard
          key={r.id}
          title={r.title}
          description={r.description}
          category={r.category}
          readTime={r.readTime}
          isSaved={r.isSaved}
        />
      ))}
  </div>
);

const meta = {
  title: "Templates/ResourceTemplate",
  component: ResourceTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "surface" },
  },
} satisfies Meta<typeof ResourceTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Grid only",
  args: { grid: Grid },
};

export const WithSavedPanel: Story = {
  name: "With saved panel",
  args: { grid: Grid, savedPanel: SavedPanel },
};

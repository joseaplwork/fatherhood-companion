import type { Meta, StoryObj } from "@storybook/react";
import { CategoryFilter } from "./category-filter";

const RESOURCE_OPTIONS = [
  { value: "ALL", label: "All" },
  { value: "MENTAL_HEALTH", label: "Mental Health" },
  { value: "CO_PARENTING", label: "Co-Parenting" },
  { value: "LEGAL", label: "Legal" },
  { value: "FINANCE", label: "Finance" },
  { value: "SELF_CARE", label: "Self Care" },
];

const meta = {
  title: "Molecules/CategoryFilter",
  component: CategoryFilter,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CategoryFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Resources: Story = {
  args: {
    options: RESOURCE_OPTIONS,
    selected: "ALL",
    onChange: () => {},
  },
};

export const MidSelection: Story = {
  name: "Mid-selection",
  args: {
    options: RESOURCE_OPTIONS,
    selected: "CO_PARENTING",
    onChange: () => {},
  },
};

export const EventTypes: Story = {
  name: "Event type filter",
  args: {
    options: [
      { value: "ALL", label: "All events" },
      { value: "IN_PERSON", label: "In person" },
      { value: "VIRTUAL", label: "Virtual" },
    ],
    selected: "ALL",
    onChange: () => {},
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./chip";

const meta = {
  title: "Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    selected: {
      control: "boolean",
      description: "Unselected → surface-container-high. Selected → primary-container with glow.",
    },
    label: { control: "text" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {
  args: { label: "Finance", selected: false },
};

export const Selected: Story = {
  args: { label: "Finance", selected: true },
};

export const FilterRow: Story = {
  name: "Filter row (category picker)",
  args: { label: "All" },
  render: () => {
    const categories = ["All", "Mental Health", "Co-Parenting", "Legal", "Finance", "Self Care"];
    return (
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <Chip key={cat} label={cat} selected={i === 0} />
        ))}
      </div>
    );
  },
};

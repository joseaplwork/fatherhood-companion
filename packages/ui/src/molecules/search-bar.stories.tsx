import type { Meta, StoryObj } from "@storybook/react";

import { SearchBar } from "./search-bar";

const meta = {
  title: "Molecules/SearchBar",
  component: SearchBar,
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
    placeholder: { control: "text" },
    value: { control: "text" },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { placeholder: "Search resources…" },
};

export const WithValue: Story = {
  args: { value: "co-parenting", placeholder: "Search resources…" },
};

export const CustomPlaceholder: Story = {
  args: { placeholder: "Find a co-parent in your area…" },
};

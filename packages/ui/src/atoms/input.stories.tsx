import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  title: "Atoms/Input",
  component: Input,
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
    error: {
      control: "boolean",
      description:
        "Error state uses ring-error. Design rule: pill shape (9999px), no hard border in neutral state.",
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Search…", type: "text" },
};

export const WithValue: Story = {
  args: { value: "Marcus Davies", readOnly: true },
};

export const ErrorState: Story = {
  args: { placeholder: "Email address", error: true, type: "email" },
};

export const Disabled: Story = {
  args: { placeholder: "Not available", disabled: true },
};

export const Password: Story = {
  args: { placeholder: "Password", type: "password" },
};

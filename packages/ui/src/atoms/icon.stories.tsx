import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./icon";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    name: {
      control: "text",
      description: "Material Symbols name — e.g. home, favorite, auto_awesome.",
    },
    size: { control: { type: "number", min: 16, max: 48, step: 4 } },
    fill: { control: "boolean", description: "FILL=1 gives the solid variant." },
    weight: {
      control: "select",
      options: [100, 200, 300, 400, 500, 600, 700],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "home", size: 24 },
};

export const Filled: Story = {
  args: { name: "favorite", size: 24, fill: true },
};

export const Large: Story = {
  args: { name: "auto_awesome", size: 40, fill: true },
};

export const AppIcons: Story = {
  name: "App icon set",
  args: { name: "home" },
  render: () => {
    const icons = [
      "dashboard",
      "book",
      "people",
      "calendar_today",
      "library_books",
      "support_agent",
      "auto_awesome",
      "notifications",
      "settings",
      "logout",
    ];
    return (
      <div className="flex flex-wrap gap-4 items-center">
        {icons.map((name) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <Icon name={name} size={24} className="text-on-surface-variant" />
            <span className="font-body text-[10px] text-on-surface-variant">{name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const FilledVsOutlined: Story = {
  name: "Filled vs outlined",
  args: { name: "home" },
  render: () => {
    const icons = ["home", "favorite", "star", "check_circle", "push_pin"];
    return (
      <div className="flex gap-6">
        <div className="flex flex-col gap-3 items-center">
          <span className="font-body text-xs text-on-surface-variant">Outlined</span>
          {icons.map((name) => (
            <Icon key={name} name={name} size={24} className="text-primary" />
          ))}
        </div>
        <div className="flex flex-col gap-3 items-center">
          <span className="font-body text-xs text-on-surface-variant">Filled</span>
          {icons.map((name) => (
            <Icon key={name} name={name} size={24} fill className="text-primary" />
          ))}
        </div>
      </div>
    );
  },
};

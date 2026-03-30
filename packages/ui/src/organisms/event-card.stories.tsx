import type { Meta, StoryObj } from "@storybook/react";
import { EventCard } from "./event-card";

const meta = {
  title: "Organisms/EventCard",
  component: EventCard,
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
    kind: {
      control: "select",
      options: ["IN_PERSON", "VIRTUAL"],
      description: "VIRTUAL → tertiary-fixed badge. IN_PERSON → primary-fixed badge.",
    },
    rsvpStatus: {
      control: "select",
      options: [undefined, "GOING", "MAYBE", "NOT_GOING"],
    },
  },
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InPerson: Story = {
  name: "In person event",
  args: {
    title: "Dads Together — Manchester Meetup",
    description:
      "Monthly gathering for single dads in Manchester. Informal coffee chat, bring the kids.",
    startAt: "Sat 5 Apr · 10:00 AM",
    location: "Manchester Community Centre, M1 2WD",
    kind: "IN_PERSON",
    attendeeCount: 14,
  },
};

export const Virtual: Story = {
  name: "Virtual event",
  args: {
    title: "Online Co-parenting Workshop",
    description:
      "A guided session on conflict resolution and communication strategies with your co-parent.",
    startAt: "Thu 3 Apr · 7:30 PM",
    kind: "VIRTUAL",
    attendeeCount: 28,
  },
};

export const WithRsvp: Story = {
  name: "RSVP'd going",
  args: {
    title: "Legal Q&A Evening",
    startAt: "Wed 9 Apr · 6:00 PM",
    kind: "VIRTUAL",
    rsvpStatus: "GOING",
    attendeeCount: 9,
  },
};

export const MaybeRsvp: Story = {
  name: "RSVP'd maybe",
  args: {
    title: "Mindfulness for Dads",
    startAt: "Tue 1 Apr · 8:00 PM",
    kind: "VIRTUAL",
    rsvpStatus: "MAYBE",
  },
};

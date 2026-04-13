import type { Meta, StoryObj } from "@storybook/react";

import { EventCard } from "../organisms/event-card";
import { PostCard } from "../organisms/post-card";

import { CommunityTemplate } from "./community-template";

const Feed = (
  <div className="flex flex-col gap-6 max-w-2xl">
    <h1 className="font-display text-3xl font-semibold text-on-surface">Community</h1>
    <PostCard
      title="Morning routines changed everything"
      authorName="James R."
      authorAvatarSrc={null}
      createdAt="2h ago"
      content="Anyone else find that having a strict morning routine completely changed how the day goes with the kids? Game changer for me."
      reactions={[
        { type: "HEART", count: 14 },
        { type: "HELPFUL", count: 5 },
      ]}
      replyCount={5}
    />
    <PostCard
      title="First solo holiday booked!"
      authorName="David K."
      authorAvatarSrc={null}
      createdAt="5h ago"
      content="First solo holiday with my daughter booked. Terrified but excited. Any tips welcome!"
      reactions={[{ type: "SUPPORT", count: 31 }]}
      replyCount={12}
    />
    <PostCard
      title="It's okay not to have it figured out"
      authorName="Tom W."
      authorAvatarSrc={null}
      createdAt="1d ago"
      content="Reminder that it's okay to not have it all figured out. We're all making it up as we go."
      reactions={[{ type: "HEART", count: 62 }]}
      replyCount={8}
    />
  </div>
);

const RightPanel = (
  <div className="flex flex-col gap-4">
    <p className="font-display text-sm font-semibold text-on-surface">Upcoming events</p>
    <EventCard
      title="Co-Parents Together — April Meetup"
      startAt="Sat 12 Apr · 10:00 AM"
      location="Manchester Community Centre"
      kind="IN_PERSON"
      attendeeCount={18}
    />
    <EventCard
      title="Online Co-parenting Workshop"
      startAt="Thu 17 Apr · 7:30 PM"
      kind="VIRTUAL"
      attendeeCount={34}
    />
  </div>
);

const meta = {
  title: "Templates/CommunityTemplate",
  component: CommunityTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "surface" },
  },
} satisfies Meta<typeof CommunityTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Feed only",
  args: { feed: Feed },
};

export const WithRightPanel: Story = {
  name: "With events panel",
  args: { feed: Feed, rightPanel: RightPanel },
};

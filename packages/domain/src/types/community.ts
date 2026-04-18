import type { EventKind, ReactionType, RsvpStatus } from "../enums/index";

export type CommunityPost = {
  id: string;
  userId: string;
  title: string;
  content: string;
  isPinned: boolean;
  isLocked: boolean;
  replyCount: number;
  reactionCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PostReply = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostReaction = {
  id: string;
  postId: string;
  userId: string;
  type: ReactionType;
  createdAt: Date;
};

export type CommunityEvent = {
  id: string;
  userId: string;
  title: string;
  description: string;
  kind: EventKind;
  location: string | null;
  onlineUrl: string | null;
  capacity: number | null;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type EventRsvp = {
  id: string;
  eventId: string;
  userId: string;
  status: RsvpStatus;
  createdAt: Date;
  updatedAt: Date;
};

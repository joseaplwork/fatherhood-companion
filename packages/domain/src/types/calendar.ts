import type { CalendarEntryType } from "../enums/index";

export type CalendarEntry = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  type: CalendarEntryType;
  startAt: Date;
  endAt: Date | null;
  allDay: boolean;
  color: string | null;
  childRef: string | null;
  communityEventId: string | null;
  recurrenceRule: string | null;
  createdAt: Date;
  updatedAt: Date;
};

import { db } from "@db";

import { getAuthUserId } from "../auth";

export type UpcomingEventRow = {
  id: string;
  title: string;
  startAt: Date;
  endAt: Date | null;
  allDay: boolean;
  type: string;
  color: string | null;
};

export async function getUpcomingWeekEvents(): Promise<UpcomingEventRow[]> {
  const userId = await getAuthUserId();
  if (!userId) return [];

  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  return db.calendarEntry.findMany({
    where: {
      clerkUserId: userId,
      startAt: { gte: start, lt: end },
    },
    orderBy: { startAt: "asc" },
    select: {
      id: true,
      title: true,
      startAt: true,
      endAt: true,
      allDay: true,
      type: true,
      color: true,
    },
  });
}

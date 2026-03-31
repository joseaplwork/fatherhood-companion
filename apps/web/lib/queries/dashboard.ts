import { auth } from "@clerk/nextjs/server";
import { db } from "@fatherhood-companion/db";
import type { MoodEntryRow } from "./mood";

export type DashboardSummary = {
  recentMoods: MoodEntryRow[];
  weeklyAverage: number | null;
  unreadNotificationCount: number;
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const { userId } = await auth();
  if (!userId) {
    return { recentMoods: [], weeklyAverage: null, unreadNotificationCount: 0 };
  }

  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setUTCHours(0, 0, 0, 0);

  const [recentMoods, unreadCount] = await Promise.all([
    db.moodEntry.findMany({
      where: { clerkUserId: userId },
      orderBy: { date: "desc" },
      take: 5,
      select: { id: true, mood: true, note: true, emotions: true, imageUrl: true, date: true },
    }),
    db.notification.count({
      where: { clerkUserId: userId, readAt: null },
    }),
  ]);

  const weeklyMoods = await db.moodEntry.findMany({
    where: { clerkUserId: userId, date: { gte: since } },
    select: { mood: true },
  });

  const weeklyAverage =
    weeklyMoods.length > 0
      ? Math.round(
          (weeklyMoods.reduce((sum: number, m) => sum + m.mood, 0) / weeklyMoods.length) * 10,
        ) / 10
      : null;

  return { recentMoods, weeklyAverage, unreadNotificationCount: unreadCount };
}

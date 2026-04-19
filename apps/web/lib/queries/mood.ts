import { db } from "@/grove-companion/db";

import { getSession } from "../session";

export type MoodEntryRow = {
  id: string;
  mood: number;
  note: string | null;
  emotions: string[];
  imageUrl: string | null;
  date: Date;
};

export async function getMoodHistory(limit = 30): Promise<MoodEntryRow[]> {
  const session = await getSession();

  return db.moodEntry.findMany({
    where: { userId: session.userId },
    orderBy: { date: "desc" },
    take: limit,
    select: { id: true, mood: true, note: true, emotions: true, imageUrl: true, date: true },
  });
}

export async function getMoodByDate(date: string): Promise<MoodEntryRow | null> {
  const session = await getSession();

  const dateObj = new Date(`${date}T00:00:00.000Z`);
  return db.moodEntry.findUnique({
    where: { userId_date: { userId: session.userId, date: dateObj } },
    select: { id: true, mood: true, note: true, emotions: true, imageUrl: true, date: true },
  });
}

/** Returns mood scores for the last 7 days (Mon=0 … Sun=6), 0 if no entry. */
export async function getMoodTrends(): Promise<number[]> {
  const session = await getSession();

  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setUTCHours(0, 0, 0, 0);

  const entries = await db.moodEntry.findMany({
    where: { userId: session.userId, date: { gte: since } },
    select: { mood: true, date: true },
    orderBy: { date: "asc" },
  });

  const result: number[] = Array.from({ length: 7 }, () => 0);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  for (const entry of entries) {
    const dayIndex = Math.round((entry.date.getTime() - since.getTime()) / (1000 * 60 * 60 * 24));
    if (dayIndex >= 0 && dayIndex < 7) {
      result[dayIndex] = entry.mood;
    }
  }

  return result;
}

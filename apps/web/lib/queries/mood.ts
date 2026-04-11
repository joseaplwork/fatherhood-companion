import { db } from "@db";

import { getAuthUserId } from "../auth";

export type MoodEntryRow = {
  id: string;
  mood: number;
  note: string | null;
  emotions: string[];
  imageUrl: string | null;
  date: Date;
};

export async function getMoodHistory(limit = 30): Promise<MoodEntryRow[]> {
  const userId = await getAuthUserId();
  if (!userId) return [];

  return db.moodEntry.findMany({
    where: { providerUserId: userId },
    orderBy: { date: "desc" },
    take: limit,
    select: { id: true, mood: true, note: true, emotions: true, imageUrl: true, date: true },
  });
}

export async function getMoodByDate(date: string): Promise<MoodEntryRow | null> {
  const userId = await getAuthUserId();
  if (!userId) return null;

  const dateObj = new Date(`${date}T00:00:00.000Z`);
  return db.moodEntry.findUnique({
    where: { providerUserId_date: { providerUserId: userId, date: dateObj } },
    select: { id: true, mood: true, note: true, emotions: true, imageUrl: true, date: true },
  });
}

/** Returns mood scores for the last 7 days (Mon=0 … Sun=6), 0 if no entry. */
export async function getMoodTrends(): Promise<number[]> {
  const userId = await getAuthUserId();
  if (!userId) return Array.from({ length: 7 }, () => 0);

  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setUTCHours(0, 0, 0, 0);

  const entries = await db.moodEntry.findMany({
    where: { providerUserId: userId, date: { gte: since } },
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

"use server";

import { revalidatePath } from "next/cache";

import { db } from "@db";

import { getAuthUserId } from "../auth";
import type { MoodEntryInput, UpdateMoodEntryInput } from "../schemas/mood";
import { MoodEntrySchema, UpdateMoodEntrySchema } from "../schemas/mood";

type Result<T> = { data: T } | { error: string };

type MoodEntryData = {
  id: string;
  mood: number;
  note: string | null;
  emotions: string[];
  imageUrl: string | null;
  date: Date;
};

export async function createMoodEntry(input: MoodEntryInput): Promise<Result<MoodEntryData>> {
  const userId = await getAuthUserId();
  if (!userId) return { error: "Unauthorized" };

  const parsed = MoodEntrySchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { mood, note, emotions, date } = parsed.data;
  const dateObj = new Date(`${date}T00:00:00.000Z`);

  try {
    const entry = await db.moodEntry.upsert({
      where: { clerkUserId_date: { clerkUserId: userId, date: dateObj } },
      create: { clerkUserId: userId, mood, note, emotions: emotions ?? [], date: dateObj },
      update: { mood, note, emotions: emotions ?? [] },
    });

    revalidatePath("/diary");
    revalidatePath("/dashboard");
    return {
      data: {
        id: entry.id,
        mood: entry.mood,
        note: entry.note,
        emotions: entry.emotions,
        imageUrl: entry.imageUrl,
        date: entry.date,
      },
    };
  } catch (err) {
    console.error("[createMoodEntry]", err);
    return { error: "Failed to save mood entry" };
  }
}

export async function updateMoodEntry(
  id: string,
  input: UpdateMoodEntryInput,
): Promise<Result<MoodEntryData>> {
  const userId = await getAuthUserId();
  if (!userId) return { error: "Unauthorized" };

  const parsed = UpdateMoodEntrySchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  try {
    // Verify ownership
    const existing = await db.moodEntry.findFirst({
      where: { id, clerkUserId: userId },
    });
    if (!existing) return { error: "Entry not found" };

    const entry = await db.moodEntry.update({
      where: { id },
      data: {
        ...(parsed.data.mood !== undefined && { mood: parsed.data.mood }),
        ...(parsed.data.note !== undefined && { note: parsed.data.note }),
        ...(parsed.data.emotions !== undefined && { emotions: parsed.data.emotions }),
        ...(parsed.data.imageUrl !== undefined && { imageUrl: parsed.data.imageUrl }),
      },
    });

    const dateStr = entry.date.toISOString().split("T")[0] ?? "";
    revalidatePath(`/diary/${dateStr}`);
    revalidatePath("/dashboard");
    return {
      data: {
        id: entry.id,
        mood: entry.mood,
        note: entry.note,
        emotions: entry.emotions,
        imageUrl: entry.imageUrl,
        date: entry.date,
      },
    };
  } catch (err) {
    console.error("[updateMoodEntry]", err);
    return { error: "Failed to update mood entry" };
  }
}

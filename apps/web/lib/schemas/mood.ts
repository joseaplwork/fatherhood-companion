import { z } from "zod";

export const MoodEntrySchema = z.object({
  mood: z.number().int().min(1).max(5),
  note: z.string().max(2000).optional(),
  emotions: z.array(z.string().max(50)).max(10).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
});

export const UpdateMoodEntrySchema = MoodEntrySchema.partial().extend({
  imageUrl: z.string().url().optional().nullable(),
});

export type MoodEntryInput = z.infer<typeof MoodEntrySchema>;
export type UpdateMoodEntryInput = z.infer<typeof UpdateMoodEntrySchema>;

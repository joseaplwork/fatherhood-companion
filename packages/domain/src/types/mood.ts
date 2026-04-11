import type { MoodScale } from "../enums/index";

export type MoodEntry = {
  id: string;
  providerUserId: string;
  mood: MoodScale;
  note: string | null;
  imageUrl: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type MoodTrend = {
  date: string; // ISO date string
  mood: MoodScale | null;
};

export type MoodStats = {
  average: number;
  trend: "improving" | "declining" | "stable";
  weeklyData: MoodTrend[];
};

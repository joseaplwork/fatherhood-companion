export type InsightsContext = {
  weeklyMoods: Array<{ date: string; mood: number | null }>;
  recentNote: string | null;
};

export function buildInsightsPrompt(ctx: InsightsContext): string {
  const moodData = ctx.weeklyMoods.map((m) => `${m.date}: ${m.mood ?? "no entry"}`).join(", ");

  return `Based on the following mood data for a co-parent over the past week, generate a single brief (1-2 sentence), warm, and encouraging insight or observation. Focus on patterns, progress, or gentle acknowledgment. Do not be clinical or list-like — speak directly to them.

Mood data (1=struggling, 5=great): ${moodData}
${ctx.recentNote ? `Recent diary note: "${ctx.recentNote}"` : ""}

Insight:`.trim();
}

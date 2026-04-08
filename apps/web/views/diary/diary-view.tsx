import Link from "next/link";

import { DiaryEntryCard, DiaryTemplate, MoodBarChart } from "@ui";

import { formatDateShort } from "../../lib/format-date";
import type { MoodEntryRow } from "../../lib/queries/mood";

import { LogMoodDialog } from "./log-mood-dialog";

type DiaryViewProps = {
  entries: MoodEntryRow[];
  weeklyTrends: number[];
};

export function DiaryView({ entries, weeklyTrends }: DiaryViewProps) {
  return (
    <DiaryTemplate
      entryList={
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-2xl font-semibold text-on-surface">My Diary</h1>
            <LogMoodDialog />
          </div>

          {/* Weekly chart */}
          <div className="rounded-2xl bg-surface-container-low px-5 py-4 mb-6">
            <h2 className="font-display text-sm font-semibold text-on-surface mb-3">This week</h2>
            <MoodBarChart data={weeklyTrends} />
          </div>

          {/* Entry list */}
          {entries.length === 0 ? (
            <div className="rounded-2xl bg-surface-container-low px-5 py-10 text-center">
              <p className="font-body text-sm text-on-surface-variant mb-4">
                No entries yet. Start by logging today&apos;s mood.
              </p>
              <LogMoodDialog label="Log first mood" variant="secondary" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {entries.map((entry) => {
                const dateStr = entry.date.toISOString().split("T")[0] ?? "";
                return (
                  <Link key={entry.id} href={`/diary/${dateStr}`}>
                    <DiaryEntryCard
                      date={formatDateShort(entry.date)}
                      mood={entry.mood as 1 | 2 | 3 | 4 | 5}
                      note={entry.note ?? undefined}
                      emotions={entry.emotions}
                      imageUrls={entry.imageUrl ? [entry.imageUrl] : []}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      }
    />
  );
}

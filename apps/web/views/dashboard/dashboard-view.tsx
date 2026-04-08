import Link from "next/link";

import type { CalendarEntryType } from "@domain";
import { CALENDAR_ENTRY_TYPE_LABELS } from "@domain";
import {
  AIInsightsPanel,
  Button,
  DashboardTemplate,
  DiaryEntryCard,
  MetricChip,
  MoodBarChart,
} from "@ui";

import { formatDateLong, formatDateShort } from "../../lib/format-date";
import type { UpcomingEventRow } from "../../lib/queries/calendar";
import type { DashboardSummary } from "../../lib/queries/dashboard";

type DashboardViewProps = {
  summary: DashboardSummary;
  weeklyTrends: number[];
  userName?: string;
  upcomingEvents: UpcomingEventRow[];
};

export function DashboardView({
  summary,
  weeklyTrends,
  userName = "",
  upcomingEvents,
}: DashboardViewProps) {
  const { recentMoods, weeklyAverage, unreadNotificationCount } = summary;

  return (
    <DashboardTemplate
      main={
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Greeting */}
          <div>
            <h1 className="font-display text-2xl font-semibold text-on-surface">
              {userName ? `Hey, ${userName.split(" ")[0]}` : "Welcome back"}
            </h1>
            <p className="font-body text-sm text-on-surface-variant mt-1">
              {formatDateLong(new Date())}
            </p>
          </div>

          {/* Quick metrics */}
          <div className="flex gap-3 flex-wrap">
            <MetricChip
              label="Weekly avg mood"
              value={weeklyAverage !== null ? `${weeklyAverage}/5` : "—"}
            />
            {unreadNotificationCount > 0 && (
              <MetricChip label="Notifications" value={String(unreadNotificationCount)} />
            )}
          </div>

          {/* Mood chart */}
          <div className="rounded-2xl bg-surface-container-low px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-sm font-semibold text-on-surface">This week</h2>
              <Link href="/diary">
                <span className="font-body text-xs text-primary hover:opacity-70">See all</span>
              </Link>
            </div>
            <MoodBarChart data={weeklyTrends} />
          </div>

          {/* Upcoming week events */}
          <div className="rounded-2xl bg-surface-container-low px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-sm font-semibold text-on-surface">
                Upcoming this week
              </h2>
              <Link href="/calendar">
                <span className="font-body text-xs text-primary hover:opacity-70">See all</span>
              </Link>
            </div>
            {upcomingEvents.length === 0 ? (
              <p className="font-body text-sm text-on-surface-variant">No events this week.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {upcomingEvents.map((event) => {
                  const dot = event.color ?? "#67794a";
                  const typeLabel =
                    CALENDAR_ENTRY_TYPE_LABELS[event.type as CalendarEntryType] ?? event.type;
                  const timeLabel = event.allDay
                    ? formatDateShort(event.startAt)
                    : `${formatDateShort(event.startAt)} · ${event.startAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
                  return (
                    <div key={event.id} className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: dot }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-on-surface truncate">{event.title}</p>
                        <p className="font-body text-xs text-on-surface-variant">{typeLabel}</p>
                      </div>
                      <p className="font-body text-xs text-on-surface-variant shrink-0">
                        {timeLabel}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Log mood CTA if nothing today */}
          {!recentMoods.some(
            (m) => m.date.toISOString().split("T")[0] === new Date().toISOString().split("T")[0],
          ) && (
            <div className="rounded-2xl bg-primary-fixed px-5 py-4 flex items-center justify-between">
              <p className="font-body text-sm text-on-primary-fixed">
                You haven&apos;t logged today yet.
              </p>
              <Link href="/diary">
                <Button variant="primary">Log mood</Button>
              </Link>
            </div>
          )}

          {/* Recent diary entries */}
          {recentMoods.length > 0 && (
            <div>
              <h2 className="font-display text-sm font-semibold text-on-surface mb-3">
                Recent entries
              </h2>
              <div className="flex flex-col gap-3">
                {recentMoods.map((entry) => {
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
            </div>
          )}
        </div>
      }
      aiPanel={
        <AIInsightsPanel
          title="AI Insights"
          insight={
            weeklyAverage !== null
              ? `Your average mood this week is ${weeklyAverage}/5. Keep logging to unlock deeper patterns.`
              : "Log a few mood entries to see your first AI insight here."
          }
        />
      }
    />
  );
}

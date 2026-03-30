import {
  AIInsightsPanel,
  Button,
  DashboardTemplate,
  DiaryEntryCard,
  MetricChip,
  MoodBarChart,
  NavSidebar,
} from "@fatherhood-companion/ui";
import Link from "next/link";
import type { DashboardSummary } from "../../lib/queries/dashboard";
import { NAV_LINKS } from "../_shared/nav-links";

type DashboardViewProps = {
  summary: DashboardSummary;
  weeklyTrends: number[];
  userName?: string;
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function DashboardView({ summary, weeklyTrends, userName = "" }: DashboardViewProps) {
  const { recentMoods, weeklyAverage, unreadNotificationCount } = summary;

  return (
    <DashboardTemplate
      sidebar={<NavSidebar links={NAV_LINKS} userName={userName} />}
      main={
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Greeting */}
          <div>
            <h1 className="font-display text-2xl font-semibold text-on-surface">
              {userName ? `Hey, ${userName.split(" ")[0]}` : "Welcome back"}
            </h1>
            <p className="font-body text-sm text-on-surface-variant mt-1">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
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

          {/* Log mood CTA if nothing today */}
          {!recentMoods.some(
            (m) => m.date.toISOString().split("T")[0] === new Date().toISOString().split("T")[0],
          ) && (
            <div className="rounded-2xl bg-primary-fixed px-5 py-4 flex items-center justify-between">
              <p className="font-body text-sm text-on-primary-fixed">
                You haven&apos;t logged today yet.
              </p>
              <Link href="/diary/new">
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
                        date={formatDate(entry.date)}
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

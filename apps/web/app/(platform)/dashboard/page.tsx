import { getUpcomingWeekEvents } from "../../../lib/queries/calendar";
import { getDashboardSummary } from "../../../lib/queries/dashboard";
import { getMoodTrends } from "../../../lib/queries/mood";
import { getSession } from "../../../lib/session";
import { DashboardView } from "../../../views/dashboard/dashboard-view";

export const metadata = { title: "Dashboard — Grove Companion" };

export default async function DashboardPage() {
  const [session, summary, weeklyTrends, upcomingEvents] = await Promise.all([
    getSession(),
    getDashboardSummary(),
    getMoodTrends(),
    getUpcomingWeekEvents(),
  ]);

  return (
    <DashboardView
      summary={summary}
      weeklyTrends={weeklyTrends}
      userName={session.userName}
      upcomingEvents={upcomingEvents}
    />
  );
}

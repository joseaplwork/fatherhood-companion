import { getUpcomingWeekEvents } from "../../../lib/queries/calendar";
import { getDashboardSummary } from "../../../lib/queries/dashboard";
import { getMoodTrends } from "../../../lib/queries/mood";
import { getUserContext } from "../../../lib/queries/user";
import { DashboardView } from "../../../views/dashboard/dashboard-view";

export const metadata = { title: "Dashboard — Dad Companion" };

export default async function DashboardPage() {
  const [{ userName }, summary, weeklyTrends, upcomingEvents] = await Promise.all([
    getUserContext(),
    getDashboardSummary(),
    getMoodTrends(),
    getUpcomingWeekEvents(),
  ]);

  return (
    <DashboardView
      summary={summary}
      weeklyTrends={weeklyTrends}
      userName={userName}
      upcomingEvents={upcomingEvents}
    />
  );
}

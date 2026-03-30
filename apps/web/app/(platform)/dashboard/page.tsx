import { currentUser } from "@clerk/nextjs/server";
import { getDashboardSummary } from "../../../lib/queries/dashboard";
import { getMoodTrends } from "../../../lib/queries/mood";
import { DashboardView } from "../../../views/dashboard/dashboard-view";

export const metadata = { title: "Dashboard — Dad Companion" };

export default async function DashboardPage() {
  const [user, summary, weeklyTrends] = await Promise.all([
    currentUser(),
    getDashboardSummary(),
    getMoodTrends(),
  ]);

  const userName = user?.fullName ?? user?.firstName ?? "";

  return <DashboardView summary={summary} weeklyTrends={weeklyTrends} userName={userName} />;
}

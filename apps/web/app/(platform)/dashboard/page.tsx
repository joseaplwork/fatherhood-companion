import { getDashboardSummary } from "../../../lib/queries/dashboard";
import { getMoodTrends } from "../../../lib/queries/mood";
import { getUserContext } from "../../../lib/queries/user";
import { DashboardView } from "../../../views/dashboard/dashboard-view";

export const metadata = { title: "Dashboard — Dad Companion" };

export default async function DashboardPage() {
  const [{ userName }, summary, weeklyTrends] = await Promise.all([
    getUserContext(),
    getDashboardSummary(),
    getMoodTrends(),
  ]);

  return <DashboardView summary={summary} weeklyTrends={weeklyTrends} userName={userName} />;
}

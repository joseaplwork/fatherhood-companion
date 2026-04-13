import { getMoodHistory, getMoodTrends } from "../../../lib/queries/mood";
import { DiaryView } from "../../../views/diary/diary-view";

export const metadata = { title: "Diary — Grove Companion" };

export default async function DiaryPage() {
  const [entries, weeklyTrends] = await Promise.all([getMoodHistory(), getMoodTrends()]);
  return <DiaryView entries={entries} weeklyTrends={weeklyTrends} />;
}

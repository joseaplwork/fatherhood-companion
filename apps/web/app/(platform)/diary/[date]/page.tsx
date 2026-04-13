import { notFound } from "next/navigation";

import { getMoodByDate } from "../../../../lib/queries/mood";
import { EntryView } from "../../../../views/diary/entry-view";

type Props = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Props) {
  const { date } = await params;
  return { title: `${date} — Grove Companion` };
}

export default async function EntryPage({ params }: Props) {
  const { date } = await params;
  const entry = await getMoodByDate(date);
  if (!entry) notFound();
  return <EntryView entry={entry} />;
}

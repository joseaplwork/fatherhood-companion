import Image from "next/image";
import Link from "next/link";
import { MOOD_EMOJIS, MOOD_LABELS, type MoodScale } from "@/grove-companion/domain";
import { Button } from "@/grove-companion/ui";

import { formatDateFull } from "../../lib/format-date";
import type { MoodEntryRow } from "../../lib/queries/mood";

type EntryViewProps = {
  entry: MoodEntryRow;
};

export function EntryView({ entry }: EntryViewProps) {
  const dateLabel = formatDateFull(entry.date);

  return (
    <main className="min-h-screen bg-surface px-6 py-8">
      <div className="max-w-lg mx-auto">
        {/* Back */}
        <Link
          href="/diary"
          className="font-body text-sm text-on-surface-variant hover:text-on-surface mb-6 flex items-center gap-1"
        >
          ← Diary
        </Link>

        {/* Date & mood */}
        <div className="rounded-2xl bg-surface-container-low px-5 py-5 mb-4">
          <p className="font-body text-xs text-on-surface-variant mb-2">{dateLabel}</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl leading-none">{MOOD_EMOJIS[entry.mood as MoodScale]}</span>
            <div>
              <p className="font-display text-lg font-semibold text-on-surface">
                {MOOD_LABELS[entry.mood as MoodScale]}
              </p>
              <p className="font-body text-xs text-on-surface-variant">Mood · {entry.mood}/5</p>
            </div>
          </div>
        </div>

        {/* Emotions */}
        {entry.emotions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {entry.emotions.map((e) => (
              <span
                key={e}
                className="rounded-full bg-secondary-fixed px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-on-secondary-container"
              >
                {e}
              </span>
            ))}
          </div>
        )}

        {/* Note */}
        {entry.note && (
          <div className="rounded-2xl bg-surface-container-low px-5 py-4 mb-4">
            <p className="font-body text-sm text-on-surface whitespace-pre-wrap">{entry.note}</p>
          </div>
        )}

        {/* Image */}
        {entry.imageUrl && (
          <Image
            src={entry.imageUrl}
            alt=""
            width={800}
            height={256}
            className="w-full rounded-2xl object-cover max-h-64 mb-4"
          />
        )}

        <Link href="/diary">
          <Button variant="secondary" className="w-full">
            Back to diary
          </Button>
        </Link>
      </div>
    </main>
  );
}

import type { MoodScale } from "@fatherhood-companion/domain";
import { EmotionTag } from "../molecules/emotion-tag";

const MOOD_EMOJIS: Record<MoodScale, string> = {
  1: "😔",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😄",
};

const MOOD_LABELS: Record<MoodScale, string> = {
  1: "Struggling",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

type DiaryEntryCardProps = {
  date: string;
  mood: MoodScale;
  note?: string;
  emotions?: string[];
  imageUrls?: string[];
  onClick?: () => void;
  className?: string;
};

export function DiaryEntryCard({
  date,
  mood,
  note,
  emotions = [],
  imageUrls = [],
  onClick,
  className = "",
}: DiaryEntryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-2xl bg-surface-container-low px-4 py-4 text-left",
        "transition-colors duration-150 hover:bg-surface-container",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-body text-xs text-on-surface-variant">{date}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-base leading-none">{MOOD_EMOJIS[mood]}</span>
          <span className="font-body text-xs font-medium text-on-surface-variant">
            {MOOD_LABELS[mood]}
          </span>
        </div>
      </div>

      {/* Emotions */}
      {emotions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {emotions.map((emotion) => (
            <EmotionTag key={emotion} emotion={emotion} />
          ))}
        </div>
      )}

      {/* Note preview */}
      {note && <p className="font-body text-sm text-on-surface line-clamp-3 mb-2">{note}</p>}

      {/* Images */}
      {imageUrls.length > 0 && (
        <div className="flex gap-2 mt-2">
          {imageUrls.slice(0, 2).map((url) => (
            <img key={url} src={url} alt="" className="h-16 w-16 rounded-xl object-cover" />
          ))}
          {imageUrls.length > 2 && (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface-container-high">
              <span className="font-body text-xs font-medium text-on-surface-variant">
                +{imageUrls.length - 2}
              </span>
            </div>
          )}
        </div>
      )}
    </button>
  );
}

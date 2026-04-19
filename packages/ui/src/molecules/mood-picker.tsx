"use client";

import { useState } from "react";
import type { MoodScale } from "@/grove-companion/domain";
import { MOOD_EMOJIS, MOOD_LABELS } from "@/grove-companion/domain";

import { Slider } from "../atoms/slider";

type MoodPickerProps = {
  value?: MoodScale;
  onChange?: (value: MoodScale) => void;
};

export function MoodPicker({ value = 3, onChange }: MoodPickerProps) {
  const [current, setCurrent] = useState<MoodScale>(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = Number(e.target.value) as MoodScale;
    setCurrent(next);
    onChange?.(next);
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-col items-center gap-1">
        <span className="text-5xl">{MOOD_EMOJIS[current]}</span>
        <span className="font-body text-sm text-on-surface-variant">{MOOD_LABELS[current]}</span>
      </div>
      <div className="w-full px-2">
        <Slider min={1} max={5} step={1} value={current} onChange={handleChange} />
        <div className="flex justify-between mt-1 px-1">
          {([1, 2, 3, 4, 5] as MoodScale[]).map((n) => (
            <span key={n} className="font-body text-xs text-on-surface-variant">
              {MOOD_EMOJIS[n]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

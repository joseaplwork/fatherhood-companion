"use client";

import type { MoodScale } from "@fatherhood-companion/domain";
import { Button, FormField, MoodPicker } from "@fatherhood-companion/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createMoodEntry } from "../../lib/actions/mood";

const TODAY = new Date().toISOString().split("T")[0] ?? "";

export function NewEntryView() {
  const router = useRouter();
  const [mood, setMood] = useState<MoodScale>(3);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await createMoodEntry({ mood, note: note || undefined, date: TODAY });
    if ("error" in result) {
      setError(result.error);
      setSubmitting(false);
      return;
    }
    router.push("/diary");
  }

  return (
    <main className="min-h-screen bg-surface px-6 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-2xl font-semibold text-on-surface mb-6">
          How are you feeling today?
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <MoodPicker value={mood} onChange={setMood} />

          <FormField
            label="What's on your mind? (optional)"
            htmlFor="note"
            multiline
            inputProps={{
              placeholder: "Write freely — this is just for you…",
              value: note,
              onChange: (e) => setNote(e.target.value),
              rows: 6,
            }}
          />

          {error && <p className="font-body text-sm text-error">{error}</p>}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting} className="flex-1">
              {submitting ? "Saving…" : "Save entry"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

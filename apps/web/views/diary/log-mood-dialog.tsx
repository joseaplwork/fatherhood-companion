"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { MoodScale } from "@domain";
import { Button, FormField, MoodPicker } from "@ui";

import { createMoodEntry } from "../../lib/actions/mood";

type LogMoodDialogProps = {
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function LogMoodDialog({ label = "Log mood", variant = "primary" }: LogMoodDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState<MoodScale>(3);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleClose() {
    setOpen(false);
    setMood(3);
    setNote("");
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const today = new Date().toISOString().split("T")[0] ?? "";
    const result = await createMoodEntry({ mood, note: note || undefined, date: today });

    if ("error" in result) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    handleClose();
    router.refresh();
  }

  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>
        {label}
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            aria-label="Close mood dialog"
            className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="log-mood-title"
            className="relative mx-4 w-full max-w-lg rounded-2xl bg-surface p-6 shadow-lg"
          >
            <h2
              id="log-mood-title"
              className="font-display text-xl font-semibold text-on-surface mb-6"
            >
              How are you feeling today?
            </h2>

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
                  rows: 5,
                }}
              />

              {error && <p className="font-body text-sm text-error">{error}</p>}

              <div className="flex gap-3">
                <Button type="button" variant="ghost" onClick={handleClose} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={submitting} className="flex-1">
                  {submitting ? "Saving…" : "Save entry"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

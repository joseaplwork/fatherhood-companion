"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { MoodScale } from "@/grove-companion/domain";
import { Button, Dialog, FormField, MoodPicker } from "@/grove-companion/ui";

import { createMoodEntry } from "../../lib/actions/mood";
import { getLocalDateString } from "../../lib/format-date";

type LogMoodDialogProps = {
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function LogMoodDialog({ label = "Log mood", variant = "primary" }: LogMoodDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mood, setMood] = useState<MoodScale>(3);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleOpen() {
    setIsClosing(false);
    setOpen(true);
  }

  function handleClose() {
    if (!open || isClosing) return;
    setIsClosing(true);
  }

  function handleAnimationEnd() {
    setOpen(false);
    setIsClosing(false);
    setMood(3);
    setNote("");
    setError(null);
    setSubmitting(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const today = getLocalDateString();
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
      <Button variant={variant} onClick={handleOpen}>
        {label}
      </Button>

      <Dialog
        open={open}
        isClosing={isClosing}
        onClose={() => {
          setOpen(false);
          setIsClosing(false);
        }}
        onRequestClose={handleClose}
        onAnimationEnd={handleAnimationEnd}
      >
        <div role="dialog" aria-modal="true" aria-labelledby="log-mood-title" className="contents">
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
      </Dialog>
    </>
  );
}

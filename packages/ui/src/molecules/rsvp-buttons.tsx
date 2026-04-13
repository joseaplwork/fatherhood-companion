"use client";

import type { RsvpStatus } from "@grove-companion/domain";

type RsvpButtonsProps = {
  value?: RsvpStatus | null;
  onChange?: (status: RsvpStatus) => void;
  disabled?: boolean;
  className?: string;
};

const OPTIONS: Array<{ value: RsvpStatus; label: string }> = [
  { value: "GOING", label: "Going" },
  { value: "MAYBE", label: "Maybe" },
  { value: "NOT_GOING", label: "Can't go" },
];

export function RsvpButtons({
  value,
  onChange,
  disabled = false,
  className = "",
}: RsvpButtonsProps) {
  return (
    <div className={["flex gap-2", className].filter(Boolean).join(" ")}>
      {OPTIONS.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(opt.value)}
            className={[
              "rounded-full px-4 py-2 font-body text-sm font-medium transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isSelected
                ? "bg-primary-container text-on-primary-container"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

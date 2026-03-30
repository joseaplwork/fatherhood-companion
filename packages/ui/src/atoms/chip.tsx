import type { ButtonHTMLAttributes } from "react";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  label: string;
};

export function Chip({ selected = false, label, className = "", ...props }: ChipProps) {
  return (
    <button
      {...props}
      aria-pressed={selected}
      className={[
        "inline-flex items-center rounded-full px-4 py-2",
        "font-body text-sm font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        selected
          ? "bg-primary-container text-on-primary-container"
          : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </button>
  );
}

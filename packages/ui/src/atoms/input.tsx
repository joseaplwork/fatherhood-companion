import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function Input({ error = false, className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-full px-5 py-3",
        "bg-surface-container-lowest text-on-surface font-body text-sm",
        "placeholder:text-on-surface-variant",
        "outline-none transition-all duration-150",
        "focus:ring-2 focus:ring-primary/40 focus:shadow-[0_0_0_8px_rgba(79,96,52,0.08)]",
        error ? "ring-2 ring-error" : "ring-1 ring-outline-variant/30",
        "disabled:pointer-events-none disabled:opacity-40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

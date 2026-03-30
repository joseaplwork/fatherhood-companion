import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export function Textarea({ error = false, className = "", ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-2xl px-5 py-3",
        "bg-surface-container-lowest text-on-surface font-body text-sm",
        "placeholder:text-on-surface-variant",
        "outline-none transition-all duration-150 resize-none",
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

import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className = "", children, ...props }: LabelProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is passed via ...props
    <label
      {...props}
      className={["font-body text-sm font-medium text-on-surface-variant", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </label>
  );
}

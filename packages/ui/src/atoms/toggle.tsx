import type { InputHTMLAttributes } from "react";

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export function Toggle({ label, className = "", ...props }: ToggleProps) {
  return (
    <label className={["inline-flex cursor-pointer items-center gap-3", className].join(" ")}>
      <input {...props} type="checkbox" className="sr-only peer" />
      <span
        className={[
          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full",
          "bg-surface-container-highest transition-colors duration-200",
          "peer-checked:bg-primary-container",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
          "after:absolute after:left-1 after:top-1 after:h-5 after:w-5",
          "after:rounded-full after:bg-on-surface after:transition-transform after:duration-200",
          "peer-checked:after:translate-x-5 peer-checked:after:bg-on-primary-container",
        ].join(" ")}
      />
      {label && <span className="font-body text-sm text-on-surface-variant">{label}</span>}
    </label>
  );
}

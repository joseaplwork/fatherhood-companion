"use client";

import { Chip } from "../atoms/chip";

type CategoryFilterProps<T extends string> = {
  options: Array<{ value: T; label: string }>;
  selected: T;
  onChange: (value: T) => void;
  className?: string;
};

export function CategoryFilter<T extends string>({
  options,
  selected,
  onChange,
  className = "",
}: CategoryFilterProps<T>) {
  return (
    <div className={["flex flex-wrap gap-2", className].filter(Boolean).join(" ")}>
      {options.map((opt) => (
        <Chip
          key={opt.value}
          label={opt.label}
          selected={selected === opt.value}
          onClick={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}

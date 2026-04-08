"use client";

import { type ChangeEvent, type KeyboardEvent, useState } from "react";

import { Icon } from "../atoms/icon";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
};

export function SearchBar({
  placeholder = "Search…",
  value: controlledValue,
  onChange,
  onSearch,
  className = "",
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue ?? internalValue;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setInternalValue(next);
    onChange?.(next);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSearch?.(value);
    }
  }

  return (
    <div
      className={[
        "flex items-center gap-2 rounded-full bg-surface-container-low px-4 py-2.5",
        "focus-within:outline focus-within:outline-1 focus-within:outline-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon name="search" size={20} className="shrink-0 text-on-surface-variant" />
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={[
          "flex-1 bg-transparent font-body text-sm text-on-surface placeholder:text-on-surface-variant",
          "outline-none",
        ].join(" ")}
      />
    </div>
  );
}

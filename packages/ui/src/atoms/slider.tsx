import type { InputHTMLAttributes } from "react";

type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  min?: number;
  max?: number;
  step?: number;
};

export function Slider({ min = 1, max = 5, step = 1, className = "", ...props }: SliderProps) {
  return (
    <input
      {...props}
      type="range"
      min={min}
      max={max}
      step={step}
      className={[
        "w-full h-2 rounded-full appearance-none cursor-pointer",
        "bg-surface-container-high",
        "[&::-webkit-slider-thumb]:appearance-none",
        "[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6",
        "[&::-webkit-slider-thumb]:rounded-full",
        "[&::-webkit-slider-thumb]:bg-primary-container",
        "[&::-webkit-slider-thumb]:shadow-ambient",
        "[&::-webkit-slider-thumb]:cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

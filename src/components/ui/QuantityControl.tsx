"use client";

import { cn } from "@/lib/cn";

interface QuantityControlProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export default function QuantityControl({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: QuantityControlProps) {
  const btnSize = size === "sm" ? "w-7 h-7 text-sm" : "w-9 h-9 text-base";
  const textSize = size === "sm" ? "text-sm w-8" : "text-base w-12";

  return (
    <div className="inline-flex items-center border-2 border-text-dark rounded-flat overflow-hidden">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={cn(
          "inline-flex items-center justify-center font-label font-bold transition-colors",
          btnSize,
          "disabled:opacity-30 disabled:cursor-not-allowed hover:bg-text-dark hover:text-text-light"
        )}
      >
        &minus;
      </button>
      <span
        className={cn(
          "inline-flex items-center justify-center font-label font-bold tabular-nums border-x-2 border-text-dark",
          textSize
        )}
      >
        {value}
      </span>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={cn(
          "inline-flex items-center justify-center font-label font-bold transition-colors",
          btnSize,
          "disabled:opacity-30 disabled:cursor-not-allowed hover:bg-text-dark hover:text-text-light"
        )}
      >
        +
      </button>
    </div>
  );
}

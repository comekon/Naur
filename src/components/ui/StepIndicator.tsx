import { cn } from "@/lib/cn";

interface StepIndicatorProps {
  current: number;
  steps: string[];
}

export default function StepIndicator({ current, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum <= current;
        const isLast = i === steps.length - 1;

        return (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 border-text-dark font-label text-sm font-bold transition-colors",
                  isActive ? "bg-text-dark text-text-light" : "bg-light-base text-text-muted"
                )}
              >
                {stepNum}
              </div>
              <span
                className={cn(
                  "hidden font-display text-sm font-bold sm:inline",
                  isActive ? "text-text-dark" : "text-text-muted"
                )}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-3 h-1 w-8 sm:w-16 rounded-full transition-colors",
                  stepNum < current ? "bg-text-dark" : "bg-text-dark/20"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

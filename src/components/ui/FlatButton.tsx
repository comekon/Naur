import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface FlatButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  color?: "primary" | "dark" | "accent";
  size?: "sm" | "md" | "lg";
  withShadow?: boolean;
}

const solidByColor: Record<string, string> = {
  primary: "bg-primary text-text-light hover:bg-primary/90 border-primary",
  dark: "bg-text-dark text-text-light hover:bg-text-dark/90 border-text-dark",
  accent: "bg-accent text-text-dark hover:bg-accent/90 border-accent",
};

const outlineByColor: Record<string, string> = {
  primary: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-text-light",
  dark: "bg-transparent text-text-dark border-2 border-text-dark hover:bg-text-dark hover:text-text-light",
  accent: "bg-transparent text-text-dark border-2 border-accent hover:bg-accent",
};

const ghostByColor: Record<string, string> = {
  primary: "bg-transparent text-primary hover:bg-primary/10",
  dark: "bg-transparent text-text-dark hover:bg-text-dark/10",
  accent: "bg-transparent text-text-dark hover:bg-accent/20",
};

const sizeClasses: Record<string, string> = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-5 py-3",
  lg: "text-lg px-7 py-4",
};

export default function FlatButton({
  variant = "solid",
  color = "primary",
  size = "md",
  withShadow,
  className,
  children,
  ...props
}: FlatButtonProps) {
  const showShadow = withShadow ?? variant === "solid";

  const variantClass =
    variant === "solid"
      ? cn("border-2", solidByColor[color])
      : variant === "outline"
        ? outlineByColor[color]
        : ghostByColor[color];

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-flat font-display font-bold uppercase tracking-tight transition-all duration-150",
        showShadow && "shadow-flat hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
        sizeClasses[size],
        variantClass,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

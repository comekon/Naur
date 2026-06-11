import { type ReactNode, type JSX } from "react";
import { cn } from "@/lib/cn";

interface FlatShadowCardProps {
  bg?: "white" | "primary" | "secondary" | "tertiary" | "accent" | "light";
  border?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}

const bgClasses: Record<string, string> = {
  white: "bg-light-base",
  primary: "bg-primary text-text-light",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary text-text-light",
  accent: "bg-accent",
  light: "bg-text-light text-text-dark",
};

const paddingClasses: Record<string, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function FlatShadowCard({
  bg = "white",
  border = true,
  padding = "md",
  as: Tag = "div",
  className,
  children,
}: FlatShadowCardProps) {
  return (
    <Tag
      className={cn(
        "rounded-flat shadow-flat",
        bgClasses[bg],
        border && "border-2 border-text-dark",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </Tag>
  );
}

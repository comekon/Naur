import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionContainerProps {
  as?: "section" | "div" | "header" | "footer";
  bg?: string;
  padded?: boolean;
  className?: string;
  children: ReactNode;
}

export default function SectionContainer({
  as: Tag = "section",
  bg,
  padded = true,
  className,
  children,
}: SectionContainerProps) {
  return (
    <Tag className={cn(bg, padded && "py-16 md:py-20", className)}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">{children}</div>
    </Tag>
  );
}

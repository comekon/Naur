"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y-2 divide-text-dark border-2 border-text-dark rounded-flat overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left bg-light-base hover:bg-accent/10 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3 font-display text-sm font-bold">
                {item.icon}
                {item.title}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 py-4 bg-light-base">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

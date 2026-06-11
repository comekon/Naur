"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex border-b-2 border-text-dark">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              "px-5 py-3 font-display text-sm font-bold uppercase transition-colors border-b-4 -mb-[2px]",
              active === i
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-dark"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-6">{tabs[active].content}</div>
    </div>
  );
}

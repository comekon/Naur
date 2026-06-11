"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

export default function Modal({ open, onClose, title, size = "md", children }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-text-dark/50" onClick={onClose} />
      <div className={cn("relative rounded-flat border-2 border-text-dark bg-light-base shadow-flat mx-4 w-full max-h-[85vh] overflow-y-auto", sizeClasses[size])}>
        <div className="flex items-center justify-between border-b-2 border-text-dark px-6 py-4">
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="p-1 hover:text-primary transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-5 w-5">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

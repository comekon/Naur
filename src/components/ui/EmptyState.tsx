import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

function DefaultIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-text-muted">
      {/* Cup body */}
      <path d="M30 35h55v50a10 10 0 01-10 10H40a10 10 0 01-10-10V35z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Handle */}
      <path d="M85 45h8a8 8 0 010 16h-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Steam lines */}
      <path d="M45 28c0-5 4-8 4-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M57 25c0-5 4-8 4-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M69 28c0-5 4-8 4-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Drip */}
      <circle cx="90" cy="80" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="100" cy="90" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6">{icon ?? <DefaultIcon />}</div>
      <h3 className="font-display text-xl font-bold text-text-dark">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-text-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

import { cn } from "@/lib/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  bg?: "primary" | "secondary" | "accent" | "tertiary";
  icon?: React.ReactNode;
  trend?: string;
}

const bgClasses: Record<string, string> = {
  primary: "bg-primary text-text-light",
  secondary: "bg-secondary text-text-dark",
  accent: "bg-accent text-text-dark",
  tertiary: "bg-tertiary text-text-light",
};

export default function StatCard({ label, value, bg = "primary", icon, trend }: StatCardProps) {
  return (
    <div className={cn("rounded-flat border-2 border-text-dark p-6 shadow-flat", bgClasses[bg])}>
      <div className="flex items-center justify-between">
        <p className="font-label text-xs font-bold uppercase tracking-wider opacity-70">{label}</p>
        {icon && <div className="opacity-50">{icon}</div>}
      </div>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
      {trend && <p className="mt-1 text-sm opacity-70">{trend}</p>}
    </div>
  );
}

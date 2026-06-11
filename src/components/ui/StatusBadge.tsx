import { cn } from "@/lib/cn";

type Status =
  | "new"
  | "bestseller"
  | "limited"
  | "habis"
  | "pending"
  | "processing"
  | "shipped"
  | "done"
  | "cancelled";

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

const statusConfig: Record<Status, { label: string; bg: string; text: string; extra?: string }> = {
  new: { label: "Baru", bg: "bg-secondary", text: "text-text-dark" },
  bestseller: { label: "Bestseller", bg: "bg-primary", text: "text-text-light" },
  limited: { label: "Terbatas", bg: "bg-accent", text: "text-text-dark" },
  habis: { label: "Habis", bg: "bg-text-muted", text: "text-text-light" },
  pending: { label: "Pending", bg: "bg-accent", text: "text-text-dark" },
  processing: { label: "Diproses", bg: "bg-secondary", text: "text-text-light" },
  shipped: { label: "Dikirim", bg: "bg-tertiary", text: "text-text-light" },
  done: { label: "Selesai", bg: "bg-primary", text: "text-text-light" },
  cancelled: { label: "Dibatalkan", bg: "bg-text-muted", text: "text-text-light", extra: "line-through" },
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center font-label text-xs font-bold uppercase tracking-widest px-2 py-1 border-2 border-text-dark rounded-flat",
        config.bg,
        config.text,
        config.extra
      )}
    >
      {label ?? config.label}
    </span>
  );
}

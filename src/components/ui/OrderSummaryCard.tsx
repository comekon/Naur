"use client";

import { cn } from "@/lib/cn";

interface OrderSummaryCardProps {
  subtotal: number;
  discount: number;
  total: number;
  voucherCode?: string;
  voucherInput?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function OrderSummaryCard({
  subtotal,
  discount,
  total,
  voucherInput,
  action,
  className,
}: OrderSummaryCardProps) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

  return (
    <div className={cn("rounded-flat border-2 border-text-dark bg-light-base p-6 shadow-flat", className)}>
      <h3 className="font-display text-lg font-bold">Ringkasan Pesanan</h3>
      <div className="mt-4 space-y-3 border-b-2 border-text-dark/10 pb-4">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Subtotal</span>
          <span className="font-label font-bold">{fmt(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-primary">
            <span>Diskon</span>
            <span className="font-label font-bold">-{fmt(discount)}</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-display font-bold">Total</span>
        <span className="font-label text-xl font-bold text-primary">{fmt(total)}</span>
      </div>
      {voucherInput && <div className="mt-4">{voucherInput}</div>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

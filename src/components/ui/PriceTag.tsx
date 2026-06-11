import { cn } from "@/lib/cn";

interface PriceTagProps {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagProps) {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <span className={cn("font-label font-bold text-primary", className)}>
      {formatted}
    </span>
  );
}

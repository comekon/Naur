import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";
import StatusBadge from "@/components/ui/StatusBadge";
import PriceTag from "@/components/ui/PriceTag";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div
        className={cn(
          "group rounded-flat border-2 border-text-dark bg-light-base shadow-flat transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
          className
        )}
      >
        {/* Thumbnail area */}
        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-accent/15">
          {product.badges.length > 0 && (
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
              {product.badges[0] && <StatusBadge status={product.badges[0]} />}
            </div>
          )}
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex flex-col items-center gap-1 opacity-30">
              <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
                <rect x="6" y="10" width="36" height="28" rx="4" stroke="#1A1A1A" strokeWidth="2" />
                <circle cx="24" cy="24" r="8" stroke="#1A1A1A" strokeWidth="1.5" />
              </svg>
              <span className="font-label text-[10px] text-text-muted uppercase">Foto produk</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="font-label text-xs font-bold uppercase text-text-muted">
            {product.category}
          </p>
          <h3 className="mt-1 font-display text-sm font-bold leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.tastingNotes !== "-" && (
            <p className="mt-1 text-xs text-text-muted line-clamp-1">
              {product.tastingNotes}
            </p>
          )}
          <PriceTag price={product.price} className="mt-2 text-base" />
        </div>
      </div>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import CategoryBadge from "@/components/ui/CategoryBadge";
import FlatShadowCard from "@/components/ui/FlatShadowCard";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export default function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} className={className}>
      <FlatShadowCard bg="white" padding="none" className="flex h-full flex-col overflow-hidden">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-tertiary/10">
          {article.thumbnail ? (
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
              className="object-cover transition-transform duration-300 hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg viewBox="0 0 80 80" fill="none" className="h-14 w-14 opacity-20">
                <rect x="8" y="12" width="64" height="56" rx="4" stroke="#1A1A1A" strokeWidth="2.5" />
                <line x1="20" y1="28" x2="60" y2="28" stroke="#1A1A1A" strokeWidth="2" />
                <line x1="20" y1="38" x2="52" y2="38" stroke="#1A1A1A" strokeWidth="2" />
                <line x1="20" y1="48" x2="44" y2="48" stroke="#1A1A1A" strokeWidth="2" />
              </svg>
            </div>
          )}
        </div>
        {/* Info */}
        <div className="flex flex-1 flex-col p-5">
          <CategoryBadge category={article.category} />
          <h3 className="mt-2 font-display text-base font-bold leading-snug line-clamp-2">{article.title}</h3>
          <p className="mt-2 text-sm text-text-muted line-clamp-2">{article.excerpt}</p>
          <p className="mt-3 font-label text-xs text-text-muted">
            {new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} &middot; {article.readMinutes} min baca
          </p>
        </div>
      </FlatShadowCard>
    </Link>
  );
}

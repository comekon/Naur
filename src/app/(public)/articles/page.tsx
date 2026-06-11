"use client";

import { useState, useMemo } from "react";
import { getArticlesByCategory, articleCategories } from "@/data/articles";
import ArticleCard from "@/components/ui/ArticleCard";
import Pagination from "@/components/ui/Pagination";
import { cn } from "@/lib/cn";

const ITEMS_PER_PAGE = 9;

export default function ArticlesPage() {
  const [category, setCategory] = useState("Semua");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => getArticlesByCategory(category), [category]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-primary">
        <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8">
          <h1 className="font-display text-5xl font-bold text-text-light">Artikel</h1>
        </div>
      </section>

      {/* Filter bar */}
      <div className="mx-auto max-w-[1280px] px-6 py-6 md:px-8">
        <div className="flex flex-wrap gap-2">
          {articleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "px-4 py-2 rounded-flat border-2 border-text-dark font-display text-sm font-bold transition-colors",
                category === cat
                  ? "bg-text-dark text-text-light"
                  : "bg-light-base text-text-dark hover:bg-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1280px] px-6 pb-12 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {paginated.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </>
  );
}

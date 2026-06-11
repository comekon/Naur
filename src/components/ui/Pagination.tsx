import { cn } from "@/lib/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-10 w-10 items-center justify-center rounded-flat border-2 border-text-dark font-display font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent transition-colors"
      >
        &larr;
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-flat border-2 border-text-dark font-display font-bold text-sm transition-colors",
            page === currentPage
              ? "bg-text-dark text-text-light"
              : "bg-light-base text-text-dark hover:bg-accent"
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-flat border-2 border-text-dark font-display font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent transition-colors"
      >
        &rarr;
      </button>
    </div>
  );
}

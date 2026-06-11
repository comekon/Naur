import { cn } from "@/lib/cn";
import type { ArticleCategory } from "@/types/article";

interface CategoryBadgeProps {
	category: ArticleCategory;
	className?: string;
}

const categoryColors: Record<ArticleCategory, string> = {
	"Brewing Guide": "bg-secondary text-text-dark",
	"Origin Story": "bg-primary text-text-light",
	Review: "bg-accent text-text-dark",
	Health: "bg-tertiary text-text-light",
};

export default function CategoryBadge({
	category,
	className,
}: CategoryBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex w-fit items-center font-label text-xs font-bold uppercase tracking-widest px-2.5 py-1 border-2 border-text-dark rounded-flat",
				categoryColors[category],
				className,
			)}
		>
			{category}
		</span>
	);
}

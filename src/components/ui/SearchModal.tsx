"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { articles } from "@/data/articles";
import { products } from "@/data/products";

/* ── Types ── */

interface SearchResult {
	type: "product" | "article";
	slug: string;
	name: string;
	excerpt: string;
	badge?: string;
	badgeColor?: string;
}

/* ── Data ── */

function buildResults(query: string): SearchResult[] {
	if (!query.trim()) return [];
	const q = query.toLowerCase();

	const productResults: SearchResult[] = products
		.filter(
			(p) =>
				p.name.toLowerCase().includes(q) ||
				p.category.toLowerCase().includes(q) ||
				p.teaType.toLowerCase().includes(q) ||
				p.origin.toLowerCase().includes(q) ||
				p.tastingNotes.toLowerCase().includes(q),
		)
		.map((p) => ({
			type: "product" as const,
			slug: p.slug,
			name: p.name,
			excerpt: `${p.category} · ${p.tastingNotes}`,
			badge: p.badges[0],
			badgeColor:
				p.badges[0] === "bestseller"
					? "bg-primary text-text-light"
					: p.badges[0] === "new"
						? "bg-accent text-text-dark"
						: p.badges[0] === "limited"
							? "bg-tertiary text-text-light"
							: undefined,
		}));

	const articleResults: SearchResult[] = articles
		.filter(
			(a) =>
				a.title.toLowerCase().includes(q) ||
				a.category.toLowerCase().includes(q) ||
				a.excerpt.toLowerCase().includes(q) ||
				a.tags.some((t) => t.toLowerCase().includes(q)),
		)
		.map((a) => ({
			type: "article" as const,
			slug: a.slug,
			name: a.title,
			excerpt: a.excerpt,
			badge: a.category,
			badgeColor: "bg-secondary text-text-dark",
		}));

	return [...productResults, ...articleResults].slice(0, 12);
}

/* ── Icon ── */

function CloseIcon() {
	return (
		<svg
			role="img"
			aria-label="Tutup"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
		>
			<line x1="6" y1="6" x2="18" y2="18" />
			<line x1="18" y1="6" x2="6" y2="18" />
		</svg>
	);
}

function ProductIcon() {
	return (
		<svg
			role="img"
			aria-label="Produk"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M6 7h14l-1.5 9H7.5L6 7z" />
			<path d="M1 2h4l1 5" />
		</svg>
	);
}

function ArticleIcon() {
	return (
		<svg
			role="img"
			aria-label="Artikel"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M4 4h16v16H4z" />
			<line x1="8" y1="8" x2="16" y2="8" />
			<line x1="8" y1="12" x2="14" y2="12" />
			<line x1="8" y1="16" x2="12" y2="16" />
		</svg>
	);
}

/* ── Component ── */

export default function SearchModal({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const [query, setQuery] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const results = useMemo(() => buildResults(query), [query]);

	// Focus input when opened
	useEffect(() => {
		if (open) {
			setQuery("");
			setTimeout(() => inputRef.current?.focus(), 50);
		}
	}, [open]);

	// Close on Escape
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open, onClose]);

	// Lock body scroll
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	if (!open) return null;

	const productResults = results.filter((r) => r.type === "product");
	const articleResults = results.filter((r) => r.type === "article");

	return (
		<div className="fixed inset-0 z-[100]">
			{/* Backdrop */}
			{/* biome-ignore lint/a11y/noStaticElementInteractions: overlay backdrop click-to-close is standard UX */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop is not focusable by design */}
			<div className="absolute inset-0 bg-text-dark/60" onClick={onClose} />

			{/* Modal */}
			<div className="relative mx-auto mt-[10vh] w-full max-w-[640px] px-4">
				<div className="overflow-hidden rounded-flat border-2 border-text-dark bg-light-base shadow-[6px_6px_0px_#1A1A1A]">
					{/* Input */}
					<div className="flex items-center gap-3 border-b-2 border-text-dark px-4 py-3">
						<svg
							role="img"
							aria-label="Cari"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							className="shrink-0 text-text-muted"
						>
							<circle cx="11" cy="11" r="7" />
							<line x1="16.5" y1="16.5" x2="21" y2="21" />
						</svg>
						<input
							ref={inputRef}
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Cari produk, artikel, jenis teh..."
							className="flex-1 bg-transparent font-display text-lg font-bold outline-none placeholder:text-text-muted/60"
						/>
						<button
							type="button"
							onClick={onClose}
							className="p-1 transition-colors hover:text-primary"
							aria-label="Tutup"
						>
							<CloseIcon />
						</button>
					</div>

					{/* Results */}
					<div className="max-h-[55vh] overflow-y-auto">
						{query.trim() && results.length === 0 && (
							<div className="px-4 py-10 text-center">
								<p className="font-display font-bold text-text-muted">
									Tidak ditemukan hasil untuk &ldquo;{query}&rdquo;
								</p>
								<p className="mt-1 text-sm text-text-muted">
									Coba kata kunci lain, misalnya &ldquo;jasmine&rdquo; atau
									&ldquo;brewing&rdquo;
								</p>
							</div>
						)}

						{!query.trim() && (
							<div className="px-4 py-6 text-center text-sm text-text-muted">
								Ketik untuk mulai mencari produk atau artikel
							</div>
						)}

						{/* Product results */}
						{productResults.length > 0 && (
							<div>
								<div className="px-4 pb-1 pt-3">
									<p className="font-label text-xs font-bold uppercase tracking-wider text-text-muted">
										Produk
									</p>
								</div>
								{productResults.map((r) => (
									<Link
										key={r.slug}
										href={`/products/${r.slug}`}
										onClick={() => onClose()}
										className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/15"
									>
										<span className="text-text-muted">
											<ProductIcon />
										</span>
										<div className="min-w-0 flex-1">
											<div className="flex items-center gap-2">
												<p className="truncate font-display text-sm font-bold">
													{r.name}
												</p>
												{r.badge && r.badgeColor && (
													<span
														className={`shrink-0 rounded-flat px-1.5 py-0.5 font-label text-[10px] font-bold uppercase ${r.badgeColor}`}
													>
														{r.badge}
													</span>
												)}
											</div>
											<p className="truncate text-xs text-text-muted">
												{r.excerpt}
											</p>
										</div>
									</Link>
								))}
							</div>
						)}

						{/* Article results */}
						{articleResults.length > 0 && (
							<div>
								<div className="border-t-2 border-text-dark/10 px-4 pb-1 pt-3">
									<p className="font-label text-xs font-bold uppercase tracking-wider text-text-muted">
										Artikel
									</p>
								</div>
								{articleResults.map((r) => (
									<Link
										key={r.slug}
										href={`/articles/${r.slug}`}
										onClick={() => onClose()}
										className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/15"
									>
										<span className="text-text-muted">
											<ArticleIcon />
										</span>
										<div className="min-w-0 flex-1">
											<div className="flex items-center gap-2">
												<p className="truncate font-display text-sm font-bold">
													{r.name}
												</p>
												{r.badge && (
													<span className="shrink-0 rounded-flat bg-secondary px-1.5 py-0.5 font-label text-[10px] font-bold text-text-dark">
														{r.badge}
													</span>
												)}
											</div>
											<p className="truncate text-xs text-text-muted">
												{r.excerpt}
											</p>
										</div>
									</Link>
								))}
							</div>
						)}

						{/* See all */}
						{results.length > 0 && (
							<div className="border-t-2 border-text-dark/10 px-4 py-3">
								<button
									type="button"
									onClick={() => {
										if (query.trim()) {
											onClose();
											router.push(
												`/products?q=${encodeURIComponent(query.trim())}`,
											);
										}
									}}
									className="font-display text-sm font-bold text-primary hover:underline"
								>
									Lihat semua hasil untuk &ldquo;{query}&rdquo; →
								</button>
							</div>
						)}
					</div>

					{/* Footer hint */}
					<div className="flex items-center gap-4 border-t-2 border-text-dark/10 px-4 py-2 text-[11px] text-text-muted">
						<span>
							<kbd className="rounded-flat border border-text-dark/20 bg-light-base px-1 py-0.5 font-label text-[10px]">
								ESC
							</kbd>{" "}
							Tutup
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

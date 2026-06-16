"use client";

import { useState, useMemo, useEffect } from "react";
import { filterProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import ProductFilterSidebar from "@/components/products/ProductFilterSidebar";
import { cn } from "@/lib/cn";

const sortOptions = [
	{ value: "newest", label: "Terbaru" },
	{ value: "bestseller", label: "Terlaris" },
	{ value: "price-asc", label: "Harga Naik" },
	{ value: "price-desc", label: "Harga Turun" },
] as const;

/* ── Inline SVG Icons ── */

function FilterIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			className="h-4 w-4"
			aria-hidden="true"
		>
			<path d="M3 6h18M6 12h12M10 18h4" />
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			className="h-5 w-5"
			aria-hidden="true"
		>
			<line x1="6" y1="6" x2="18" y2="18" />
			<line x1="18" y1="6" x2="6" y2="18" />
		</svg>
	);
}

export default function ProductsPage() {
	const [category, setCategory] = useState("");
	const [teaType, setTeaType] = useState("");
	const [origin, setOrigin] = useState("");
	const [sort, setSort] = useState<string>("newest");
	const [filterOpen, setFilterOpen] = useState(false);

	const filtered = useMemo(
		() =>
			filterProducts({
				category: category || undefined,
				teaType: teaType || undefined,
				origin: origin || undefined,
				sort: sort as "newest" | "bestseller" | "price-asc" | "price-desc",
			}),
		[category, teaType, origin, sort],
	);

	// Lock body scroll while the mobile filter drawer is open
	useEffect(() => {
		document.body.style.overflow = filterOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [filterOpen]);

	const activeFilterCount = [category, teaType, origin].filter(Boolean).length;

	return (
		<>
			{/* Header */}
			<section className="bg-secondary">
				<div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8">
					<h1 className="font-display text-5xl font-bold text-text-light">
						Produk
					</h1>
				</div>
			</section>

			{/* Content */}
			<div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8">
				<div className="flex flex-col gap-8 md:flex-row">
					{/* Sidebar — desktop only */}
					<div className="hidden shrink-0 md:block">
						<ProductFilterSidebar
							selectedCategory={category}
							selectedTeaType={teaType}
							selectedOrigin={origin}
							onCategoryChange={setCategory}
							onTeaTypeChange={setTeaType}
							onOriginChange={setOrigin}
						/>
					</div>

					{/* Right: sort + grid */}
					<div className="flex-1">
						{/* Mobile filter button */}
						<div className="mb-4 flex items-center justify-between md:hidden">
							<button
								type="button"
								onClick={() => setFilterOpen(true)}
								className="flex items-center gap-2 rounded-flat border-2 border-text-dark bg-light-base px-4 py-2 font-display text-sm font-bold transition-colors hover:bg-accent"
							>
								<FilterIcon />
								Filter
								{activeFilterCount > 0 && (
									<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold leading-none text-text-light">
										{activeFilterCount}
									</span>
								)}
							</button>
							<span className="font-display text-sm text-text-muted">
								{filtered.length} produk
							</span>
						</div>

						{/* Sort bar */}
						<div className="mb-6 flex flex-wrap items-center gap-3">
							<span className="text-sm font-bold text-text-muted">
								Urutkan:
							</span>
							{sortOptions.map((opt) => (
								<button
									key={opt.value}
									onClick={() => setSort(opt.value)}
									className={cn(
										"text-sm px-3 py-1.5 rounded-flat border-2 border-text-dark font-display font-bold transition-colors",
										sort === opt.value
											? "bg-text-dark text-text-light"
											: "bg-light-base text-text-dark hover:bg-accent",
									)}
								>
									{opt.label}
								</button>
							))}
						</div>

						{/* Grid */}
						{filtered.length === 0 ? (
							<EmptyState
								title="Produk tidak ditemukan"
								description="Coba ubah filter untuk menemukan produk yang kamu cari."
								action={
									<button
										onClick={() => {
											setCategory("");
											setTeaType("");
											setOrigin("");
										}}
										className="font-display text-sm font-bold px-5 py-3 rounded-flat bg-primary text-text-light border-2 border-text-dark shadow-flat-sm"
									>
										Reset Filter
									</button>
								}
							/>
						) : (
							<div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
								{filtered.map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Mobile filter drawer */}
			<div
				onClick={() => setFilterOpen(false)}
				aria-hidden="true"
				className={cn(
					"fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden",
					filterOpen ? "opacity-100" : "pointer-events-none opacity-0",
				)}
			/>
			<aside
				className={cn(
					"fixed left-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-r-2 border-text-dark bg-light-base transition-transform duration-200 md:hidden",
					filterOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				{/* Drawer header */}
				<div className="flex items-center justify-between border-b-2 border-text-dark px-6 py-4">
					<h2 className="font-display text-lg font-bold">Filter</h2>
					<button
						type="button"
						onClick={() => setFilterOpen(false)}
						aria-label="Tutup filter"
						className="p-1 text-text-dark transition-colors hover:text-primary"
					>
						<CloseIcon />
					</button>
				</div>

				{/* Drawer body */}
				<div className="flex-1 overflow-y-auto px-6 py-4">
					<ProductFilterSidebar
						selectedCategory={category}
						selectedTeaType={teaType}
						selectedOrigin={origin}
						onCategoryChange={setCategory}
						onTeaTypeChange={setTeaType}
						onOriginChange={setOrigin}
						showHeading={false}
					/>
				</div>

				{/* Drawer footer */}
				<div className="border-t-2 border-text-dark p-4">
					<button
						type="button"
						onClick={() => setFilterOpen(false)}
						className="w-full rounded-flat border-2 border-text-dark bg-primary py-3 font-display font-bold text-text-light transition-colors hover:bg-primary/90"
					>
						Tampilkan {filtered.length} Produk
					</button>
				</div>
			</aside>
		</>
	);
}

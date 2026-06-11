"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import FlatButton from "@/components/ui/FlatButton";
import StatusBadge from "@/components/ui/StatusBadge";
import { products as baseProducts } from "@/data/products";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

const fmt = (n: number) =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(n);

export default function AdminProductsPage() {
	const [productList, setProductList] = useState<Product[]>(baseProducts);
	const [categoryFilter, setCategoryFilter] = useState("");
	const [stockFilter, setStockFilter] = useState<"" | "in" | "low" | "out">("");

	useEffect(() => {
		try {
			const raw = localStorage.getItem("naur-admin-products");
			if (raw) {
				const custom: Product[] = JSON.parse(raw);
				setProductList([
					...baseProducts.filter((p) => !custom.find((c) => c.id === p.id)),
					...custom,
				]);
			}
		} catch {
			/* ignore */
		}
	}, []);

	const categories = useMemo(
		() => [...new Set(baseProducts.map((p) => p.category))],
		[],
	);

	const filtered = useMemo(() => {
		let result = productList;
		if (categoryFilter)
			result = result.filter((p) => p.category === categoryFilter);
		if (stockFilter === "out") result = result.filter((p) => p.stock === 0);
		else if (stockFilter === "low")
			result = result.filter((p) => p.stock > 0 && p.stock < 10);
		else if (stockFilter === "in") result = result.filter((p) => p.stock >= 10);
		return result;
	}, [productList, categoryFilter, stockFilter]);

	const handleDelete = (id: string) => {
		if (!confirm("Hapus produk ini?")) return;
		setProductList((prev) => prev.filter((p) => p.id !== id));
		try {
			const custom = productList.filter(
				(p) => !baseProducts.find((b) => b.id === p.id) && p.id !== id,
			);
			localStorage.setItem("naur-admin-products", JSON.stringify(custom));
		} catch {
			/* ignore */
		}
	};

	const columns = [
		{
			key: "images",
			label: "",
			render: (_val: unknown, _row: Product) => (
				<div className="flex h-12 w-12 items-center justify-center rounded-flat border-2 border-text-dark/20 bg-accent/10 shrink-0">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						className="h-5 w-5 opacity-20"
						aria-hidden="true"
					>
						<title>Produk</title>
						<rect
							x="3"
							y="3"
							width="18"
							height="18"
							rx="2"
							stroke="#1A1A1A"
							strokeWidth="2"
						/>
						<circle cx="8.5" cy="8.5" r="1.5" fill="#1A1A1A" />
						<path
							d="M21 15l-5-5L5 21"
							stroke="#1A1A1A"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</div>
			),
		},
		{
			key: "name",
			label: "Nama",
			render: (val: string, row: Product) => (
				<div>
					<p className="font-bold text-sm">{val}</p>
					<p className="text-xs text-text-muted mt-0.5">
						{row.teaType !== "-" ? row.teaType : row.category}
					</p>
				</div>
			),
		},
		{
			key: "category",
			label: "Kategori",
			render: (val: string) => <StatusBadge status="new" label={val} />,
		},
		{
			key: "price",
			label: "Harga",
			render: (val: number) => (
				<span className="font-label font-bold">{fmt(val)}</span>
			),
		},
		{
			key: "stock",
			label: "Stok",
			render: (val: number) => (
				<div className="flex items-center gap-2">
					<span
						className={cn(
							"font-label font-bold",
							val === 0
								? "text-text-muted"
								: val < 10
									? "text-secondary"
									: "text-text-dark",
						)}
					>
						{val}
					</span>
					{val === 0 && <StatusBadge status="habis" />}
					{val > 0 && val < 10 && (
						<span className="inline-flex items-center rounded-full bg-secondary/20 px-1.5 py-0.5 font-label text-xs font-bold text-secondary">
							Low
						</span>
					)}
				</div>
			),
		},
		{
			key: "badges",
			label: "Badge",
			render: (val: string[]) => (
				<div className="flex flex-wrap gap-1">
					{val.map((badge) => (
						<StatusBadge
							key={badge}
							status={badge as "new" | "bestseller" | "limited" | "habis"}
						/>
					))}
					{val.length === 0 && (
						<span className="text-xs text-text-muted">—</span>
					)}
				</div>
			),
		},
	];

	return (
		<div>
			{/* Page Header */}
			<div className="mb-6">
				<h1 className="font-display text-2xl font-bold">Kelola Produk</h1>
				<p className="text-sm text-text-muted mt-1">
					Kelola semua produk yang dijual di toko.
				</p>
			</div>

			{/* Filters + actions */}
			<div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-wrap gap-2">
					{/* Category filter */}
					<button
						type="button"
						onClick={() => setCategoryFilter("")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							!categoryFilter && "bg-text-dark text-text-light",
						)}
					>
						Semua
					</button>
					{categories.map((cat) => (
						<button
							type="button"
							key={cat}
							onClick={() => setCategoryFilter(cat)}
							className={cn(
								"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
								categoryFilter === cat && "bg-text-dark text-text-light",
							)}
						>
							{cat}
						</button>
					))}
					{/* Divider */}
					<span className="w-px bg-text-dark/20 mx-1" />
					{/* Stock filter */}
					<button
						type="button"
						onClick={() => setStockFilter("")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							!stockFilter && "bg-primary text-text-light",
						)}
					>
						Semua Stok
					</button>
					<button
						type="button"
						onClick={() => setStockFilter("in")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							stockFilter === "in" && "bg-primary text-text-light",
						)}
					>
						Tersedia
					</button>
					<button
						type="button"
						onClick={() => setStockFilter("low")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							stockFilter === "low" && "bg-secondary text-text-dark",
						)}
					>
						Hampir Habis
					</button>
					<button
						type="button"
						onClick={() => setStockFilter("out")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							stockFilter === "out" && "bg-text-muted text-text-light",
						)}
					>
						Habis
					</button>
				</div>
				<div className="flex items-center gap-3">
					<p className="text-sm text-text-muted">{filtered.length} produk</p>
					<Link href="/admin/products/new">
						<FlatButton variant="solid" color="primary" size="sm">
							+ Tambah Produk
						</FlatButton>
					</Link>
				</div>
			</div>

			{/* Data Table */}
			<DataTable
				columns={columns}
				rows={filtered}
				actions={(row: Product) => (
					<>
						<Link
							href={`/products/${row.slug}`}
							className="text-xs font-bold hover:text-primary"
						>
							Preview
						</Link>
						<Link
							href={`/admin/products/${row.id}/edit`}
							className="text-xs font-bold text-secondary hover:underline"
						>
							Edit
						</Link>
						<button
							type="button"
							onClick={() => handleDelete(row.id)}
							className="text-xs font-bold text-primary hover:underline"
						>
							Hapus
						</button>
					</>
				)}
			/>
		</div>
	);
}

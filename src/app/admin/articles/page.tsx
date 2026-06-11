"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import FlatButton from "@/components/ui/FlatButton";
import { getAllArticles } from "@/data/articles";
import { cn } from "@/lib/cn";
import type { Article } from "@/types/article";

export default function AdminArticlesPage() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [categoryFilter, setCategoryFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState<"" | "draft" | "published">(
		"",
	);

	useEffect(() => {
		const base = getAllArticles();
		try {
			const raw = localStorage.getItem("naur-admin-articles");
			if (raw) {
				const custom: Article[] = JSON.parse(raw);
				const merged = [
					...base.filter((a) => !custom.find((c) => c.id === a.id)),
					...custom,
				];
				setArticles(merged);
				return;
			}
		} catch {
			/* ignore */
		}
		setArticles(base);
	}, []);

	const categories = useMemo(
		() => [...new Set(articles.map((a) => a.category))],
		[articles],
	);

	const filtered = useMemo(() => {
		let result = articles;
		if (categoryFilter)
			result = result.filter((a) => a.category === categoryFilter);
		if (statusFilter === "draft") {
			// Mock: base articles are "published", only localStorage articles can be drafts
			result = result.filter(
				(a) => !getAllArticles().find((b) => b.id === a.id),
			);
		}
		return result;
	}, [articles, categoryFilter, statusFilter]);

	const handleDelete = (id: string) => {
		if (!confirm("Hapus artikel ini?")) return;
		const updated = articles.filter((a) => a.id !== id);
		setArticles(updated);
		try {
			localStorage.setItem(
				"naur-admin-articles",
				JSON.stringify(
					updated.filter((a) => !getAllArticles().find((b) => b.id === a.id)),
				),
			);
		} catch {
			/* ignore */
		}
	};

	const categoryColors: Record<string, string> = {
		"Brewing Guide": "bg-secondary text-text-dark",
		"Origin Story": "bg-primary text-text-light",
		Review: "bg-accent text-text-dark",
		Health: "bg-tertiary text-text-light",
	};

	const columns = [
		{
			key: "thumbnail",
			label: "",
			render: (_val: unknown, _row: Article) => (
				<div className="flex h-12 w-16 items-center justify-center rounded-flat border-2 border-text-dark/20 bg-accent/10 shrink-0">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						className="h-5 w-5 opacity-20"
						aria-hidden="true"
					>
						<title>Gambar</title>
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
			key: "title",
			label: "Judul",
			render: (val: string, row: Article) => (
				<div>
					<p className="font-bold text-sm">{val}</p>
					<p className="text-xs text-text-muted mt-0.5 line-clamp-1">
						{row.excerpt}
					</p>
				</div>
			),
		},
		{
			key: "category",
			label: "Kategori",
			render: (val: string) => (
				<span
					className={cn(
						"inline-flex px-2 py-1 rounded-flat font-label text-xs font-bold border-2 border-text-dark",
						categoryColors[val] ?? "bg-light-base text-text-dark",
					)}
				>
					{val}
				</span>
			),
		},
		{
			key: "readMinutes",
			label: "Baca",
			render: (val: number) => (
				<span className="font-label text-xs">{val} min</span>
			),
		},
		{
			key: "publishedAt",
			label: "Tanggal",
			render: (val: string) => (
				<span className="font-label text-xs">
					{new Date(val).toLocaleDateString("id-ID", {
						day: "numeric",
						month: "short",
						year: "numeric",
					})}
				</span>
			),
		},
	];

	return (
		<div>
			{/* Page Header */}
			<div className="mb-6">
				<h1 className="font-display text-2xl font-bold">Kelola Artikel</h1>
				<p className="text-sm text-text-muted mt-1">
					Kelola semua artikel yang tampil di website.
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
					{/* Status filter */}
					<button
						type="button"
						onClick={() => setStatusFilter("")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							!statusFilter && "bg-primary text-text-light",
						)}
					>
						Published
					</button>
					<button
						type="button"
						onClick={() => setStatusFilter("draft")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							statusFilter === "draft" && "bg-accent text-text-dark",
						)}
					>
						Draft
					</button>
				</div>
				<div className="flex items-center gap-3">
					<p className="text-sm text-text-muted">{filtered.length} artikel</p>
					<Link href="/admin/articles/new">
						<FlatButton variant="solid" color="primary" size="sm">
							+ Tulis Artikel
						</FlatButton>
					</Link>
				</div>
			</div>

			{/* Data Table */}
			<DataTable
				columns={columns}
				rows={filtered}
				actions={(row: Article) => (
					<>
						<Link
							href={`/articles/${row.slug}`}
							className="text-xs font-bold hover:text-primary"
						>
							Preview
						</Link>
						<Link
							href={`/admin/articles/${row.id}/edit`}
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

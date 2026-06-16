"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import FlatButton from "@/components/ui/FlatButton";

export default function NewProductPage() {
	const router = useRouter();
	const [form, setForm] = useState({
		name: "",
		category: "Minuman RTD",
		teaType: "-",
		origin: "-",
		price: "",
		stock: "",
		description: "",
		tastingNotes: "",
		badges: [] as string[],
	});
	const [image, setImage] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const update = (key: string, val: string) =>
		setForm((f) => ({ ...f, [key]: val }));

	const toggleBadge = (badge: string) => {
		setForm((f) => ({
			...f,
			badges: f.badges.includes(badge)
				? f.badges.filter((b) => b !== badge)
				: [...f.badges, badge],
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const slug = form.name
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "");

		const newProduct = {
			id: `p${Date.now()}`,
			...form,
			slug,
			price: Number(form.price),
			stock: Number(form.stock),
			images: image ? [image] : [],
			brewGuide: "-",
		};
		try {
			const existing = JSON.parse(
				localStorage.getItem("naur-admin-products") || "[]",
			);
			existing.push(newProduct);
			localStorage.setItem("naur-admin-products", JSON.stringify(existing));
		} catch {
			/* ignore */
		}
		router.push("/admin/products");
	};

	const categories = [
		"Minuman RTD",
		"Teh Kemasan",
		"Alat Seduh",
		"Merchandise",
		"Bundling",
	];
	const teaTypes = [
		"-",
		"Jasmine",
		"Oolong",
		"Green Tea",
		"Matcha",
		"Black Tea",
		"Cold Brew",
		"Single Origin",
	];
	const origins = ["-", "Kerinci", "Wonosobo", "Puncak"];
	const badgeOptions = ["new", "bestseller", "limited", "habis"];

	return (
		<div className="max-w-2xl">
			<Link
				href="/admin/products"
				className="font-display text-sm font-bold text-primary hover:underline"
			>
				&larr; Kembali
			</Link>
			<h2 className="mt-2 font-display text-2xl font-bold">Tambah Produk</h2>

			<form onSubmit={handleSubmit} className="mt-6 space-y-5">
				<div>
					<label
						htmlFor="new-name"
						className="block font-display text-sm font-bold mb-1"
					>
						Nama
					</label>
					<input
						id="new-name"
						type="text"
						value={form.name}
						onChange={(e) => update("name", e.target.value)}
						className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
						required
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div>
						<label
							htmlFor="new-category"
							className="block font-display text-sm font-bold mb-1"
						>
							Kategori
						</label>
						<select
							id="new-category"
							value={form.category}
							onChange={(e) => update("category", e.target.value)}
							className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
						>
							{categories.map((c) => (
								<option key={c}>{c}</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="new-tea"
							className="block font-display text-sm font-bold mb-1"
						>
							Jenis Teh
						</label>
						<select
							id="new-tea"
							value={form.teaType}
							onChange={(e) => update("teaType", e.target.value)}
							className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
						>
							{teaTypes.map((t) => (
								<option key={t}>{t}</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="new-origin"
							className="block font-display text-sm font-bold mb-1"
						>
							Asal Daun
						</label>
						<select
							id="new-origin"
							value={form.origin}
							onChange={(e) => update("origin", e.target.value)}
							className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
						>
							{origins.map((o) => (
								<option key={o}>{o}</option>
							))}
						</select>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="new-price"
							className="block font-display text-sm font-bold mb-1"
						>
							Harga (Rp)
						</label>
						<input
							id="new-price"
							type="number"
							value={form.price}
							onChange={(e) => update("price", e.target.value)}
							className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm font-label focus:outline-none focus:border-primary"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="new-stock"
							className="block font-display text-sm font-bold mb-1"
						>
							Stok
						</label>
						<input
							id="new-stock"
							type="number"
							value={form.stock}
							onChange={(e) => update("stock", e.target.value)}
							className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm font-label focus:outline-none focus:border-primary"
							required
						/>
					</div>
				</div>

				{/* ── Gambar Produk ── */}
				<div>
					<p className="block font-display text-sm font-bold mb-2">
						Gambar Produk
					</p>

					{image ? (
						<div className="space-y-3">
							<div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-flat border-2 border-text-dark/20 bg-black/5">
								<Image
									src={image}
									alt={form.name || "Preview"}
									fill
									className="object-cover"
									sizes="(max-width: 320px) 100vw, 320px"
								/>
							</div>
							<div className="flex items-center gap-3">
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									className="inline-flex items-center gap-1.5 rounded-flat border-2 border-text-dark px-4 py-2 text-sm font-display font-bold transition-colors hover:bg-text-dark hover:text-text-light"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
										<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
										<polyline points="17 8 12 3 7 8" />
										<line x1="12" y1="3" x2="12" y2="15" />
									</svg>
									Ganti Gambar
								</button>
								<button
									type="button"
									onClick={() => setImage("")}
									className="text-sm font-display font-bold text-primary hover:underline"
								>
									Hapus Gambar
								</button>
							</div>
						</div>
					) : (
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="flex aspect-square w-full max-w-xs cursor-pointer flex-col items-center justify-center gap-2 rounded-flat border-2 border-dashed border-text-dark/30 bg-black/5 transition-colors hover:border-primary hover:bg-primary/5"
						>
							<svg
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-text-dark/40"
								aria-hidden="true"
							>
								<rect x="3" y="3" width="18" height="18" rx="2" />
								<circle cx="8.5" cy="8.5" r="1.5" />
								<polyline points="21 15 16 10 5 21" />
							</svg>
							<span className="text-sm font-display font-bold text-text-dark/50">
								Klik untuk upload gambar
							</span>
							<span className="text-xs text-text-dark/30">
								PNG, JPG, WebP (max 5MB)
							</span>
						</button>
					)}

					<input
						ref={fileInputRef}
						type="file"
						accept="image/png,image/jpeg,image/webp"
						onChange={handleFileChange}
						className="hidden"
					/>
				</div>

				<div>
					<label
						htmlFor="new-desc"
						className="block font-display text-sm font-bold mb-1"
					>
						Deskripsi
					</label>
					<textarea
						id="new-desc"
						value={form.description}
						onChange={(e) => update("description", e.target.value)}
						rows={3}
						className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
					/>
				</div>
				<div>
					<label
						htmlFor="new-notes"
						className="block font-display text-sm font-bold mb-1"
					>
						Tasting Notes
					</label>
					<input
						id="new-notes"
						type="text"
						value={form.tastingNotes}
						onChange={(e) => update("tastingNotes", e.target.value)}
						className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
					/>
				</div>

				<div>
					<p className="block font-display text-sm font-bold mb-2">Badge</p>
					<div className="flex flex-wrap gap-2">
						{badgeOptions.map((badge) => (
							<button
								key={badge}
								type="button"
								onClick={() => toggleBadge(badge)}
								className={`px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold ${form.badges.includes(badge) ? "bg-accent" : ""}`}
							>
								{badge}
							</button>
						))}
					</div>
				</div>

				<div className="flex gap-3 pt-4">
					<FlatButton type="submit" variant="solid" color="primary" size="lg">
						Simpan
					</FlatButton>
					<Link href="/admin/products">
						<FlatButton variant="outline" color="dark" size="lg">
							Batal
						</FlatButton>
					</Link>
				</div>
			</form>
		</div>
	);
}

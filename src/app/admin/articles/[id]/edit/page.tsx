"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FlatButton from "@/components/ui/FlatButton";
import { getAllArticles } from "@/data/articles";

export default function EditArticlePage() {
	const params = useParams();
	const router = useRouter();
	const id = params.id as string;
	const article = getAllArticles().find((a) => a.id === id);

	const [title, setTitle] = useState(article?.title ?? "");
	const [content, setContent] = useState(article?.content ?? "");
	const [thumbnail, setThumbnail] = useState(article?.thumbnail ?? "");
	const [removeThumbnail, setRemoveThumbnail] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (article) {
			setTitle(article.title);
			setContent(article.content);
			setThumbnail(article.thumbnail);
		}
	}, [article]);

	if (!article) {
		return (
			<div>
				<p className="text-text-muted">Artikel tidak ditemukan.</p>
				<Link
					href="/admin/articles"
					className="mt-4 inline-block font-bold text-primary hover:underline"
				>
					&larr; Kembali
				</Link>
			</div>
		);
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			setThumbnail(reader.result as string);
			setRemoveThumbnail(false);
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert(
			"Artikel berhasil diperbarui! (mock — data disimpan di localStorage)",
		);
		router.push("/admin/articles");
	};

	const displayThumbnail = removeThumbnail ? "" : thumbnail;

	return (
		<div className="max-w-2xl">
			<Link
				href="/admin/articles"
				className="font-display text-sm font-bold text-primary hover:underline"
			>
				&larr; Kembali
			</Link>
			<h2 className="mt-2 font-display text-2xl font-bold">Edit Artikel</h2>

			<form onSubmit={handleSubmit} className="mt-6 space-y-5">
				<div>
					<label
						htmlFor="edit-title"
						className="block font-display text-sm font-bold mb-1"
					>
						Judul
					</label>
					<input
						id="edit-title"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
						required
					/>
				</div>

				{/* ── Thumbnail ── */}
				<div>
					<p className="block font-display text-sm font-bold mb-2">
						Gambar Thumbnail
					</p>

					{displayThumbnail ? (
						<div className="space-y-3">
							<div className="relative aspect-video w-full overflow-hidden rounded-flat border-2 border-text-dark/20 bg-black/5">
								<Image
									src={displayThumbnail}
									alt={title}
									fill
									className="object-cover"
									sizes="(max-width: 672px) 100vw, 672px"
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
									onClick={() => {
										setRemoveThumbnail(true);
										setThumbnail("");
									}}
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
							className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-flat border-2 border-dashed border-text-dark/30 bg-black/5 transition-colors hover:border-primary hover:bg-primary/5"
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
						htmlFor="edit-content"
						className="block font-display text-sm font-bold mb-1"
					>
						Konten
					</label>
					<textarea
						id="edit-content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						rows={12}
						className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary resize-y"
						required
					/>
				</div>
				<div className="flex gap-3 pt-4">
					<FlatButton type="submit" variant="solid" color="primary" size="lg">
						Perbarui
					</FlatButton>
					<Link href="/admin/articles">
						<FlatButton type="button" variant="outline" color="dark" size="lg">
							Batal
						</FlatButton>
					</Link>
				</div>
			</form>
		</div>
	);
}

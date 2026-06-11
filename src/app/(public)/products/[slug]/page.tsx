"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import FlatButton from "@/components/ui/FlatButton";
import PriceTag from "@/components/ui/PriceTag";
import ProductCard from "@/components/ui/ProductCard";
import QuantityControl from "@/components/ui/QuantityControl";
import StatusBadge from "@/components/ui/StatusBadge";
import Tabs from "@/components/ui/Tabs";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { cn } from "@/lib/cn";
import { useCart } from "@/store/cart";

export default function ProductDetailPage() {
	const params = useParams();
	const slug = params.slug as string;
	const product = getProductBySlug(slug);
	const { addItem } = useCart();

	const [qty, setQty] = useState(1);
	const [sugar, setSugar] = useState("50");
	const [temp, setTemp] = useState("Iced");
	const [size, setSize] = useState("Regular");
	const [added, setAdded] = useState(false);

	if (!product) {
		return (
			<SectionContainer>
				<div className="py-20 text-center">
					<h1 className="font-display text-4xl font-bold">
						Produk tidak ditemukan
					</h1>
					<Link
						href="/products"
						className="mt-6 inline-block font-display font-bold text-primary hover:underline"
					>
						&larr; Kembali ke katalog
					</Link>
				</div>
			</SectionContainer>
		);
	}

	const related = getRelatedProducts(product);

	const addToCart = () => {
		addItem({
			productId: product.id,
			name: product.name,
			slug: product.slug,
			price: product.price,
			image: product.images[0],
			category: product.category,
			quantity: qty,
			options: { sugar, temperature: temp, size },
		});
		setAdded(true);
		setTimeout(() => setAdded(false), 2000);
	};

	const buyNow = () => {
		addToCart();
	};

	const optionButtons = (
		options: { value: string; label: string }[],
		selected: string,
		onChange: (v: string) => void,
	) =>
		options.map((opt) => (
			<button
				type="button"
				key={opt.value}
				onClick={() => onChange(opt.value)}
				className={cn(
					"px-4 py-2 rounded-flat border-2 border-text-dark font-display text-sm font-bold transition-colors",
					selected === opt.value
						? "bg-text-dark text-text-light"
						: "bg-light-base text-text-dark hover:bg-accent",
				)}
			>
				{opt.label}
			</button>
		));

	const tabs = [
		{
			label: "Deskripsi",
			content: (
				<p className="text-text-muted leading-relaxed">{product.description}</p>
			),
		},
		{
			label: "Cara Seduh",
			content: (
				<p className="text-text-muted leading-relaxed">{product.brewGuide}</p>
			),
		},
		{
			label: "Review",
			content: (
				<div className="space-y-4">
					{[
						{ name: "Rina", rating: 5, text: "Enak banget! Pasti beli lagi." },
						{
							name: "Budi",
							rating: 4,
							text: "Tehnya berkualitas, packaging-nya juga keren.",
						},
						{
							name: "Sari",
							rating: 5,
							text: "Favorite baru gue. Recommended!",
						},
					].map((review) => (
						<div
							key={review.name}
							className="border-b-2 border-text-dark/10 pb-4"
						>
							<div className="flex items-center gap-2">
								<span className="font-display text-sm font-bold">
									{review.name}
								</span>
								<span className="font-label text-xs text-primary">
									{"★".repeat(review.rating)}
									{"☆".repeat(5 - review.rating)}
								</span>
							</div>
							<p className="mt-1 text-sm text-text-muted">{review.text}</p>
						</div>
					))}
				</div>
			),
		},
	];

	return (
		<>
			{/* Header */}
			<section className="bg-secondary">
				<div className="mx-auto max-w-[1280px] px-6 py-4 md:px-8">
					<Link
						href="/products"
						className="font-display text-sm font-bold text-text-light hover:underline"
					>
						&larr; Katalog Produk
					</Link>
				</div>
			</section>

			{/* Product detail */}
			<SectionContainer>
				<div className="flex flex-col gap-10 md:flex-row">
					{/* Left: Gallery */}
					<div className="md:w-1/2">
						<div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-flat border-2 border-text-dark bg-accent/15">
							{product.images[0] ? (
								<Image
									src={product.images[0]}
									alt={product.name}
									fill
									priority
									sizes="(max-width: 768px) 100vw, 640px"
									className="object-cover"
								/>
							) : (
								<>
									<div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10" />
									<svg
										viewBox="0 0 120 120"
										fill="none"
										className="relative h-40 w-40 opacity-30"
										role="img"
										aria-label="Decorative icon"
									>
										<rect
											x="15"
											y="25"
											width="90"
											height="70"
											rx="8"
											stroke="#1A1A1A"
											strokeWidth="3"
										/>
										<circle
											cx="60"
											cy="60"
											r="18"
											stroke="#1A1A1A"
											strokeWidth="2.5"
										/>
										<path
											d="M50 55 L57 62 L72 47"
											stroke="#E63000"
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<p className="absolute bottom-6 font-label text-xs text-text-muted opacity-50">
										Foto produk
									</p>
								</>
							)}
						</div>
					</div>

					{/* Right: Product info */}
					<div className="md:w-1/2">
						{/* Badges */}
						<div className="flex flex-wrap gap-2 mb-3">
							{product.badges.map((badge) => (
								<StatusBadge key={badge} status={badge} />
							))}
							<span className="font-label text-xs font-bold uppercase text-text-muted border-2 border-text-muted rounded-flat px-2 py-1">
								{product.origin !== "-" ? product.origin : product.category}
							</span>
						</div>

						<h1 className="font-display text-3xl font-bold md:text-4xl">
							{product.name}
						</h1>

						{product.tastingNotes !== "-" && (
							<p className="mt-2 text-text-muted">{product.tastingNotes}</p>
						)}

						<PriceTag price={product.price} className="mt-4 text-3xl" />

						{/* Options — only for drinks */}
						{product.category === "Minuman RTD" && (
							<div className="mt-8 space-y-5">
								<div>
									<p className="font-display text-sm font-bold mb-2">
										Sugar Level
									</p>
									<div className="flex flex-wrap gap-2">
										{optionButtons(
											[
												{ value: "0", label: "0%" },
												{ value: "25", label: "25%" },
												{ value: "50", label: "50%" },
												{ value: "100", label: "100%" },
											],
											sugar,
											setSugar,
										)}
									</div>
								</div>
								<div>
									<p className="font-display text-sm font-bold mb-2">Suhu</p>
									<div className="flex flex-wrap gap-2">
										{optionButtons(
											[
												{ value: "Hot", label: "Hot" },
												{ value: "Iced", label: "Iced" },
											],
											temp,
											setTemp,
										)}
									</div>
								</div>
								<div>
									<p className="font-display text-sm font-bold mb-2">Ukuran</p>
									<div className="flex flex-wrap gap-2">
										{optionButtons(
											[
												{ value: "Regular", label: "Regular" },
												{ value: "Large", label: "Large" },
											],
											size,
											setSize,
										)}
									</div>
								</div>
							</div>
						)}

						{/* Quantity + CTAs */}
						<div className="mt-8 flex items-center gap-4">
							<QuantityControl value={qty} onChange={setQty} />
						</div>
						<div className="mt-4 flex flex-wrap gap-3">
							<FlatButton
								variant="solid"
								color="primary"
								size="lg"
								onClick={addToCart}
							>
								{added ? "Ditambahkan!" : "Tambah ke Keranjang"}
							</FlatButton>
							<FlatButton
								variant="solid"
								color="dark"
								size="lg"
								onClick={buyNow}
							>
								Beli Sekarang
							</FlatButton>
						</div>

						{/* Tabs */}
						<div className="mt-10">
							<Tabs tabs={tabs} />
						</div>
					</div>
				</div>
			</SectionContainer>

			{/* Related Products */}
			{related.length > 0 && (
				<SectionContainer bg="bg-light-base">
					<h2 className="font-display text-3xl font-bold">Produk Terkait</h2>
					<div className="mt-8 flex gap-6 overflow-x-auto pb-4">
						{related.map((p) => (
							<div key={p.id} className="w-64 shrink-0">
								<ProductCard product={p} />
							</div>
						))}
					</div>
				</SectionContainer>
			)}
		</>
	);
}

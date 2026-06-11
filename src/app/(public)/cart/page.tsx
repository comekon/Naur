"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import EmptyState from "@/components/ui/EmptyState";
import FlatButton from "@/components/ui/FlatButton";
import OrderSummaryCard from "@/components/ui/OrderSummaryCard";
import QuantityControl from "@/components/ui/QuantityControl";
import { products } from "@/data/products";
import { useCart } from "@/store/cart";

export default function CartPage() {
	const {
		items,
		subtotal,
		discount,
		total,
		updateQty,
		removeItem,
		applyVoucher,
		voucherCode,
	} = useCart();
	const [voucherMsg, setVoucherMsg] = useState("");

	const getImage = (item: (typeof items)[number]) =>
		item.image ?? products.find((p) => p.id === item.productId)?.images[0];

	if (items.length === 0) {
		return (
			<SectionContainer>
				<EmptyState
					title="Keranjangmu kosong"
					description="Yuk isi keranjangmu dengan teh terbaik dari Naur!"
					action={
						<Link href="/products">
							<FlatButton variant="solid" color="primary" size="lg">
								Yuk, Belanja!
							</FlatButton>
						</Link>
					}
				/>
			</SectionContainer>
		);
	}

	return (
		<SectionContainer>
			<h1 className="font-display text-4xl font-bold">
				Keranjang ({items.length} item)
			</h1>

			<div className="mt-8 flex flex-col gap-8 lg:flex-row">
				{/* Left: Items */}
				<div className="flex-1 space-y-4">
					{items.map((item) => (
						<div
							key={item.productId}
							className="flex flex-col gap-3 rounded-flat border-2 border-text-dark bg-light-base p-4 sm:flex-row sm:items-center sm:gap-4"
						>
							{/* Thumbnail */}
							<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-flat bg-accent/15">
								{(() => {
									const img = getImage(item);
									return img ? (
										<Image
											src={img}
											alt={item.name}
											fill
											className="object-cover"
											sizes="80px"
										/>
									) : (
										<div className="flex h-full w-full items-center justify-center">
											<svg
												viewBox="0 0 40 40"
												fill="none"
												role="img"
												aria-label="Product thumbnail"
												className="h-8 w-8 opacity-25"
											>
												<rect
													x="6"
													y="10"
													width="28"
													height="22"
													rx="3"
													stroke="#1A1A1A"
													strokeWidth="2"
												/>
											</svg>
										</div>
									);
								})()}
							</div>

							{/* Info */}
							<div className="flex-1 min-w-0">
								<h3 className="font-display text-sm font-bold truncate">
									{item.name}
								</h3>
								<p className="mt-1 text-xs text-text-muted">
									{[
										item.category,
										item.options.sugar && `Sugar ${item.options.sugar}%`,
										item.options.temperature,
										item.options.size,
									]
										.filter(Boolean)
										.join(" · ")}
								</p>
								<p className="mt-1 font-label text-sm font-bold text-primary">
									{new Intl.NumberFormat("id-ID", {
										style: "currency",
										currency: "IDR",
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
									}).format(item.price * item.quantity)}
								</p>
							</div>

							{/* Qty */}
							<QuantityControl
								value={item.quantity}
								onChange={(q) => updateQty(item.productId, q)}
								size="sm"
							/>

							{/* Remove */}
							<button
								type="button"
								onClick={() => removeItem(item.productId)}
								className="shrink-0 p-2 text-text-muted hover:text-primary transition-colors"
								aria-label="Hapus"
							>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round"
									role="img"
									aria-label="Hapus item"
									className="h-5 w-5"
								>
									<line x1="6" y1="6" x2="18" y2="18" />
									<line x1="18" y1="6" x2="6" y2="18" />
								</svg>
							</button>
						</div>
					))}
				</div>

				{/* Right: Summary */}
				<div className="lg:w-80 shrink-0">
					<div className="lg:sticky lg:top-24">
						<OrderSummaryCard
							subtotal={subtotal}
							discount={discount}
							total={total}
							voucherInput={
								<div className="flex gap-2">
									<input
										type="text"
										placeholder="Kode voucher"
										defaultValue={voucherCode}
										onKeyDown={(e) => {
											if (e.key === "Enter")
												applyVoucher((e.target as HTMLInputElement).value);
										}}
										className="flex-1 rounded-flat border-2 border-text-dark px-3 py-2 text-sm font-body focus:outline-none focus:border-primary"
									/>
									<FlatButton
										size="sm"
										onClick={(e) => {
											const input =
												e.currentTarget.parentElement?.querySelector(
													"input",
												) as HTMLInputElement;
											if (input) {
												applyVoucher(input.value);
												setVoucherMsg(
													input.value.toUpperCase() === "NAUR10"
														? "Voucher NAUR10 berhasil diterapkan!"
														: "Kode voucher tidak valid.",
												);
											}
										}}
									>
										Pakai
									</FlatButton>
									{voucherMsg && (
										<p
											className={`mt-2 text-xs font-bold ${voucherMsg.includes("berhasil") ? "text-green-700" : "text-primary"}`}
										>
											{voucherMsg}
										</p>
									)}
								</div>
							}
							action={
								<Link href="/checkout" className="block">
									<FlatButton
										variant="solid"
										color="primary"
										size="lg"
										className="w-full"
									>
										Checkout
									</FlatButton>
								</Link>
							}
						/>
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}

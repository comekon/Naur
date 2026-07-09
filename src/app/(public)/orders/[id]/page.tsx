"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/data/orders";
import { getProductImage } from "@/data/products";
import StatusBadge from "@/components/ui/StatusBadge";
import SectionContainer from "@/components/layout/SectionContainer";

const statusLabels: Record<string, string> = {
	pending: "Menunggu",
	processing: "Diproses",
	shipped: "Dikirim",
	done: "Selesai",
	cancelled: "Dibatalkan",
};

export default function OrderDetailPage() {
	const params = useParams();
	const id = params.id as string;
	const [order, setOrder] =
		useState<ReturnType<typeof getOrderById>>(undefined);

	useEffect(() => {
		setOrder(getOrderById(id));
	}, [id]);

	if (!order) {
		return (
			<SectionContainer>
				<div className="py-20 text-center">
					<h1 className="font-display text-4xl font-bold">
						Transaksi tidak ditemukan
					</h1>
					<Link
						href="/orders"
						className="mt-6 inline-block font-display font-bold text-primary hover:underline"
					>
						&larr; Kembali ke history
					</Link>
				</div>
			</SectionContainer>
		);
	}

	const fmt = (n: number) =>
		new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(n);

	return (
		<SectionContainer>
			{/* Header */}
			<Link
				href="/orders"
				className="font-display text-sm font-bold text-primary hover:underline"
			>
				&larr; History Transaksi
			</Link>
			<div className="mt-4 flex flex-wrap items-center gap-4">
				<h1 className="font-display text-3xl font-bold">{order.id}</h1>
				<StatusBadge status={order.status as any} />
			</div>
			<p className="mt-2 text-sm text-text-muted">
				{new Date(order.createdAt).toLocaleDateString("id-ID", {
					day: "numeric",
					month: "long",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				})}
			</p>

			<div className="mt-8 flex flex-col gap-8 lg:flex-row">
				{/* Left: Timeline + Items */}
				<div className="flex-1 space-y-8">
					{/* Timeline */}
					<div>
						<h2 className="font-display text-xl font-bold mb-6">
							Status Pesanan
						</h2>
						<div className="relative pl-8">
							{/* Vertical line */}
							<div className="absolute left-3 top-2 bottom-2 w-0.5 bg-text-dark/20" />
							{order.timeline.map((entry, i) => (
								<div key={i} className="relative mb-8 last:mb-0">
									{/* Fire icon dot */}
									<div className="absolute -left-5 top-0">
										<svg viewBox="0 0 16 16" fill="none" className="h-6 w-6">
											<path
												d="M8 1C8 1 4 5 4 8a4 4 0 008 0C12 5 8 1 8 1z"
												fill={
													i === order.timeline.length - 1
														? "#E63000"
														: "#1A1A1A"
												}
												stroke="#1A1A1A"
												strokeWidth="1.5"
											/>
										</svg>
									</div>
									<div>
										<p className="font-display text-sm font-bold">
											{statusLabels[entry.status] ?? entry.status}
										</p>
										<p className="text-xs text-text-muted mt-0.5">
											{new Date(entry.timestamp).toLocaleDateString("id-ID", {
												day: "numeric",
												month: "long",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
											})}
										</p>
										{entry.note && (
											<p className="text-sm text-text-muted mt-1">
												{entry.note}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Items */}
					<div>
						<h2 className="font-display text-xl font-bold mb-4">Produk</h2>
						<div className="space-y-3">
							{order.items.map((item) => {
								const img = getProductImage(item.productId);
								return (
									<div
										key={item.productId}
										className="flex items-center justify-between rounded-flat border-2 border-text-dark p-4"
									>
										<div className="flex items-center gap-3">
											<div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-flat bg-accent/20">
												{img ? (
													<Image
														src={img}
														alt={item.name}
														fill
														sizes="48px"
														className="object-cover"
													/>
												) : (
													<svg
														viewBox="0 0 24 24"
														fill="none"
														className="h-6 w-6 opacity-20"
													>
														<rect
															x="3"
															y="6"
															width="18"
															height="14"
															rx="2"
															stroke="#1A1A1A"
															strokeWidth="2"
														/>
													</svg>
												)}
											</div>
											<div>
												<p className="font-display text-sm font-bold">
													{item.name}
												</p>
												<p className="text-xs text-text-muted">
													x{item.quantity}
												</p>
											</div>
										</div>
										<p className="font-label text-sm font-bold">
											{fmt(item.price * item.quantity)}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Right: Info */}
				<div className="lg:w-80 shrink-0 space-y-4">
					<div className="rounded-flat border-2 border-text-dark bg-light-base p-5 shadow-flat">
						<h3 className="font-display text-sm font-bold mb-3">Pengiriman</h3>
						<p className="text-sm text-text-muted">{order.address}</p>
						<p className="mt-2 text-sm">
							<span className="font-bold">Ekspedisi:</span> {order.courier}
						</p>
						{order.trackingNumber && (
							<p className="mt-1 text-sm">
								<span className="font-bold">No. Resi:</span>{" "}
								{order.trackingNumber}
							</p>
						)}
					</div>
					<div className="rounded-flat border-2 border-text-dark bg-light-base p-5 shadow-flat">
						<h3 className="font-display text-sm font-bold mb-3">Pembayaran</h3>
						<p className="text-sm text-text-muted">{order.paymentMethod}</p>
					</div>
					<div className="rounded-flat border-2 border-text-dark bg-light-base p-5 shadow-flat">
						<div className="flex justify-between mb-2">
							<span className="text-sm text-text-muted">Total</span>
							<span className="font-label text-xl font-bold text-primary">
								{fmt(order.total)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}

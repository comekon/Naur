"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import EmptyState from "@/components/ui/EmptyState";
import FlatButton from "@/components/ui/FlatButton";
import StatusBadge from "@/components/ui/StatusBadge";
import { getOrdersByUserId } from "@/data/orders";
import { getProductImage } from "@/data/products";
import { cn } from "@/lib/cn";
import { useAuth } from "@/store/auth";
import type { OrderStatus } from "@/types/order";

const statusFilters = [
	"Semua",
	"Menunggu",
	"Diproses",
	"Dikirim",
	"Selesai",
	"Dibatalkan",
] as const;

const statusMap: Record<string, OrderStatus> = {
	Menunggu: "pending",
	Diproses: "processing",
	Dikirim: "shipped",
	Selesai: "done",
	Dibatalkan: "cancelled",
};

const statusActionLabels: Record<
	OrderStatus,
	{ label: string; color: "primary" | "dark" | "accent" }
> = {
	pending: { label: "Bayar", color: "primary" },
	processing: { label: "Lacak", color: "dark" },
	shipped: { label: "Lacak", color: "dark" },
	done: { label: "Ulas", color: "accent" },
	cancelled: { label: "Pesan Lagi", color: "dark" },
};

export default function OrdersPage() {
	const { user } = useAuth();
	const router = useRouter();
	const [filter, setFilter] = useState("Semua");
	const [orders, setOrders] = useState<ReturnType<typeof getOrdersByUserId>>(
		[],
	);

	useEffect(() => {
		if (!user) {
			router.push("/login");
			return;
		}
		setOrders(getOrdersByUserId(user.id));
	}, [user, router]);

	const filtered = useMemo(() => {
		if (filter === "Semua") return orders;
		const status = statusMap[filter];
		return orders.filter((o) => o.status === status);
	}, [orders, filter]);

	const fmt = (n: number) =>
		new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(n);

	const statusCount = useMemo(() => {
		const counts: Record<string, number> = { Semua: orders.length };
		for (const f of statusFilters) {
			if (f === "Semua") continue;
			const s = statusMap[f];
			counts[f] = orders.filter((o) => o.status === s).length;
		}
		return counts;
	}, [orders]);

	const handleAction = (orderId: string, status: OrderStatus) => {
		if (status === "pending") {
			alert("Redirect ke pembayaran... (mock)");
		} else if (status === "shipped" || status === "processing") {
			router.push(`/orders/${orderId}`);
		} else if (status === "done") {
			alert("Redirect ke form ulasan... (mock)");
		} else if (status === "cancelled") {
			router.push("/products");
		}
	};

	if (!user) return null;

	return (
		<SectionContainer>
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-display text-4xl font-bold">History Transaksi</h1>
					<p className="mt-2 text-text-muted">{orders.length} transaksi</p>
				</div>
			</div>

			{/* Tabs */}
			<div className="mt-8 flex gap-0 border-b-2 border-text-dark overflow-x-auto">
				{statusFilters.map((f) => (
					<button
						type="button"
						key={f}
						onClick={() => setFilter(f)}
						className={cn(
							"relative px-4 py-3 font-display text-sm font-bold whitespace-nowrap transition-colors border-b-4 -mb-[2px]",
							filter === f
								? "border-primary text-primary"
								: "border-transparent text-text-muted hover:text-text-dark",
						)}
					>
						{f}
						{statusCount[f] > 0 && (
							<span
								className={cn(
									"ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 font-label text-xs font-bold",
									filter === f
										? "bg-primary text-text-light"
										: "bg-text-dark/10 text-text-muted",
								)}
							>
								{statusCount[f]}
							</span>
						)}
					</button>
				))}
			</div>

			{/* Orders */}
			{filtered.length === 0 ? (
				<EmptyState
					title="Belum ada transaksi"
					description="Yuk mulai belanja teh terbaik dari Naur!"
					action={
						<Link href="/products">
							<FlatButton variant="solid" color="primary" size="lg">
								Belanja Sekarang
							</FlatButton>
						</Link>
					}
				/>
			) : (
				<div className="mt-8 space-y-4">
					{filtered.map((order) => {
						const action = statusActionLabels[order.status];
						return (
							<div
								key={order.id}
								className="rounded-flat border-2 border-text-dark bg-light-base shadow-flat hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
							>
								{/* Order header */}
								<div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
									<div className="flex-1">
										<div className="flex flex-wrap items-center gap-3">
											<span className="font-label text-sm font-bold">
												{order.id}
											</span>
											<StatusBadge status={order.status} />
										</div>
										<p className="mt-1 text-sm text-text-muted">
											{new Date(order.createdAt).toLocaleDateString("id-ID", {
												day: "numeric",
												month: "long",
												year: "numeric",
											})}
										</p>
									</div>
									<div className="text-right shrink-0">
										<p className="font-label text-lg font-bold text-primary">
											{fmt(order.total)}
										</p>
										<p className="text-xs text-text-muted">
											{order.items.length} item
										</p>
									</div>
								</div>

								{/* Products preview */}
								<div className="border-t-2 border-text-dark/10 px-5 py-3">
									<div className="flex flex-wrap items-center gap-2">
										{order.items.slice(0, 3).map((item) => {
											const img = getProductImage(item.productId);
											return (
												<span
													key={item.productId}
													className="flex items-center gap-2 rounded-flat border-2 border-text-dark/20 bg-light-base px-3 py-1.5 text-xs"
												>
													<span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-flat bg-accent/20">
														{img ? (
															<Image
																src={img}
																alt={item.name}
																fill
																sizes="32px"
																className="object-cover"
															/>
														) : (
															<svg
																viewBox="0 0 16 16"
																fill="none"
																className="h-3 w-3 opacity-30"
																aria-hidden="true"
															>
																<title>Produk</title>
																<rect
																	x="2"
																	y="4"
																	width="12"
																	height="9"
																	rx="1.5"
																	stroke="#1A1A1A"
																	strokeWidth="1.5"
																/>
															</svg>
														)}
													</span>
													<span className="font-bold">{item.name}</span>
													<span className="text-text-muted">
														x{item.quantity}
													</span>
												</span>
											);
										})}
										{order.items.length > 3 && (
											<span className="rounded-flat bg-text-dark/5 px-3 py-1.5 font-label text-xs font-bold text-text-muted">
												+{order.items.length - 3} lagi
											</span>
										)}
									</div>
								</div>

								{/* Action bar */}
								<div className="flex items-center justify-between border-t-2 border-text-dark/10 px-5 py-3">
									<p className="text-xs text-text-muted">
										{order.paymentMethod} · {order.courier}
									</p>
									<div className="flex items-center gap-3">
										<FlatButton
											variant="solid"
											color={action.color}
											size="sm"
											onClick={() => handleAction(order.id, order.status)}
										>
											{action.label}
										</FlatButton>
										<Link href={`/orders/${order.id}`}>
											<FlatButton variant="ghost" color="dark" size="sm">
												Detail →
											</FlatButton>
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</SectionContainer>
	);
}

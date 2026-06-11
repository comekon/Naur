"use client";

import { useMemo, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import FlatButton from "@/components/ui/FlatButton";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { mockOrders } from "@/data/orders";
import { cn } from "@/lib/cn";
import type { Order, OrderStatus } from "@/types/order";

const fmt = (n: number) =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(n);

const statusFilters = [
	"Semua",
	"pending",
	"processing",
	"shipped",
	"done",
	"cancelled",
] as const;

const statusLabels: Record<string, string> = {
	pending: "Menunggu",
	processing: "Diproses",
	shipped: "Dikirim",
	done: "Selesai",
	cancelled: "Dibatalkan",
};

const paymentMethods = [
	"Semua",
	"Transfer Bank",
	"Virtual Account",
	"E-Wallet",
	"QRIS",
	"COD",
];

export default function AdminTransactionsPage() {
	const [statusFilter, setStatusFilter] = useState("Semua");
	const [paymentFilter, setPaymentFilter] = useState("Semua");
	const [search, setSearch] = useState("");
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [newStatus, setNewStatus] = useState<OrderStatus>("pending");
	const [trackingNo, setTrackingNo] = useState("");

	const filtered = useMemo(() => {
		return mockOrders.filter((o) => {
			if (statusFilter !== "Semua" && o.status !== statusFilter) return false;
			if (paymentFilter !== "Semua" && o.paymentMethod !== paymentFilter)
				return false;
			if (search && !o.id.toLowerCase().includes(search.toLowerCase()))
				return false;
			if (dateFrom && new Date(o.createdAt) < new Date(dateFrom)) return false;
			if (dateTo && new Date(o.createdAt) > new Date(`${dateTo}T23:59:59`))
				return false;
			return true;
		});
	}, [statusFilter, paymentFilter, search, dateFrom, dateTo]);

	const columns = [
		{
			key: "id",
			label: "No. Order",
			render: (val: string) => (
				<span className="font-label font-bold">{val}</span>
			),
		},
		{
			key: "userId",
			label: "Pembeli",
			render: (_val: string, row: Order) => (
				<div className="flex items-center gap-2">
					<div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-text-light font-display text-xs font-bold shrink-0">
						{row.id === "ORD-002" ? "R" : "U"}
					</div>
					<span className="text-sm font-bold">
						{row.id === "ORD-002" ? "Rina Sari" : "User Demo"}
					</span>
				</div>
			),
		},
		{
			key: "total",
			label: "Total",
			render: (val: number) => (
				<span className="font-label font-bold">{fmt(val)}</span>
			),
		},
		{
			key: "paymentMethod",
			label: "Metode",
			render: (val: string) => (
				<span className="font-label text-xs">{val}</span>
			),
		},
		{
			key: "status",
			label: "Status",
			render: (val: string) => <StatusBadge status={val as OrderStatus} />,
		},
		{
			key: "createdAt",
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

	const handleOpenDetail = (order: Order) => {
		setSelectedOrder(order);
		setNewStatus(order.status);
		setTrackingNo(order.trackingNumber ?? "");
	};

	const handleUpdateStatus = () => {
		alert(
			`Status ${selectedOrder?.id} diubah ke "${statusLabels[newStatus]}"${trackingNo ? `, resi: ${trackingNo}` : ""} (mock)`,
		);
		setSelectedOrder(null);
		setNewStatus("pending");
		setTrackingNo("");
	};

	return (
		<div>
			{/* Page Header */}
			<div className="mb-6">
				<h1 className="font-display text-2xl font-bold">Kelola Transaksi</h1>
				<p className="text-sm text-text-muted mt-1">
					Pantau dan kelola semua pesanan masuk.
				</p>
			</div>

			{/* Filters */}
			<div className="space-y-4 mb-6">
				{/* Row 1: Status + Payment */}
				<div className="flex flex-wrap gap-4 items-center">
					<div className="flex flex-wrap gap-2">
						{statusFilters.map((s) => (
							<button
								type="button"
								key={s}
								onClick={() => setStatusFilter(s)}
								className={cn(
									"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold capitalize",
									statusFilter === s && "bg-text-dark text-text-light",
								)}
							>
								{s === "Semua" ? "Semua" : (statusLabels[s] ?? s)}
							</button>
						))}
					</div>
					<span className="w-px h-6 bg-text-dark/20 hidden sm:block" />
					<div className="flex flex-wrap gap-2">
						{paymentMethods.map((m) => (
							<button
								type="button"
								key={m}
								onClick={() => setPaymentFilter(m)}
								className={cn(
									"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
									paymentFilter === m && "bg-primary text-text-light",
								)}
							>
								{m}
							</button>
						))}
					</div>
				</div>

				{/* Row 2: Search + Date range */}
				<div className="flex flex-wrap gap-3 items-center">
					<input
						type="text"
						placeholder="Cari no. order..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="max-w-xs rounded-flat border-2 border-text-dark px-3 py-2 text-sm focus:outline-none focus:border-primary"
					/>
					<span className="w-px h-6 bg-text-dark/20 hidden sm:block" />
					<div className="flex items-center gap-2">
						<span className="font-display text-xs font-bold text-text-muted">
							Dari:
						</span>
						<input
							type="date"
							value={dateFrom}
							onChange={(e) => setDateFrom(e.target.value)}
							className="rounded-flat border-2 border-text-dark px-3 py-2 text-sm focus:outline-none focus:border-primary"
						/>
					</div>
					<div className="flex items-center gap-2">
						<span className="font-display text-xs font-bold text-text-muted">
							Sampai:
						</span>
						<input
							type="date"
							value={dateTo}
							onChange={(e) => setDateTo(e.target.value)}
							className="rounded-flat border-2 border-text-dark px-3 py-2 text-sm focus:outline-none focus:border-primary"
						/>
					</div>
					{(dateFrom ||
						dateTo ||
						search ||
						statusFilter !== "Semua" ||
						paymentFilter !== "Semua") && (
						<button
							type="button"
							onClick={() => {
								setStatusFilter("Semua");
								setPaymentFilter("Semua");
								setSearch("");
								setDateFrom("");
								setDateTo("");
							}}
							className="text-xs font-bold text-primary hover:underline"
						>
							Reset Filter
						</button>
					)}
					<div className="ml-auto">
						<p className="text-sm text-text-muted">
							{filtered.length} transaksi
						</p>
					</div>
				</div>
			</div>

			{/* Data Table */}
			<DataTable
				columns={columns}
				rows={filtered}
				actions={(row: Order) => (
					<button
						type="button"
						onClick={() => handleOpenDetail(row)}
						className="text-xs font-bold text-secondary hover:underline"
					>
						Detail
					</button>
				)}
			/>

			{/* Detail Modal */}
			<Modal
				open={!!selectedOrder}
				onClose={() => setSelectedOrder(null)}
				title="Detail Transaksi"
				size="lg"
			>
				{selectedOrder && (
					<div className="space-y-6">
						{/* Order info grid */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-xs text-text-muted font-label">No. Order</p>
								<p className="font-label font-bold mt-0.5">
									{selectedOrder.id}
								</p>
							</div>
							<div>
								<p className="text-xs text-text-muted font-label">Pembeli</p>
								<p className="font-bold mt-0.5">
									{selectedOrder.id === "ORD-002" ? "Rina Sari" : "User Demo"}
								</p>
							</div>
							<div>
								<p className="text-xs text-text-muted font-label">Total</p>
								<p className="font-label text-lg font-bold text-primary mt-0.5">
									{fmt(selectedOrder.total)}
								</p>
							</div>
							<div>
								<p className="text-xs text-text-muted font-label">Status</p>
								<div className="mt-0.5">
									<StatusBadge status={selectedOrder.status} />
								</div>
							</div>
							<div>
								<p className="text-xs text-text-muted font-label">
									Metode Bayar
								</p>
								<p className="text-sm mt-0.5">{selectedOrder.paymentMethod}</p>
							</div>
							<div>
								<p className="text-xs text-text-muted font-label">Ekspedisi</p>
								<p className="text-sm mt-0.5">{selectedOrder.courier}</p>
							</div>
						</div>

						{/* Address */}
						<div className="rounded-flat border-2 border-text-dark/20 p-4">
							<p className="font-display text-sm font-bold mb-1">
								Alamat Pengiriman
							</p>
							<p className="text-sm text-text-muted">{selectedOrder.address}</p>
						</div>

						{/* Timeline */}
						<div>
							<p className="font-display text-sm font-bold mb-4">
								Timeline Pesanan
							</p>
							<div className="relative pl-8">
								<div className="absolute left-3 top-2 bottom-2 w-0.5 bg-text-dark/20" />
								{selectedOrder.timeline.map((entry, i) => (
									<div
										key={entry.status + entry.timestamp}
										className="relative mb-6 last:mb-0"
									>
										<div className="absolute -left-5 top-0">
											<svg
												viewBox="0 0 16 16"
												fill="none"
												className="h-6 w-6"
												aria-hidden="true"
											>
												<title>
													{statusLabels[entry.status] ?? entry.status}
												</title>
												<path
													d="M8 1C8 1 4 5 4 8a4 4 0 008 0C12 5 8 1 8 1z"
													fill={
														i === selectedOrder.timeline.length - 1
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

						{/* Products */}
						<div>
							<p className="font-display text-sm font-bold mb-3">Produk</p>
							<div className="space-y-2">
								{selectedOrder.items.map((item) => (
									<div
										key={item.productId}
										className="flex items-center justify-between rounded-flat border-2 border-text-dark/20 p-3"
									>
										<div className="flex items-center gap-3">
											<div className="flex h-10 w-10 items-center justify-center rounded-flat bg-accent/10 shrink-0">
												<svg
													viewBox="0 0 24 24"
													fill="none"
													className="h-4 w-4 opacity-20"
													aria-hidden="true"
												>
													<title>Produk</title>
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
											</div>
											<div>
												<p className="text-sm font-bold">{item.name}</p>
												<p className="text-xs text-text-muted">
													x{item.quantity}
												</p>
											</div>
										</div>
										<p className="font-label text-sm font-bold">
											{fmt(item.price * item.quantity)}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Price breakdown */}
						<div className="rounded-flat border-2 border-text-dark bg-light-base p-4">
							<div className="flex justify-between text-sm">
								<span className="text-text-muted">
									Subtotal ({selectedOrder.items.length} item)
								</span>
								<span className="font-label font-bold">
									{fmt(selectedOrder.total)}
								</span>
							</div>
							<div className="flex justify-between text-sm mt-2">
								<span className="text-text-muted">Ongkos kirim</span>
								<span className="font-label font-bold">Gratis</span>
							</div>
							<div className="border-t-2 border-text-dark/10 mt-3 pt-3 flex justify-between">
								<span className="font-display font-bold">Total</span>
								<span className="font-label text-lg font-bold text-primary">
									{fmt(selectedOrder.total)}
								</span>
							</div>
						</div>

						{/* Update Status */}
						<div className="border-t-2 border-text-dark/10 pt-5 space-y-4">
							<p className="font-display text-sm font-bold">Update Status</p>
							<div>
								<select
									value={newStatus}
									onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
									className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
								>
									<option value="pending">Menunggu</option>
									<option value="processing">Diproses</option>
									<option value="shipped">Dikirim</option>
									<option value="done">Selesai</option>
									<option value="cancelled">Dibatalkan</option>
								</select>
							</div>
							{newStatus === "shipped" && (
								<div>
									<label
										htmlFor="tracking-no"
										className="block text-sm font-bold mb-1"
									>
										Nomor Resi
									</label>
									<input
										type="text"
										value={trackingNo}
										onChange={(e) => setTrackingNo(e.target.value)}
										placeholder="Masukkan nomor resi"
										className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
									/>
								</div>
							)}
							<FlatButton
								type="button"
								variant="solid"
								color="primary"
								size="md"
								onClick={handleUpdateStatus}
							>
								Update Status
							</FlatButton>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}

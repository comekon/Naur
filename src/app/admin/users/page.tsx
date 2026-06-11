"use client";

import { useMemo, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import FlatButton from "@/components/ui/FlatButton";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { mockOrders } from "@/data/orders";
import { cn } from "@/lib/cn";
import type { OrderStatus } from "@/types/order";

interface MockUser {
	id: string;
	name: string;
	email: string;
	role: "user" | "admin";
	totalOrders: number;
	status: "active" | "inactive";
	joinedAt: string;
}

const mockUsers: MockUser[] = [
	{
		id: "u1",
		name: "User Demo",
		email: "user@naur.id",
		role: "user",
		totalOrders: 8,
		status: "active",
		joinedAt: "2026-01-15",
	},
	{
		id: "u2",
		name: "Admin Naur",
		email: "admin@naur.id",
		role: "admin",
		totalOrders: 0,
		status: "active",
		joinedAt: "2026-01-01",
	},
	{
		id: "u3",
		name: "Rina Sari",
		email: "rina@mail.com",
		role: "user",
		totalOrders: 3,
		status: "active",
		joinedAt: "2026-02-20",
	},
	{
		id: "u4",
		name: "Budi Pratama",
		email: "budi@mail.com",
		role: "user",
		totalOrders: 5,
		status: "active",
		joinedAt: "2026-03-05",
	},
	{
		id: "u5",
		name: "Sari Dewi",
		email: "sari@mail.com",
		role: "user",
		totalOrders: 1,
		status: "inactive",
		joinedAt: "2026-02-10",
	},
	{
		id: "u6",
		name: "Arief Rahman",
		email: "arief@mail.com",
		role: "user",
		totalOrders: 12,
		status: "active",
		joinedAt: "2026-01-22",
	},
	{
		id: "u7",
		name: "Dina Putri",
		email: "dina@mail.com",
		role: "user",
		totalOrders: 2,
		status: "active",
		joinedAt: "2026-04-01",
	},
	{
		id: "u8",
		name: "Hendra Wijaya",
		email: "hendra@mail.com",
		role: "user",
		totalOrders: 0,
		status: "inactive",
		joinedAt: "2026-03-15",
	},
	{
		id: "u9",
		name: "Lisa Andini",
		email: "lisa@mail.com",
		role: "user",
		totalOrders: 7,
		status: "active",
		joinedAt: "2026-01-30",
	},
	{
		id: "u10",
		name: "Yoga Pratama",
		email: "yoga@mail.com",
		role: "user",
		totalOrders: 4,
		status: "active",
		joinedAt: "2026-02-28",
	},
];

const fmt = (n: number) =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(n);

export default function AdminUsersPage() {
	const [roleFilter, setRoleFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState<"" | "active" | "inactive">(
		"",
	);
	const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
	const [detailTab, setDetailTab] = useState<"orders" | "activity">("orders");

	const filtered = useMemo(() => {
		let result = mockUsers;
		if (roleFilter) result = result.filter((u) => u.role === roleFilter);
		if (statusFilter) result = result.filter((u) => u.status === statusFilter);
		return result;
	}, [roleFilter, statusFilter]);

	const userOrders = useMemo(() => {
		if (!selectedUser) return [];
		return mockOrders.filter((o) => o.userId === selectedUser.id);
	}, [selectedUser]);

	const totalSpent = useMemo(
		() => userOrders.reduce((s, o) => s + o.total, 0),
		[userOrders],
	);

	const columns = [
		{
			key: "name",
			label: "Nama",
			render: (val: string) => (
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-text-light font-display text-xs font-bold shrink-0">
						{val.charAt(0)}
					</div>
					<div>
						<span className="font-bold text-sm block">{val}</span>
					</div>
				</div>
			),
		},
		{
			key: "email",
			label: "Email",
			render: (val: string) => (
				<span className="font-label text-xs">{val}</span>
			),
		},
		{
			key: "role",
			label: "Role",
			render: (val: string) => (
				<span
					className={cn(
						"px-2 py-1 rounded-flat font-label text-xs font-bold border-2 border-text-dark",
						val === "admin" ? "bg-primary text-text-light" : "bg-light-base",
					)}
				>
					{val}
				</span>
			),
		},
		{
			key: "totalOrders",
			label: "Total Order",
			render: (val: number) => (
				<span className="font-label text-sm font-bold">{val}</span>
			),
		},
		{
			key: "joinedAt",
			label: "Bergabung",
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
		{
			key: "status",
			label: "Status",
			render: (val: string) => (
				<span
					className={cn(
						"px-2 py-1 rounded-flat font-label text-xs font-bold border-2 border-text-dark",
						val === "active"
							? "bg-accent text-text-dark"
							: "bg-light-base text-text-muted",
					)}
				>
					{val === "active" ? "Aktif" : "Nonaktif"}
				</span>
			),
		},
	];

	return (
		<div>
			{/* Page Header */}
			<div className="mb-6">
				<h1 className="font-display text-2xl font-bold">Kelola Pengguna</h1>
				<p className="text-sm text-text-muted mt-1">
					Lihat dan kelola semua pengguna terdaftar.
				</p>
			</div>

			{/* Filters */}
			<div className="flex flex-wrap gap-4 mb-6">
				<div className="flex gap-2">
					<span className="font-display text-xs font-bold text-text-muted self-center mr-1">
						Role:
					</span>
					<button
						type="button"
						onClick={() => setRoleFilter("")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							!roleFilter && "bg-text-dark text-text-light",
						)}
					>
						Semua
					</button>
					<button
						type="button"
						onClick={() => setRoleFilter("user")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							roleFilter === "user" && "bg-text-dark text-text-light",
						)}
					>
						User
					</button>
					<button
						type="button"
						onClick={() => setRoleFilter("admin")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							roleFilter === "admin" && "bg-text-dark text-text-light",
						)}
					>
						Admin
					</button>
				</div>
				<div className="flex gap-2">
					<span className="font-display text-xs font-bold text-text-muted self-center mr-1">
						Status:
					</span>
					<button
						type="button"
						onClick={() => setStatusFilter("")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							!statusFilter && "bg-text-dark text-text-light",
						)}
					>
						Semua
					</button>
					<button
						type="button"
						onClick={() => setStatusFilter("active")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							statusFilter === "active" && "bg-accent text-text-dark",
						)}
					>
						Aktif
					</button>
					<button
						type="button"
						onClick={() => setStatusFilter("inactive")}
						className={cn(
							"px-3 py-1.5 rounded-flat border-2 border-text-dark font-display text-xs font-bold",
							statusFilter === "inactive" && "bg-text-muted text-text-light",
						)}
					>
						Nonaktif
					</button>
				</div>
				<div className="ml-auto">
					<p className="text-sm text-text-muted">{filtered.length} pengguna</p>
				</div>
			</div>

			{/* Data Table */}
			<DataTable
				columns={columns}
				rows={filtered}
				actions={(row: MockUser) => (
					<button
						type="button"
						onClick={() => {
							setSelectedUser(row);
							setDetailTab("orders");
						}}
						className="text-xs font-bold text-secondary hover:underline"
					>
						Detail
					</button>
				)}
			/>

			{/* Detail Modal */}
			<Modal
				open={!!selectedUser}
				onClose={() => setSelectedUser(null)}
				title="Detail Pengguna"
				size="lg"
			>
				{selectedUser && (
					<div className="space-y-6">
						{/* User info header */}
						<div className="flex items-start gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-text-light font-display text-2xl font-bold shrink-0">
								{selectedUser.name.charAt(0)}
							</div>
							<div className="flex-1">
								<h3 className="font-display text-xl font-bold">
									{selectedUser.name}
								</h3>
								<p className="text-sm text-text-muted">{selectedUser.email}</p>
								<div className="flex items-center gap-3 mt-2">
									<span
										className={cn(
											"px-2 py-0.5 rounded-flat font-label text-xs font-bold border-2 border-text-dark",
											selectedUser.role === "admin"
												? "bg-primary text-text-light"
												: "bg-light-base",
										)}
									>
										{selectedUser.role}
									</span>
									<span
										className={cn(
											"px-2 py-0.5 rounded-flat font-label text-xs font-bold border-2 border-text-dark",
											selectedUser.status === "active"
												? "bg-accent text-text-dark"
												: "bg-light-base text-text-muted",
										)}
									>
										{selectedUser.status === "active" ? "Aktif" : "Nonaktif"}
									</span>
									<span className="text-xs text-text-muted">
										Bergabung{" "}
										{new Date(selectedUser.joinedAt).toLocaleDateString(
											"id-ID",
											{ month: "long", year: "numeric" },
										)}
									</span>
								</div>
							</div>
						</div>

						{/* Stats row */}
						<div className="grid grid-cols-3 gap-3">
							<div className="rounded-flat border-2 border-text-dark bg-primary/5 p-4 text-center">
								<p className="font-display text-2xl font-bold">
									{userOrders.length}
								</p>
								<p className="font-label text-xs text-text-muted">Order</p>
							</div>
							<div className="rounded-flat border-2 border-text-dark bg-secondary/5 p-4 text-center">
								<p className="font-display text-2xl font-bold">
									{fmt(totalSpent)}
								</p>
								<p className="font-label text-xs text-text-muted">
									Total Belanja
								</p>
							</div>
							<div className="rounded-flat border-2 border-text-dark bg-accent/5 p-4 text-center">
								<p className="font-display text-2xl font-bold">
									{userOrders.filter((o) => o.status === "done").length}
								</p>
								<p className="font-label text-xs text-text-muted">Selesai</p>
							</div>
						</div>

						{/* Tabs */}
						<div className="flex gap-0 border-b-2 border-text-dark">
							<button
								type="button"
								onClick={() => setDetailTab("orders")}
								className={cn(
									"px-4 py-2 font-display text-sm font-bold border-b-4 -mb-[2px]",
									detailTab === "orders"
										? "border-primary text-primary"
										: "border-transparent text-text-muted",
								)}
							>
								Riwayat Order
							</button>
							<button
								type="button"
								onClick={() => setDetailTab("activity")}
								className={cn(
									"px-4 py-2 font-display text-sm font-bold border-b-4 -mb-[2px]",
									detailTab === "activity"
										? "border-primary text-primary"
										: "border-transparent text-text-muted",
								)}
							>
								Aktivitas
							</button>
						</div>

						{/* Tab content */}
						{detailTab === "orders" && (
							<div>
								{userOrders.length === 0 ? (
									<div className="py-8 text-center text-sm text-text-muted">
										Belum ada riwayat order.
									</div>
								) : (
									<div className="space-y-3">
										{userOrders.map((order) => (
											<div
												key={order.id}
												className="flex items-center justify-between rounded-flat border-2 border-text-dark/20 p-3 hover:bg-light-base transition-colors"
											>
												<div className="flex items-center gap-3">
													<span className="font-label text-sm font-bold">
														{order.id}
													</span>
													<StatusBadge status={order.status as OrderStatus} />
												</div>
												<div className="flex items-center gap-4">
													<span className="text-xs text-text-muted">
														{new Date(order.createdAt).toLocaleDateString(
															"id-ID",
															{
																day: "numeric",
																month: "short",
																year: "numeric",
															},
														)}
													</span>
													<span className="font-label text-sm font-bold">
														{fmt(order.total)}
													</span>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						{detailTab === "activity" && (
							<div className="space-y-3">
								<div className="flex items-center gap-3 rounded-flat border-2 border-text-dark/20 p-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/30 shrink-0">
										<svg
											viewBox="0 0 16 16"
											fill="none"
											className="h-4 w-4"
											aria-hidden="true"
										>
											<title>Login</title>
											<path d="M6 1v5H3l5 5 5-5h-3V1H6z" fill="#1A1A1A" />
										</svg>
									</div>
									<div>
										<p className="text-sm font-bold">Login ke akun</p>
										<p className="text-xs text-text-muted">
											Terakhir{" "}
											{new Date(selectedUser.joinedAt).toLocaleDateString(
												"id-ID",
											)}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3 rounded-flat border-2 border-text-dark/20 p-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
										<svg
											viewBox="0 0 16 16"
											fill="none"
											className="h-4 w-4"
											aria-hidden="true"
										>
											<title>Order</title>
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
									</div>
									<div>
										<p className="text-sm font-bold">
											{selectedUser.totalOrders} order telah dibuat
										</p>
										<p className="text-xs text-text-muted">Sejak bergabung</p>
									</div>
								</div>
								<div className="flex items-center gap-3 rounded-flat border-2 border-text-dark/20 p-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 shrink-0">
										<svg
											viewBox="0 0 16 16"
											fill="none"
											className="h-4 w-4"
											aria-hidden="true"
										>
											<title>Ulasan</title>
											<path
												d="M8 1l2.2 4.6 5 .7-3.6 3.5.9 5L8 12.4 3.5 14.8l.9-5L.8 6.3l5-.7L8 1z"
												stroke="#1A1A1A"
												strokeWidth="1.2"
												fill="none"
											/>
										</svg>
									</div>
									<div>
										<p className="text-sm font-bold">Belum ada ulasan</p>
										<p className="text-xs text-text-muted">
											User ini belum memberikan ulasan
										</p>
									</div>
								</div>
							</div>
						)}

						{/* Actions */}
						<div className="flex gap-3 pt-2 border-t-2 border-text-dark/10">
							<FlatButton
								type="button"
								variant="outline"
								color={selectedUser.status === "active" ? "primary" : "dark"}
								size="sm"
								onClick={() => {
									alert(
										`${selectedUser.status === "active" ? "Menonaktifkan" : "Mengaktifkan"} akun ${selectedUser.name} (mock)`,
									);
									setSelectedUser(null);
								}}
							>
								{selectedUser.status === "active" ? "Nonaktifkan" : "Aktifkan"}{" "}
								Akun
							</FlatButton>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}

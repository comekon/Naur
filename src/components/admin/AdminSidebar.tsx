"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const menuItems = [
	{ href: "/admin", label: "Dashboard", icon: "📊" },
	{ href: "/admin/articles", label: "Kelola Artikel", icon: "✍️" },
	{ href: "/admin/products", label: "Kelola Produk", icon: "📦" },
	{ href: "/admin/users", label: "Kelola Pengguna", icon: "👥" },
	{ href: "/admin/transactions", label: "Kelola Transaksi", icon: "💰" },
];

function NavList({
	pathname,
	onNavigate,
}: {
	pathname: string;
	onNavigate?: () => void;
}) {
	return (
		<nav className="flex-1 py-6">
			{menuItems.map((item) => {
				const isActive =
					pathname === item.href ||
					(item.href !== "/admin" && pathname.startsWith(item.href));
				return (
					<Link
						key={item.href}
						href={item.href}
						onClick={onNavigate}
						className={cn(
							"flex items-center gap-3 px-6 py-3 font-display text-sm font-bold transition-colors",
							isActive
								? "bg-primary text-text-light"
								: "hover:bg-text-dark/80 text-text-light/70",
						)}
					>
						<span className="text-base">{item.icon}</span>
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}

export default function AdminSidebar({
	open = false,
	onClose,
}: {
	open?: boolean;
	onClose?: () => void;
}) {
	const pathname = usePathname();

	return (
		<>
			{/* Desktop — always visible column */}
			<aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 shrink-0 flex-col self-start bg-text-dark text-text-light md:flex">
				<NavList pathname={pathname} />
			</aside>

			{/* Mobile — slide-in drawer with overlay */}
			<div
				onClick={onClose}
				aria-hidden="true"
				className={cn(
					"fixed inset-0 top-[65px] z-40 bg-black/50 transition-opacity md:hidden",
					open ? "opacity-100" : "pointer-events-none opacity-0",
				)}
			/>
			<aside
				className={cn(
					"fixed left-0 top-[65px] z-50 flex h-[calc(100vh-65px)] w-64 flex-col bg-text-dark text-text-light transition-transform duration-200 md:hidden",
					open ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<NavList pathname={pathname} onNavigate={onClose} />
			</aside>
		</>
	);
}

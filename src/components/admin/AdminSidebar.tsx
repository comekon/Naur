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

export default function AdminSidebar() {
	const pathname = usePathname();

	return (
		<aside className="flex w-64 shrink-0 flex-col bg-text-dark text-text-light sticky top-[65px] self-start h-[calc(100vh-65px)]">
			<nav className="flex-1 py-6">
				{menuItems.map((item) => {
					const isActive =
						pathname === item.href ||
						(item.href !== "/admin" && pathname.startsWith(item.href));
					return (
						<Link
							key={item.href}
							href={item.href}
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
		</aside>
	);
}

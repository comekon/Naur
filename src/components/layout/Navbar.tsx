"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FlatButton from "@/components/ui/FlatButton";
import SearchModal from "@/components/ui/SearchModal";
import { cn } from "@/lib/cn";
import { useAuth } from "@/store/auth";
import { useCart } from "@/store/cart";

/* ── Inline SVG Icons ── */

function FlameIcon({ className }: { className?: string }) {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 32 32"
			fill="none"
			className={className}
		>
			<path
				d="M16 2C16 2 6 12 6 20a10 10 0 0020 0C26 12 16 2 16 2z"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinejoin="round"
				fill="none"
			/>
			<path
				d="M16 14c0 0-4 4-4 8a4 4 0 008 0c0-4-4-8-4-8z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinejoin="round"
				fill="currentColor"
				opacity="0.25"
			/>
		</svg>
	);
}

function SearchIcon({ className }: { className?: string }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			className={className}
		>
			<circle cx="11" cy="11" r="7" />
			<line x1="16.5" y1="16.5" x2="21" y2="21" />
		</svg>
	);
}

function CartIcon({ className }: { className?: string }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="M6 7h14l-1.5 9H7.5L6 7z" />
			<path d="M1 2h4l1 5" />
			<circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
			<circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none" />
		</svg>
	);
}

function MenuIcon({ className }: { className?: string }) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			className={className}
		>
			<line x1="4" y1="6" x2="20" y2="6" />
			<line x1="4" y1="12" x2="20" y2="12" />
			<line x1="4" y1="18" x2="20" y2="18" />
		</svg>
	);
}

function CloseIcon({ className }: { className?: string }) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			className={className}
		>
			<line x1="6" y1="6" x2="18" y2="18" />
			<line x1="18" y1="6" x2="6" y2="18" />
		</svg>
	);
}

function UserDropdown() {
	const { user, logout } = useAuth();
	const [show, setShow] = useState(false);

	if (!user) return null;

	return (
		<div className="relative">
			<button
				onClick={() => setShow(!show)}
				className="flex items-center gap-2 p-2 rounded-flat hover:bg-accent/20 transition-colors"
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-text-light font-display text-sm font-bold">
					{user.name.charAt(0).toUpperCase()}
				</div>
			</button>
			{show && (
				<div className="absolute right-0 top-12 z-50 w-48 rounded-flat border-2 border-text-dark bg-light-base shadow-flat py-2">
					<div className="px-4 py-2 border-b border-text-dark/10">
						<p className="font-display text-sm font-bold">{user.name}</p>
						<p className="text-xs text-text-muted">{user.email}</p>
					</div>
					<Link
						href="/orders"
						onClick={() => setShow(false)}
						className="block px-4 py-2 text-sm hover:bg-accent/20 transition-colors"
					>
						History Transaksi
					</Link>
					{user.role === "admin" && (
						<Link
							href="/admin"
							onClick={() => setShow(false)}
							className="block px-4 py-2 text-sm hover:bg-accent/20 transition-colors"
						>
							Dashboard
						</Link>
					)}
					<button
						onClick={() => {
							logout();
							setShow(false);
						}}
						className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-accent/20 transition-colors"
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}

/* ── Menu links ── */

const navLinks = [
	{ href: "/menu", label: "Menu Teh" },
	{ href: "/products", label: "Produk" },
	{ href: "/articles", label: "Artikel" },
	{ href: "/about", label: "Tentang" },
];

/* ── Component ── */

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const pathname = usePathname();
	const { items: cartItems } = useCart();
	const { user, logout } = useAuth();

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<nav className="bg-light-base border-b-2 border-text-dark sticky top-0 z-50">
			<div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
				{/* Logo */}
				<Link
					href="/"
					className="flex items-center gap-2 font-display text-2xl font-bold"
				>
					<FlameIcon className="text-primary" />
					Naur
				</Link>

				{/* Desktop Menu */}
				<ul className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className={cn(
									"font-display font-bold transition-colors hover:text-primary",
									pathname === link.href && "text-primary",
								)}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				{/* Desktop Right Actions */}
				<div className="hidden md:flex items-center gap-3">
					<button
						type="button"
						className="p-2 hover:text-primary transition-colors"
						aria-label="Cari"
						onClick={() => setSearchOpen(true)}
					>
						<SearchIcon />
					</button>
					<Link
						href="/cart"
						className="relative p-2 hover:text-primary transition-colors"
						aria-label="Keranjang"
					>
						<CartIcon />
						<span className="absolute -top-0.5 -right-0.5 bg-primary text-text-light rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold leading-none">
							{cartItems.length}
						</span>
					</Link>
					{user ? (
						<UserDropdown />
					) : (
						<Link href="/login">
							<FlatButton size="sm">Login</FlatButton>
						</Link>
					)}
				</div>

				{/* Mobile Hamburger */}
				<button
					type="button"
					className="md:hidden p-2"
					onClick={() => setOpen(!open)}
					aria-label={open ? "Tutup menu" : "Buka menu"}
				>
					{open ? <CloseIcon /> : <MenuIcon />}
				</button>
			</div>

			{/* Mobile Panel */}
			{open && (
				<div className="md:hidden border-t-2 border-text-dark bg-light-base px-6 pb-6">
					<ul className="flex flex-col gap-4 pt-4">
						{navLinks.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									className={cn(
										"block font-display text-lg font-bold transition-colors hover:text-primary",
										pathname === link.href && "text-primary",
									)}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
					<div className="mt-6 flex items-center gap-3">
						<button
							type="button"
							className="p-2"
							aria-label="Cari"
							onClick={() => {
								setOpen(false);
								setSearchOpen(true);
							}}
						>
							<SearchIcon />
						</button>
						<Link href="/cart" className="relative p-2" aria-label="Keranjang">
							<CartIcon />
							<span className="absolute -top-0.5 -right-0.5 bg-primary text-text-light rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold leading-none">
								{cartItems.length}
							</span>
						</Link>
					</div>
					<div className="mt-4">
						{user ? (
							<div className="space-y-2">
								<div className="flex items-center gap-2 mb-2">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-text-light font-display text-sm font-bold">
										{user.name.charAt(0).toUpperCase()}
									</div>
									<div>
										<p className="font-display text-sm font-bold">
											{user.name}
										</p>
										<p className="text-xs text-text-muted">{user.email}</p>
									</div>
								</div>
								<Link
									href="/orders"
									className="block font-display text-sm font-bold hover:text-primary"
								>
									History Transaksi
								</Link>
								{user.role === "admin" && (
									<Link
										href="/admin"
										className="block font-display text-sm font-bold hover:text-primary"
									>
										Dashboard
									</Link>
								)}
								<button
									type="button"
									onClick={() => {
										logout();
										setOpen(false);
									}}
									className="block w-full text-left font-display text-sm font-bold text-primary hover:underline"
								>
									Logout
								</button>
							</div>
						) : (
							<Link href="/login" className="block">
								<FlatButton size="md" className="w-full">
									Login
								</FlatButton>
							</Link>
						)}
					</div>
				</div>
			)}
			<SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
		</nav>
	);
}

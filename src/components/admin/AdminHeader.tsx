"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/store/auth";

/* ── Inline SVG Icons ── */

function FlameIcon({ className }: { className?: string }) {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 32 32"
			fill="none"
			className={className}
			aria-hidden="true"
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

function BellIcon({ className }: { className?: string }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
			<path d="M13.73 21a2 2 0 01-3.46 0" />
		</svg>
	);
}

function ChevronDownIcon({ className }: { className?: string }) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<polyline points="6 9 12 15 18 9" />
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
			aria-hidden="true"
		>
			<line x1="4" y1="6" x2="20" y2="6" />
			<line x1="4" y1="12" x2="20" y2="12" />
			<line x1="4" y1="18" x2="20" y2="18" />
		</svg>
	);
}

/* ── Component ── */

export default function AdminHeader({
	onMenuClick,
}: {
	onMenuClick?: () => void;
}) {
	const { logout } = useAuth();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown on outside click
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="sticky top-0 z-50 flex h-[65px] items-center justify-between border-b border-[#e5e7eb] bg-white px-4 sm:px-6">
			{/* Left — Hamburger (mobile) + Logo */}
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={onMenuClick}
					className="p-2 text-text-dark md:hidden"
					aria-label="Buka menu navigasi"
				>
					<MenuIcon />
				</button>
				<Link
					href="/admin"
					className="flex items-center gap-2 font-display text-2xl font-bold"
				>
					<FlameIcon className="text-primary" />
					Naur
				</Link>
			</div>

			{/* Right — Actions */}
			<div className="flex items-center gap-4">
				{/* Bell icon */}
				<button
					type="button"
					className="relative p-2 text-text-dark/60 transition-colors hover:text-primary"
					aria-label="Notifikasi"
				>
					<BellIcon />
					{/* Notification dot */}
					<span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
				</button>

				{/* Avatar + Name + Dropdown */}
				<div className="relative" ref={dropdownRef}>
					<button
						type="button"
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-black/5"
					>
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-display text-sm font-bold">
							A
						</div>
						<span className="hidden text-sm font-medium text-text-dark sm:inline">
							Admin Naur
						</span>
						<ChevronDownIcon
							className={`hidden text-text-dark/40 transition-transform sm:inline ${dropdownOpen ? "rotate-180" : ""}`}
						/>
					</button>

					{dropdownOpen && (
						<div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-lg">
							<Link
								href="/admin"
								onClick={() => setDropdownOpen(false)}
								className="block px-4 py-2.5 text-sm text-text-dark transition-colors hover:bg-black/5"
							>
								Profil
							</Link>
							<hr className="my-1 border-[#e5e7eb]" />
							<button
								type="button"
								onClick={() => {
									setDropdownOpen(false);
									logout();
								}}
								className="w-full px-4 py-2.5 text-left text-sm text-primary transition-colors hover:bg-black/5"
							>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

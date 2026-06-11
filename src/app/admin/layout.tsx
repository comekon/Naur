"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAuth } from "@/store/auth";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user && user.role !== "admin") {
			router.push("/");
		}
		if (!user) {
			router.push("/login");
		}
	}, [user, router]);

	if (user?.role !== "admin") {
		return (
			<div className="flex min-h-[60vh] items-center justify-center">
				<p className="font-display text-lg text-text-muted">
					Mengakses dashboard...
				</p>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col">
			<AdminHeader />
			<div className="flex flex-1">
				<AdminSidebar />
				<main className="flex-1 bg-light-base/50 p-6">{children}</main>
			</div>
		</div>
	);
}

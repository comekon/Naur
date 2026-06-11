import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/store/auth";
import { CartProvider } from "@/store/cart";

const spaceGrotesk = Space_Grotesk({
	weight: ["500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-display",
});

const dmSans = DM_Sans({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-body",
});

const spaceMono = Space_Mono({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-label",
});

export const metadata: Metadata = {
	title: "NAUR",
	description:
		"Nyalakan Momenmu. Specialty tea bar untuk jiwa yang berani menikmati.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="id"
			className={`${spaceGrotesk.variable} ${dmSans.variable} ${spaceMono.variable}`}
		>
			<body className="min-h-screen bg-light-base text-text-dark antialiased">
				<AuthProvider>
					<CartProvider>{children}</CartProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

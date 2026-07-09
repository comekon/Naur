import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/layout/SectionContainer";
import NewsletterForm from "@/components/layout/NewsletterForm";

/* ── Inline SVG Icons ── */

/* ── Data ── */

const menuLinks = [
	{ href: "/menu", label: "Menu Teh" },
	{ href: "/products", label: "Produk" },
	{ href: "/articles", label: "Artikel" },
	{ href: "https://naur.figma.site/page/about", label: "Tentang" },
];

const categoryLinks = [
	{ href: "/products?cat=rtd", label: "Minuman RTD" },
	{ href: "/products?cat=kemasan", label: "Teh Kemasan" },
	{ href: "/products?cat=alat", label: "Alat Seduh" },
	{ href: "/products?cat=merch", label: "Merchandise" },
	{ href: "/products?cat=bundling", label: "Bundling" },
];

/* ── Component ── */

export default function Footer() {
	return (
		<footer className="bg-tertiary text-text-light border-t-2 border-text-dark">
			<div className="mx-auto max-w-[1280px] px-6 md:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Brand */}
					<div>
						<Link
							href="/"
							className="flex items-center gap-2 font-display text-2xl font-bold"
						>
							<Image
								src="/images/Naur-logo.svg"
								alt="Naur"
								width={24}
								height={29}
								className="h-7 w-auto"
							/>
							Naur
						</Link>
						<p className="mt-3 text-sm text-text-light/70 leading-relaxed">
							Specialty tea bar untuk jiwa yang berani menikmati. Setiap tegukan
							adalah petualangan rasa.
						</p>
						<div className="mt-5 flex items-center gap-3">
							<a
								href="#"
								aria-label="Instagram"
								className="hover:text-secondary transition-colors"
							>
								<Image
									src="/images/logo-insta1.svg"
									alt="Instagram"
									width={20}
									height={20}
									className="h-5 w-auto"
								/>
							</a>
							<a
								href="#"
								aria-label="TikTok"
								className="hover:text-secondary transition-colors"
							>
								<Image
									src="/images/logo-ttk2.svg"
									alt="TikTok"
									width={20}
									height={20}
									className="h-5 w-auto"
								/>
							</a>
							<a
								href="#"
								aria-label="X"
								className="hover:text-secondary transition-colors"
							>
								<Image
									src="/images/logo-twit2.svg"
									alt="X"
									width={20}
									height={20}
									className="h-5 w-auto"
								/>
							</a>
						</div>
					</div>

					{/* Menu */}
					<div>
						<h4 className="font-display text-sm font-bold uppercase tracking-widest text-secondary mb-4">
							Menu
						</h4>
						<ul className="space-y-2">
							{menuLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-text-light/70 hover:text-text-light transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Kategori */}
					<div>
						<h4 className="font-display text-sm font-bold uppercase tracking-widest text-secondary mb-4">
							Kategori
						</h4>
						<ul className="space-y-2">
							{categoryLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-text-light/70 hover:text-text-light transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h4 className="font-display text-sm font-bold uppercase tracking-widest text-secondary mb-4">
							Nyalakan inbox-mu
						</h4>
						<p className="text-sm text-text-light/70 mb-4">
							Dapatkan info promo dan menu terbaru langsung ke email-mu.
						</p>
						<NewsletterForm />
					</div>
				</div>

				{/* Bottom strip */}
				<div className="mt-12 border-t border-text-light/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="font-label text-xs text-text-light/50">
						&copy; 2026 Naur Tea Bar. All rights reserved.
					</p>
					<div className="flex items-center gap-4">
						<a
							href="#"
							className="font-label text-xs text-text-light/50 hover:text-text-light transition-colors"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="font-label text-xs text-text-light/50 hover:text-text-light transition-colors"
						>
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

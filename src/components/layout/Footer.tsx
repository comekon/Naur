import Link from "next/link";
import SectionContainer from "@/components/layout/SectionContainer";
import NewsletterForm from "@/components/layout/NewsletterForm";

/* ── Inline SVG Icons ── */

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 2C16 2 6 12 6 20a10 10 0 0020 0C26 12 16 2 16 2z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <path d="M16 14c0 0-4 4-4 8a4 4 0 008 0c0-4-4-8-4-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

/* ── Data ── */

const menuLinks = [
  { href: "/menu", label: "Menu Teh" },
  { href: "/products", label: "Produk" },
  { href: "/articles", label: "Artikel" },
  { href: "/about", label: "Tentang" },
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
            <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold">
              <FlameIcon className="text-secondary" />
              Naur
            </Link>
            <p className="mt-3 text-sm text-text-light/70 leading-relaxed">
              Specialty tea bar untuk jiwa yang berani menikmati. Setiap tegukan adalah petualangan rasa.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="hover:text-secondary transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-secondary transition-colors">
                <TikTokIcon />
              </a>
              <a href="#" aria-label="X" className="hover:text-secondary transition-colors">
                <XIcon />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-secondary mb-4">Menu</h4>
            <ul className="space-y-2">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-light/70 hover:text-text-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kategori */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-secondary mb-4">Kategori</h4>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-light/70 hover:text-text-light transition-colors">
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
            <a href="#" className="font-label text-xs text-text-light/50 hover:text-text-light transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-label text-xs text-text-light/50 hover:text-text-light transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

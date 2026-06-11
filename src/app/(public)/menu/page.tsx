"use client";

import Link from "next/link";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import FlatButton from "@/components/ui/FlatButton";
import SectionContainer from "@/components/layout/SectionContainer";

const menuCategories = [
  {
    id: "rtd",
    title: "Minuman Ready-to-Drink",
    description: "Teh segar yang diseduh langsung — siap minum, siap nikmati.",
    filter: (p: Product) => p.category === "Minuman RTD",
    bg: "bg-secondary",
  },
  {
    id: "single-origin",
    title: "Teh Single Origin",
    description: "Daun teh dari satu kebun spesifik — Kerinci, Wonosobo, Puncak. Rasa asli tanpa campuran.",
    filter: (p: Product) => p.category === "Teh Kemasan" && p.teaType === "Single Origin",
    bg: "bg-primary",
  },
  {
    id: "packaged",
    title: "Teh Kemasan",
    description: "Bawa pulang kenikmatan Naur. Teh kemasan premium untuk dinikmati di rumah.",
    filter: (p: Product) => p.category === "Teh Kemasan" && p.teaType !== "Single Origin",
    bg: "bg-accent",
  },
  {
    id: "seasonal",
    title: "Menu Spesial",
    description: "Rotasi menu terbatas — hadir sebentar, hilang sebentar. Jangan sampai kehabisan!",
    filter: (p: Product) => p.badges.includes("limited"),
    bg: "bg-tertiary text-text-light",
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-tertiary">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-20 md:px-8 text-center">
          <p className="font-label text-xs font-bold uppercase tracking-[0.3em] text-secondary">Specialty Tea Bar</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-text-light md:text-7xl">
            Menu Teh
          </h1>
          <p className="mt-4 mx-auto max-w-lg text-text-light/70 text-lg">
            Setiap cangkir diseduh dengan api, disajikan dengan nyali. Pilih dari koleksi teh terbaik Nusantara.
          </p>
        </div>
      </section>

      {/* Categories */}
      {menuCategories.map((cat) => {
        const items = products.filter(cat.filter);
        if (items.length === 0) return null;

        return (
          <SectionContainer key={cat.id}>
            {/* Category header */}
            <div className={cat.bg + " rounded-flat border-2 border-text-dark p-6 md:p-8"}>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                {cat.title}
              </h2>
              <p className="mt-2 text-sm opacity-80 max-w-xl">
                {cat.description}
              </p>
            </div>

            {/* Menu items */}
            <div className="mt-8">
              <div className="divide-y-2 divide-text-dark/10">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-5 transition-colors hover:bg-accent/10 -mx-2 px-2 rounded-flat"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-base font-bold group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        {item.badges.includes("bestseller") && (
                          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary border border-secondary rounded-flat px-1.5 py-0.5">
                            Bestseller
                          </span>
                        )}
                        {item.badges.includes("new") && (
                          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-primary border border-primary rounded-flat px-1.5 py-0.5">
                            Baru
                          </span>
                        )}
                        {item.badges.includes("limited") && (
                          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-text-dark border border-text-dark rounded-flat bg-accent px-1.5 py-0.5">
                            Terbatas
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-text-muted">
                        <span className="capitalize">{item.teaType === "-" ? "" : item.teaType}</span>
                        {item.origin !== "-" && (
                          <span> · {item.origin}</span>
                        )}
                        {" · "}{item.tastingNotes}
                      </p>
                    </div>
                    <p className="font-label text-base font-bold text-primary shrink-0">
                      {fmt(item.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </SectionContainer>
        );
      })}

      {/* Bottom CTA */}
      <section className="bg-accent">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-6 py-16 text-center md:flex-row md:justify-between md:py-10">
          <div className="text-left">
            <h2 className="font-display text-2xl font-bold">Tertarik belanja teh?</h2>
            <p className="mt-1 text-sm text-text-dark/60">Kunjungi katalog lengkap kami untuk teh kemasan, merchandise, dan bundling.</p>
          </div>
          <Link href="/products">
            <FlatButton variant="solid" color="dark" size="lg">
              Lihat Semua Produk
            </FlatButton>
          </Link>
        </div>
      </section>
    </>
  );
}

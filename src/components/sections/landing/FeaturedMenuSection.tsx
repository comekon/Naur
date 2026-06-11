import Link from "next/link";
import FlatShadowCard from "@/components/ui/FlatShadowCard";
import SectionContainer from "@/components/layout/SectionContainer";

const featuredMenu = [
  {
    name: "Jasmine Milk Tea",
    notes: "Floral, creamy, aftertaste bersih",
    price: "Rp 28.000",
    bg: "primary" as const,
    slug: "jasmine-milk-tea",
  },
  {
    name: "Oolong Latte",
    notes: "Roasted nutty, smooth, sedikit manis",
    price: "Rp 32.000",
    bg: "secondary" as const,
    slug: "oolong-latte",
  },
  {
    name: "Matcha Ceremonial",
    notes: "Umami, earthy, creamy froth",
    price: "Rp 35.000",
    bg: "accent" as const,
    slug: "matcha-ceremonial",
  },
];

export default function FeaturedMenuSection() {
  return (
    <SectionContainer>
      <h2 className="font-display text-4xl font-bold">Menu Unggulan</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featuredMenu.map((item) => (
          <Link key={item.name} href={`/products/${item.slug}`} className="contents">
            <FlatShadowCard bg={item.bg} padding="lg" className="flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold">{item.name}</h3>
                <p className="mt-3 text-sm opacity-80">{item.notes}</p>
              </div>
              <p className="mt-6 font-label text-xl font-bold">{item.price}</p>
            </FlatShadowCard>
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}

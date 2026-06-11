import SectionContainer from "@/components/layout/SectionContainer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

const bestSellerSlugs = ["tumbler-naur", "tote-bag-naur", "single-origin-puncak", "starter-kit"];

export default function BestSellerSection() {
  const items = bestSellerSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <SectionContainer>
      <h2 className="font-display text-4xl font-bold">Produk Terlaris</h2>
      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((product) =>
          product ? <ProductCard key={product.id} product={product} /> : null
        )}
      </div>
    </SectionContainer>
  );
}

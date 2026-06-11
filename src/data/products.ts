import type { Product } from "@/types/product";

export const products: Product[] = [
  // Minuman RTD
  {
    id: "p1",
    slug: "jasmine-milk-tea",
    name: "Jasmine Milk Tea",
    category: "Minuman RTD",
    teaType: "Jasmine",
    origin: "Puncak",
    price: 28000,
    images: ["/images/product/jasmine-milk-tea.png"],
    tastingNotes: "Floral, creamy, aftertaste bersih",
    description: "Perpaduan daun jasmine premium dari Puncak dengan susu segar. Aroma floral yang lembut dan rasa creamy yang menyenangkan di setiap tegukan.",
    brewGuide: "Disajikan dingin. Kocok sebelum minum. Best served with ice.",
    badges: ["bestseller"],
    stock: 50,
  },
  {
    id: "p2",
    slug: "oolong-latte",
    name: "Oolong Latte",
    category: "Minuman RTD",
    teaType: "Oolong",
    origin: "Wonosobo",
    price: 32000,
    images: ["/images/product/oolong-latte.png"],
    tastingNotes: "Roasted nutty, smooth, sedikit manis",
    description: "Oolong dari Wonosobo dengan karakter roasted nutty yang khas, dipadukan dengan susu steamed untuk menghasilkan latte yang smooth dan memuaskan.",
    brewGuide: "Disajikan panas atau dingin. Untuk oolong latte dingin, tambahkan es batu.",
    badges: ["new"],
    stock: 40,
  },
  {
    id: "p3",
    slug: "matcha-ceremonial",
    name: "Matcha Ceremonial",
    category: "Minuman RTD",
    teaType: "Matcha",
    origin: "-",
    price: 35000,
    images: ["/images/product/matcha-ceremonial.png"],
    tastingNotes: "Umami, earthy, creamy froth",
    description: "Grade ceremonial matcha dari Uji, Jepang. Diseduh dengan tehnik tradisional, menghasilkan froth yang creamy dan rasa umami yang mendalam.",
    brewGuide: "Disajikan panas. Matcha di-whisk hingga berbusa. Best consumed segera.",
    badges: ["bestseller", "limited"],
    stock: 25,
  },
  {
    id: "p4",
    slug: "cold-brew-classic",
    name: "Cold Brew Classic",
    category: "Minuman RTD",
    teaType: "Cold Brew",
    origin: "Kerinci",
    price: 30000,
    images: ["/images/product/cold-brew-classic.png"],
    tastingNotes: "Smooth, low tannin, naturally sweet",
    description: "Daun teh hitam dari Kerinci yang di-cold brew selama 12 jam. Hasilnya smooth, minim rasa pahit, dan naturally sweet tanpa tambahan gula.",
    brewGuide: "Disajikan dingin langsung dari kulkas. Simpan di suhu 4°C.",
    badges: [],
    stock: 60,
  },

  // Teh Kemasan
  {
    id: "p5",
    slug: "single-origin-kerinci",
    name: "Single Origin Kerinci",
    category: "Teh Kemasan",
    teaType: "Single Origin",
    origin: "Kerinci",
    price: 85000,
    images: ["/images/product/single-origin-kerinci.png"],
    tastingNotes: "Earthy, mineral, hint of smoke",
    description: "Daun teh orthodox dari kaki Gunung Kerinci, Sumatera. Karakter mineral dan smoky yang khas, cocok untuk penggemar teh yang ingin menjelajahi terroir Indonesia.",
    brewGuide: "Suhu air 90°C. Steep 3-4 menit. Gunakan 2g per 200ml air.",
    badges: ["new"],
    stock: 30,
  },
  {
    id: "p6",
    slug: "single-origin-wonosobo",
    name: "Single Origin Wonosobo",
    category: "Teh Kemasan",
    teaType: "Single Origin",
    origin: "Wonosobo",
    price: 85000,
    images: ["/images/product/single-origin-wonosobo.png"],
    tastingNotes: "Floral, buttery, clean finish",
    description: "Teh dari perkebunan Wonosobo, Jawa Tengah. Aroma floral yang khas dengan body buttery dan clean finish yang memanjakan lidah.",
    brewGuide: "Suhu air 85°C. Steep 3 menit. Bisa di-infuse ulang hingga 3 kali.",
    badges: [],
    stock: 30,
  },
  {
    id: "p7",
    slug: "single-origin-puncak",
    name: "Single Origin Puncak",
    category: "Teh Kemasan",
    teaType: "Single Origin",
    origin: "Puncak",
    price: 75000,
    images: ["/images/product/single-origin-puncak.png"],
    tastingNotes: "Bright, citrusy, refreshing",
    description: "Green tea dari Puncak, Bogor. Karakter bright dan citrusy yang refreshing, cocok untuk daily tea drinking.",
    brewGuide: "Suhu air 75°C. Steep 2 menit. Jangan over-steep untuk menghindari rasa pahit.",
    badges: ["bestseller"],
    stock: 45,
  },

  // Alat Seduh
  {
    id: "p8",
    slug: "teapot-keramik",
    name: "Teapot Keramik Hitam",
    category: "Alat Seduh",
    teaType: "-",
    origin: "-",
    price: 150000,
    images: ["/images/product/teapot-keramik-hitam.png"],
    tastingNotes: "-",
    description: "Teapot keramik handmade dengan glasir hitam matte. Kapasitas 350ml, cocok untuk 2-3 cangkir. Desain minimalis yang bold.",
    brewGuide: "Bilas dengan air panas sebelum digunakan. Cuci tangan saja.",
    badges: ["new"],
    stock: 15,
  },
  {
    id: "p9",
    slug: "tea-infuser-stainless",
    name: "Tea Infuser Stainless",
    category: "Alat Seduh",
    teaType: "-",
    origin: "-",
    price: 45000,
    images: ["/images/product/tea-infuser-stainless.png"],
    tastingNotes: "-",
    description: "Infuser stainless steel 304 food-grade dengan lubang halus. Cocok untuk loose leaf tea. Panjang 12cm, muat di sebagian besar gelas.",
    brewGuide: "Masukkan 1-2 sendok teh, tuang air panas, tunggu sesuai waktu steep.",
    badges: [],
    stock: 50,
  },

  // Merchandise
  {
    id: "p10",
    slug: "tumbler-naur",
    name: "Tumbler Naur Fire",
    category: "Merchandise",
    teaType: "-",
    origin: "-",
    price: 89000,
    images: ["/images/product/tumbler-naur-fire.png"],
    tastingNotes: "-",
    description: "Tumbler stainless 500ml dengan desain api geometris Naur. Double wall insulation, keep hot 6 jam / cold 12 jam. BPA-free.",
    brewGuide: "-",
    badges: ["bestseller"],
    stock: 35,
  },
  {
    id: "p11",
    slug: "tote-bag-naur",
    name: "Tote Bag Naur",
    category: "Merchandise",
    teaType: "-",
    origin: "-",
    price: 65000,
    images: ["/images/product/tote-bag-naur.png"],
    tastingNotes: "-",
    description: "Tote bag katun premium dengan print api geometris besar. Ukuran 38x42cm, muat laptop 14 inch. Tali tebal dan kuat.",
    brewGuide: "-",
    badges: ["bestseller"],
    stock: 40,
  },
  {
    id: "p12",
    slug: "kaos-naur-fire",
    name: "Kaos Naur Fire",
    category: "Merchandise",
    teaType: "-",
    origin: "-",
    price: 95000,
    images: ["/images/product/kaos-naur-fire.png"],
    tastingNotes: "-",
    description: "Kaos cotton combed 30s dengan print \"Nyalakan Momenmu\" dan ilustrasi api. Available S/M/L/XL. Warna hitam.",
    brewGuide: "-",
    badges: ["new"],
    stock: 20,
  },
  {
    id: "p13",
    slug: "topi-naur",
    name: "Topi Naur Snapback",
    category: "Merchandise",
    teaType: "-",
    origin: "-",
    price: 75000,
    images: ["/images/product/topi-naur-snapback.png"],
    tastingNotes: "-",
    description: "Snapback hitam dengan bordir logo api Naur di depan. Adjustable strap, one size fits most.",
    brewGuide: "-",
    badges: [],
    stock: 25,
  },
  {
    id: "p14",
    slug: "pin-enamel-naur",
    name: "Pin Enamel Naur",
    category: "Merchandise",
    teaType: "-",
    origin: "-",
    price: 25000,
    images: ["/images/product/pin-enamel-naur.png"],
    tastingNotes: "-",
    description: "Pin enamel berbentuk api Naur dengan finishing glossy. Diameter 2.5cm. Clutch back yang kuat.",
    brewGuide: "-",
    badges: ["limited"],
    stock: 100,
  },

  // Bundling
  {
    id: "p15",
    slug: "starter-kit",
    name: "Starter Kit",
    category: "Bundling",
    teaType: "Single Origin",
    origin: "-",
    price: 250000,
    images: ["/images/product/starter-kit.png"],
    tastingNotes: "-",
    description: "Semua yang kamu butuhkan untuk mulai: 3 varian teh kemasan (Kerinci, Wonosobo, Puncak) + tea infuser + panduan brewing.",
    brewGuide: "Lihat panduan brewing di dalam box.",
    badges: ["bestseller"],
    stock: 10,
  },
  {
    id: "p16",
    slug: "gift-box-premium",
    name: "Gift Box Premium",
    category: "Bundling",
    teaType: "Single Origin",
    origin: "-",
    price: 350000,
    images: ["/images/product/gift-box-premium.png"],
    tastingNotes: "-",
    description: "Box premium berisi: 2 teh kemasan + 1 merch eksklusif + tumbler Naur + kartu ucapan. Packaging khusus untuk hadiah.",
    brewGuide: "-",
    badges: ["limited"],
    stock: 5,
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.teaType === product.teaType)
    )
    .slice(0, 4);
}

export interface ProductFilter {
  category?: string;
  priceRange?: [number, number];
  teaType?: string;
  origin?: string;
  sort?: "newest" | "bestseller" | "price-asc" | "price-desc";
}

export function filterProducts(filter: ProductFilter): Product[] {
  let result = [...products];

  if (filter.category) {
    result = result.filter((p) => p.category === filter.category);
  }
  if (filter.priceRange) {
    result = result.filter(
      (p) => p.price >= filter.priceRange![0] && p.price <= filter.priceRange![1]
    );
  }
  if (filter.teaType) {
    result = result.filter((p) => p.teaType === filter.teaType);
  }
  if (filter.origin) {
    result = result.filter((p) => p.origin === filter.origin);
  }
  if (filter.sort) {
    switch (filter.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "bestseller":
        result.sort((a, b) => {
          const aBest = a.badges.includes("bestseller") ? -1 : 0;
          const bBest = b.badges.includes("bestseller") ? -1 : 0;
          return aBest - bBest;
        });
        break;
    }
  }

  return result;
}

export const productCategories = [
  "Minuman RTD",
  "Teh Kemasan",
  "Alat Seduh",
  "Merchandise",
  "Bundling",
] as const;

export const teaTypes = [
  "Jasmine",
  "Oolong",
  "Green Tea",
  "Matcha",
  "Black Tea",
  "Cold Brew",
  "Single Origin",
] as const;

export const origins = ["Kerinci", "Wonosobo", "Puncak"] as const;

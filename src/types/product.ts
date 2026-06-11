export type ProductCategory =
  | "Minuman RTD"
  | "Teh Kemasan"
  | "Alat Seduh"
  | "Merchandise"
  | "Bundling";

export type TeaType =
  | "Jasmine"
  | "Oolong"
  | "Green Tea"
  | "Matcha"
  | "Black Tea"
  | "Cold Brew"
  | "Single Origin"
  | "-";

export type Origin = "Kerinci" | "Wonosobo" | "Puncak" | "-";

export type ProductBadge = "new" | "bestseller" | "limited" | "habis";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  teaType: TeaType;
  origin: Origin;
  price: number;
  images: string[];
  tastingNotes: string;
  description: string;
  brewGuide: string;
  badges: ProductBadge[];
  stock: number;
}

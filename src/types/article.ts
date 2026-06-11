export type ArticleCategory = "Brewing Guide" | "Origin Story" | "Review" | "Health";

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  content: string;
  thumbnail: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  author: string;
}

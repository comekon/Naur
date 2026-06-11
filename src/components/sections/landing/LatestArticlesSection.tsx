import ArticleCard from "@/components/ui/ArticleCard";
import SectionContainer from "@/components/layout/SectionContainer";
import { articles } from "@/data/articles";

export default function LatestArticlesSection() {
  const latest = articles.slice(0, 3);

  return (
    <section className="bg-accent">
      <SectionContainer padded>
        <h2 className="font-display text-4xl font-bold">Artikel Terbaru</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

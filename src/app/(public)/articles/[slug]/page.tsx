"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, getRelatedArticles, getAllArticles } from "@/data/articles";
import CategoryBadge from "@/components/ui/CategoryBadge";
import ArticleCard from "@/components/ui/ArticleCard";
import SectionContainer from "@/components/layout/SectionContainer";

/* ── Simple Markdown Renderer (safe for trusted/mock content only) ── */

function renderBold(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-text-dark">$1</strong>');
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let inTable = false;
  let key = 0;

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const header = tableRows[0];
    const body = tableRows.slice(1);
    elements.push(
      <div key={key++} className="my-6 overflow-x-auto rounded-flat border-2 border-text-dark">
        <table className="w-full">
          <thead>
            <tr className="bg-accent/30">
              {header.map((cell, ci) => (
                <th key={ci} className="px-4 py-2 text-left font-display text-sm font-bold">{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-t border-text-dark/10">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2 text-sm text-text-muted" dangerouslySetInnerHTML={{ __html: renderBold(cell) }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("| ")) {
      if (line.match(/^\|[\s-|]+\|$/)) continue;
      const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
      tableRows.push(cells);
      inTable = true;
      continue;
    }

    if (inTable) { flushTable(); }

    if (line.startsWith("## ")) {
      const id = line.replace("## ", "").trim().toLowerCase().replace(/\s+/g, "-");
      elements.push(<h2 key={key++} id={id} className="font-display text-2xl font-bold mt-10 mb-4">{line.replace("## ", "")}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} className="font-display text-lg font-bold mt-6 mb-3">{line.replace("### ", "")}</h3>);
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key++} className="my-6 border-l-4 border-primary bg-accent/30 pl-4 py-3 text-text-muted italic">
          {line.replace("> ", "")}
        </blockquote>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} className="ml-6 text-text-muted leading-relaxed list-disc" dangerouslySetInnerHTML={{ __html: renderBold(line.replace("- ", "")) }} />
      );
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-4" />);
    } else {
      elements.push(
        <p key={key++} className="text-text-muted leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: renderBold(line) }} />
      );
    }
  }

  if (inTable) flushTable();

  return elements;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getArticleBySlug(slug);

  const related = useMemo(() => (article ? getRelatedArticles(article) : []), [article]);

  if (!article) {
    return (
      <SectionContainer>
        <div className="py-20 text-center">
          <h1 className="font-display text-4xl font-bold">Artikel tidak ditemukan</h1>
          <Link href="/articles" className="mt-6 inline-block font-display font-bold text-primary hover:underline">
            &larr; Kembali ke artikel
          </Link>
        </div>
      </SectionContainer>
    );
  }

  const tocHeadings = article.content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace("## ", "").trim());

  return (
    <>
      {/* Header */}
      <section className="bg-primary">
        <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8">
          <Link href="/articles" className="font-display text-sm font-bold text-text-light/70 hover:underline">
            &larr; Artikel
          </Link>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-text-light md:text-5xl leading-tight">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-text-light/80">
            <CategoryBadge category={article.category} />
            <span className="font-label text-sm">
              {new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="text-sm">&middot;</span>
            <span className="text-sm">{article.readMinutes} min baca</span>
            <span className="text-sm">&middot;</span>
            <span className="text-sm">oleh {article.author}</span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {article.thumbnail && (
        <section className="bg-primary">
          <div className="mx-auto max-w-[1280px] px-6 pb-10 md:px-8">
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-flat border-2 border-text-dark shadow-flat">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      <SectionContainer>
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Content */}
          <article className="lg:w-2/3">
            <div className="prose-naur">
              {renderMarkdown(article.content)}
            </div>

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-2">kekurangan naur: marquee text di landing page kurang panjang perulangannya

prompt perbaikan svg:
Perbaiki SVG peta di section "Dari kebun teh terbaik Nusantara".

Tujuan:
- SVG tetap playful, handmade, dan cocok dengan style website.
- Bentuk harus lebih mudah dibaca sebagai representasi sederhana peta Indonesia.
- Highlight tiga lokasi utama: Kerinci, Wonosobo, dan Puncak.

Arahan desain:
1. Gunakan background section yang sudah ada.
2. Buat bentuk pulau-pulau lebih rapi dan proporsional, tidak terlalu seperti blob acak.
3. Pertahankan gaya ilustratif dengan fill warna oranye, merah, dan kuning.
4. Kurangi ketebalan stroke putih agar lebih elegan.
5. Buat titik lokasi lebih kecil dan konsisten.
6. Atur label agar tidak bertabrakan:
   - Kerinci di dekat Sumatra
   - Wonosobo di area Jawa Tengah
   - Puncak di area Jawa Barat
7. Jika label sempit, gunakan callout line kecil dari label ke titik.
8. Area kuning non-highlight dibuat sedikit lebih redup agar tidak mengalahkan lokasi utama.
9. Tambahkan hover effect pada titik lokasi:
   - titik membesar sedikit
   - muncul tooltip kecil berisi nama lokasi
10. Pastikan SVG responsive di desktop dan mobile.

Jangan ubah copywriting di sebelah kiri. Fokus hanya pada peningkatan SVG peta di sebelah kanan.
              {article.tags.map((tag) => (
                <span key={tag} className="font-label text-xs border-2 border-text-dark/20 rounded-flat px-3 py-1 text-text-muted">
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            {/* TOC */}
            {tocHeadings.length > 0 && (
              <div className="lg:sticky lg:top-24 rounded-flat border-2 border-text-dark bg-light-base p-5 shadow-flat mb-8">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-4">Daftar Isi</h3>
                <ul className="space-y-2">
                  {tocHeadings.map((heading) => {
                    const id = heading.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className="text-sm text-text-muted hover:text-primary transition-colors"
                        >
                          {heading}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div className="lg:sticky lg:top-64">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-4">Artikel Terkait</h3>
                <div className="space-y-4">
                  {related.map((a) => (
                    <ArticleCard key={a.id} article={a} className="block" />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </SectionContainer>

      {/* More articles */}
      <SectionContainer bg="bg-light-base">
        <h2 className="font-display text-3xl font-bold">Artikel Lainnya</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {getAllArticles()
            .filter((a) => a.id !== article.id)
            .slice(0, 3)
            .map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
        </div>
      </SectionContainer>
    </>
  );
}

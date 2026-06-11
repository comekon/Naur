"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const testimonials = [
  {
    quote: "Naur bikin gue ngerti bahwa teh bukan cuma minuman — itu pengalaman.",
    author: "Rina, tea enthusiast Jakarta",
  },
  {
    quote: "Oolong dari Wonosobo di sini beneran beda sama yang gue beli di supermarket. Levelnya jauh di atas.",
    author: "Budi, penggemar teh Bandung",
  },
  {
    quote: "Setiap kali datang ke Naur selalu nemu sesuatu yang baru. Place ini serious about tea.",
    author: "Sari, food blogger Surabaya",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <section className="bg-primary text-text-light">
      <div className="mx-auto flex min-h-[40vh] max-w-[1280px] flex-col items-center justify-center px-6 py-16 text-center md:py-24">
        {/* Quote mark */}
        <svg viewBox="0 0 60 50" fill="none" className="mb-6 h-12 w-12 opacity-50">
          <path d="M0 50 L0 30 C0 13 13 0 30 0 L30 10 C19 10 10 19 10 30 L25 30 L25 50 Z" fill="#FAFAFA" />
          <path d="M30 50 L30 30 C30 13 43 0 60 0 L60 10 C49 10 40 19 40 30 L55 30 L55 50 Z" fill="#FAFAFA" />
        </svg>
        <blockquote
          key={current}
          className="font-display text-3xl font-bold leading-snug md:text-5xl md:leading-tight max-w-3xl mx-auto transition-opacity duration-300"
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <p className="mt-6 text-lg opacity-70">— {t.author}</p>

        {/* Dots */}
        <div className="mt-8 flex gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={cn(
                "h-3 w-3 rounded-full border-2 border-text-light transition-colors",
                i === current ? "bg-text-light" : "bg-transparent opacity-50 hover:opacity-80"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

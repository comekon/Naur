import SectionContainer from "@/components/layout/SectionContainer";

export default function OriginStorySection() {
  return (
    <section className="bg-tertiary text-text-light">
      <SectionContainer padded className="relative z-10">
        <div className="flex flex-col items-center gap-10 md:flex-row">
          {/* Text */}
          <div className="md:w-1/2">
            <h2 className="font-display text-4xl font-bold">
              Dari kebun teh terbaik Nusantara
            </h2>
            <p className="mt-6 text-lg leading-relaxed opacity-80">
              Kami pilih langsung dari Kerinci, Wonosobo, dan Puncak tiga titik di peta Indonesia
              yang menghasilkan daun teh berkualitas tertinggi. Setiap tegukan membawa cerita
              dari tanahnya.
            </p>
          </div>

          {/* Map SVG */}
          <div className="md:w-1/2">
            <svg viewBox="0 0 500 350" fill="none" className="w-full">
              {/* Simplified Indonesia archipelago outline */}
              {/* Sumatra */}
              <path
                d="M60 120 C80 100 120 80 180 90 C200 95 210 110 200 130 C190 150 160 170 120 180 C100 185 80 175 70 160 C60 145 55 130 60 120Z"
                fill="#FF9500" stroke="#FAFAFA" strokeWidth="3" opacity="0.9"
              />
              {/* Java */}
              <path
                d="M180 200 C200 195 280 190 320 200 C340 205 350 215 340 225 C320 235 280 240 240 238 C210 235 190 225 185 215 C182 208 180 203 180 200Z"
                fill="#E63000" stroke="#FAFAFA" strokeWidth="3" opacity="0.9"
              />
              {/* Kalimantan */}
              <path
                d="M240 80 C270 70 330 75 360 100 C375 115 370 140 350 155 C330 168 290 170 260 160 C235 150 225 120 230 100 C233 90 236 84 240 80Z"
                fill="#FFE500" stroke="#FAFAFA" strokeWidth="3" opacity="0.9"
              />
              {/* Sulawesi */}
              <path
                d="M350 120 C360 110 380 115 385 130 C390 145 385 165 375 180 C365 190 350 185 345 170 C340 155 342 130 350 120Z"
                fill="#FF9500" stroke="#FAFAFA" strokeWidth="3" opacity="0.8"
              />
              {/* Papua */}
              <path
                d="M420 170 C450 160 480 175 490 200 C495 215 485 240 465 250 C445 258 425 245 420 225 C416 210 415 185 420 170Z"
                fill="#FFE500" stroke="#FAFAFA" strokeWidth="3" opacity="0.8"
              />

              {/* Origin points with labels */}
              {/* Kerinci */}
              <circle cx="140" cy="125" r="8" fill="#E63000" stroke="#FAFAFA" strokeWidth="3" />
              <text x="105" y="108" fill="#FAFAFA" fontSize="12" fontFamily="Space Mono, monospace" fontWeight="bold">Kerinci</text>

              {/* Wonosobo */}
              <circle cx="250" cy="215" r="8" fill="#E63000" stroke="#FAFAFA" strokeWidth="3" />
              <text x="255" y="212" fill="#FAFAFA" fontSize="12" fontFamily="Space Mono, monospace" fontWeight="bold">Wonosobo</text>

              {/* Puncak */}
              <circle cx="300" cy="205" r="8" fill="#E63000" stroke="#FAFAFA" strokeWidth="3" />
              <text x="305" y="232" fill="#FAFAFA" fontSize="12" fontFamily="Space Mono, monospace" fontWeight="bold">Puncak</text>
            </svg>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

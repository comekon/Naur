import Link from "next/link";
import FlatButton from "@/components/ui/FlatButton";

export default function AboutHeroSection() {
	return (
		<section className="relative overflow-hidden bg-tertiary text-text-light">
			{/* Halftone texture overlay */}
			<div className="bg-halftone-light absolute inset-0 pointer-events-none" />

			{/* Geometric accent — angled block */}
			<div className="absolute -right-20 -top-20 h-72 w-72 rotate-12 bg-primary/20" />
			<div className="absolute -bottom-16 -left-16 h-56 w-56 -rotate-12 bg-secondary/15" />

			<div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1280px] flex-col items-center justify-center px-6 py-20 text-center md:py-28">
				{/* Small label */}
				<span className="mb-4 inline-block font-label text-xs uppercase tracking-[0.3em] text-secondary">
					Our Story
				</span>

				<h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
					Tentang <span className="text-primary">Naur</span>
				</h1>

				<p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-light/80 md:text-xl">
					Dari api yang menyala, lahirlah secangkir teh yang menghidupkan. Kami
					bukan sekadar kedai teh — kami adalah perayaan atas rasa, cerita, dan
					keberanian menikmati.
				</p>

				<div className="mt-10 flex flex-wrap justify-center gap-4">
					<Link href="/products">
						<FlatButton variant="solid" color="primary" size="lg">
							Jelajahi Menu
						</FlatButton>
					</Link>
					<Link href="#philosophy">
						<FlatButton
							variant="outline"
							color="dark"
							size="lg"
							className="border-text-light text-text-light hover:bg-text-light/10"
						>
							Filosofi Kami
						</FlatButton>
					</Link>
				</div>
			</div>
		</section>
	);
}

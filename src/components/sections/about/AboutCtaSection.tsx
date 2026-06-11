import Link from "next/link";
import FlatButton from "@/components/ui/FlatButton";

export default function AboutCtaSection() {
	return (
		<section className="relative overflow-hidden bg-primary text-text-light">
			{/* Decorative geometric shapes */}
			<div className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rotate-45 bg-text-light/10" />
			<div className="absolute -right-8 top-8 h-24 w-24 rotate-12 bg-secondary/30" />

			<div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-6 px-6 py-20 text-center md:py-28">
				<span className="font-label text-xs uppercase tracking-[0.3em] text-text-light/60">
					Sudah Siap Menikmati?
				</span>
				<h2 className="font-display text-4xl font-bold md:text-6xl">
					Rasakan Sendiri
					<br />
					<span className="text-accent">Nyala</span>-nya.
				</h2>
				<p className="mt-2 max-w-lg text-lg text-text-light/75">
					Cerita bagus, tapi rasa lebih membuktikan. Yuk, coba menu unggulan
					kami dan temukan favoritmu.
				</p>
				<div className="mt-6 flex flex-wrap justify-center gap-4">
					<Link href="/products">
						<FlatButton variant="solid" color="dark" size="lg" withShadow>
							Jelajahi Menu
						</FlatButton>
					</Link>
					<Link href="/articles">
						<FlatButton
							variant="outline"
							color="dark"
							size="lg"
							className="border-text-light text-text-light hover:bg-text-light/10"
						>
							Baca Artikel
						</FlatButton>
					</Link>
				</div>
			</div>
		</section>
	);
}

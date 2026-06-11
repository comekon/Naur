import Image from "next/image";
import Link from "next/link";
import FlatButton from "@/components/ui/FlatButton";

export default function HeroSection() {
	return (
		<section className="relative overflow-hidden bg-light-base">
			<div className="bg-halftone absolute inset-0 pointer-events-none" />

			<div className="relative z-10 mx-auto flex min-h-[85vh] max-w-[1440px] flex-col items-center px-6 py-16 md:flex-row md:gap-0 md:px-8 md:py-0">
				{/* Left — Typography & CTA */}
				<div className="flex w-full flex-1 flex-col justify-center gap-6 md:gap-8 md:py-20 lg:py-24">
					<h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
						Teh yang <span className="text-primary">Menyala</span> di Setiap
						Tegukan
					</h1>
					<p className="max-w-md text-lg leading-relaxed text-text-muted md:text-xl">
						Specialty tea dari kebun terbaik Indonesia diseduh dengan api,
						disajikan dengan nyali.
					</p>
					<div className="mt-2 flex flex-wrap gap-4">
						<Link href="/products">
							<FlatButton variant="solid" color="primary" size="lg">
								Jelajahi Menu
							</FlatButton>
						</Link>
						<Link href="/articles">
							<FlatButton variant="outline" color="dark" size="lg">
								Tentang Naur
							</FlatButton>
						</Link>
					</div>
				</div>

				{/* Right — Hero Image, flush to container right edge */}
				<div className="relative mt-12 flex w-full flex-1 items-center md:mt-0">
					<Image
						src="/images/hero-tea2.png"
						alt="Naur specialty tea"
						width={3069}
						height={1614}
						sizes="(max-width: 768px) 100vw, 50vw"
						className="h-auto w-full object-contain object-right"
						priority
					/>
				</div>
			</div>
		</section>
	);
}

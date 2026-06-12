import Image from "next/image";
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
							Kami pilih langsung dari Kerinci, Wonosobo, dan Puncak tiga titik
							di peta Indonesia yang menghasilkan daun teh berkualitas
							tertinggi. Setiap tegukan membawa cerita dari tanahnya.
						</p>
					</div>

					{/* Image */}
					<div className="md:w-1/2">
						<Image
							src="/images/kebun teh2.png"
							alt="Kebun teh sumber teh terbaik Nusantara"
							width={1200}
							height={670}
							quality={90}
							sizes="(max-width: 768px) 100vw, 50vw"
							className="w-full rounded-lg object-cover"
						/>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}

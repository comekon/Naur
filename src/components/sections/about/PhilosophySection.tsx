import SectionContainer from "@/components/layout/SectionContainer";
import FlatShadowCard from "@/components/ui/FlatShadowCard";

const philosophies = [
	{
		icon: (
			<svg
				viewBox="0 0 32 32"
				fill="none"
				className="h-8 w-8"
				aria-hidden="true"
			>
				<path
					d="M16 2C16 2 6 12 6 20a10 10 0 0020 0C26 12 16 2 16 2z"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinejoin="round"
				/>
			</svg>
		),
		title: "Tanpa Api, Tak Ada Teh",
		description:
			"Api adalah simbol semangat kami. Tanpa ketulusan dalam proses, teh hanya jadi air berwarna. Kami menyeduh dengan nyala — penuh dedikasi dan rasa.",
		color: "text-primary",
	},
	{
		icon: (
			<svg
				viewBox="0 0 32 32"
				fill="none"
				className="h-8 w-8"
				aria-hidden="true"
			>
				<circle
					cx="16"
					cy="16"
					r="12"
					stroke="currentColor"
					strokeWidth="2.5"
				/>
				<path
					d="M16 10v6l4 4"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
			</svg>
		),
		title: "Rasa Asli, Tanpa Topeng",
		description:
			"Tidak ada sirup artificial, tidak ada topping berlebihan. Kami percaya teh terbaik adalah yang bisa berbicara sendiri — jujur, murni, dan berkarakter.",
		color: "text-secondary",
	},
	{
		icon: (
			<svg
				viewBox="0 0 32 32"
				fill="none"
				className="h-8 w-8"
				aria-hidden="true"
			>
				<path
					d="M4 24L12 8l8 10 8-14"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		title: "Dari Kebun, Bukan Pabrik",
		description:
			"Setiap daun teh kami datang langsung dari kebun pilihan di Indonesia. Kami kenal petaninya, kami tahu tanahnya, dan kami hormati prosesnya.",
		color: "text-tertiary",
	},
	{
		icon: (
			<svg
				viewBox="0 0 32 32"
				fill="none"
				className="h-8 w-8"
				aria-hidden="true"
			>
				<path
					d="M16 6v20M6 16h20"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
				<circle
					cx="16"
					cy="16"
					r="12"
					stroke="currentColor"
					strokeWidth="2.5"
				/>
			</svg>
		),
		title: "Berani Menikmati",
		description:
			"Naur bukan untuk yang main-main. Kami mengajak kamu menikmati teh dengan cara baru — berani, jujur, dan tanpa kompromi soal rasa.",
		color: "text-accent",
	},
];

export default function PhilosophySection() {
	return (
		<section id="philosophy" className="bg-light-base">
			<SectionContainer>
				<div className="text-center">
					<span className="mb-3 inline-block font-label text-xs uppercase tracking-[0.3em] text-text-muted">
						Filosofi
					</span>
					<h2 className="font-display text-3xl font-bold md:text-5xl">
						Prinsip yang <span className="text-primary">Menyala</span>
					</h2>
					<p className="mx-auto mt-4 max-w-xl text-text-muted">
						Di balik setiap cangkir Naur, ada empat prinsip yang kami pegang
						teguh.
					</p>
				</div>

				<div className="mt-14 grid gap-6 md:grid-cols-2">
					{philosophies.map((item) => (
						<FlatShadowCard key={item.title} padding="lg">
							<div className="flex items-start gap-4">
								<div className={`${item.color} shrink-0`}>{item.icon}</div>
								<div>
									<h3 className="font-display text-xl font-bold">
										{item.title}
									</h3>
									<p className="mt-2 leading-relaxed text-text-muted">
										{item.description}
									</p>
								</div>
							</div>
						</FlatShadowCard>
					))}
				</div>
			</SectionContainer>
		</section>
	);
}

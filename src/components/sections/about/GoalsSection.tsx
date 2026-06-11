import SectionContainer from "@/components/layout/SectionContainer";
import FlatShadowCard from "@/components/ui/FlatShadowCard";

const goals = [
	{
		icon: (
			<svg
				viewBox="0 0 32 32"
				fill="none"
				className="h-10 w-10"
				aria-hidden="true"
			>
				<path
					d="M16 4v8l6 3"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
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
		title: "Lebih Banyak Kebun, Lebih Banyak Cerita",
		description:
			"Kami terus mencari kebun teh tersembunyi di penjuru Indonesia. Setiap daerah punya karakter rasa yang unik, dan kami ingin membawa semuanya ke cangkir kamu.",
		bg: "primary" as const,
	},
	{
		icon: (
			<svg
				viewBox="0 0 32 32"
				fill="none"
				className="h-10 w-10"
				aria-hidden="true"
			>
				<path
					d="M4 28h24M8 28V16l8-8 8 8v12"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M14 28v-6h4v6"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		title: "Ruang Baru untuk Menikmati Teh",
		description:
			"Outlet Naur akan hadir di lebih banyak kota. Setiap ruang dirancang untuk menjadi tempat di mana kamu bisa menikmati teh, belajar, dan bertemu komunitas.",
		bg: "secondary" as const,
	},
	{
		icon: (
			<svg
				viewBox="0 0 32 32"
				fill="none"
				className="h-10 w-10"
				aria-hidden="true"
			>
				<path
					d="M4 24c4-4 8-8 12-8s8 4 12 8"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
				<path
					d="M4 18c4-4 8-8 12-8s8 4 12 8"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
				<circle cx="16" cy="26" r="2" fill="currentColor" />
			</svg>
		),
		title: "Inovasi Tanpa Melupakan Akar",
		description:
			"Kami bereksperimen dengan teknik seduh baru, varian rasa kreatif, dan format penyajian segar — tapi selalu dengan fondasi teh daun asli yang jadi identitas kami.",
		bg: "accent" as const,
	},
	{
		icon: (
			<svg
				viewBox="0 0 32 32"
				fill="none"
				className="h-10 w-10"
				aria-hidden="true"
			>
				<circle cx="16" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
				<path
					d="M8 26c0-4 4-6 8-6s8 2 8 6"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
			</svg>
		),
		title: "Pelayanan yang Lebih Personal",
		description:
			"Setiap pelanggan adalah bagian dari cerita Naur. Kami ingin tahu preferensi rasa kamu, memberi rekomendasi yang tepat, dan memastikan setiap kunjungan terasa istimewa.",
		bg: "tertiary" as const,
	},
];

export default function GoalsSection() {
	return (
		<SectionContainer>
			<div className="text-center">
				<span className="mb-3 inline-block font-label text-xs uppercase tracking-[0.3em] text-text-muted">
					Arah ke Depan
				</span>
				<h2 className="font-display text-3xl font-bold md:text-5xl">
					Kemana Naur <span className="text-primary">Berkembang</span>?
				</h2>
				<p className="mx-auto mt-4 max-w-xl text-text-muted">
					Ini bukan akhir dari cerita. Kami baru memulai, dan yang akan datang
					akan lebih menyeruak.
				</p>
			</div>

			<div className="mt-14 grid gap-6 sm:grid-cols-2">
				{goals.map((goal) => (
					<FlatShadowCard key={goal.title} bg={goal.bg} padding="lg">
						<div className="mb-4">{goal.icon}</div>
						<h3 className="font-display text-xl font-bold">{goal.title}</h3>
						<p className="mt-3 text-sm leading-relaxed opacity-85">
							{goal.description}
						</p>
					</FlatShadowCard>
				))}
			</div>
		</SectionContainer>
	);
}

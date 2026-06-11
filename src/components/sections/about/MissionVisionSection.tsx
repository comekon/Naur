import SectionContainer from "@/components/layout/SectionContainer";

const missions = [
	{
		label: "Misi Kami",
		heading: "Mengangkat Teh Indonesia ke Panggung Dunia",
		body: "Kami percaya teh Indonesia punya potensi yang belum banyak terekspos. Naur hadir untuk membuktikan bahwa daun teh dari Kebun Nusantara bisa bersaing dengan specialty tea terbaik di dunia — tanpa kompromi soal kualitas.",
	},
	{
		label: "Visi Kami",
		heading:
			'Menjadi Tempat Pertama yang Terpikir Saat Orang Mendengar Kata "Teh"',
		body: "Bukan sekadar brand teh. Kami ingin Naur menjadi referensi ketika seseorang mencari pengalaman teh yang sesungguhnya — rasa yang jujur, pelayanan yang tulus, dan ruang yang menginspirasi.",
	},
];

const highlights = [
	{
		number: "01",
		title: "Kualitas Tanpa Kompromi",
		text: "Setiap batch teh dipilih langsung dari petani, diuji rasa, dan hanya yang lolos standar kami yang disajikan.",
	},
	{
		number: "02",
		title: "Edukasi Rasa",
		text: "Kami tidak cuma menjual teh — kami mengajak pelanggan mengenal lebih dalam soal asal, proses, dan karakter setiap varian.",
	},
	{
		number: "03",
		title: "Komunitas yang Hidup",
		text: "Naur dibangun bersama orang-orang yang mencintai teh. Ruang diskusi, event tasting, dan kolaborasi adalah bagian dari DNA kami.",
	},
];

export default function MissionVisionSection() {
	return (
		<section className="bg-tertiary text-text-light">
			<SectionContainer>
				{/* Mission & Vision — two columns */}
				<div className="grid gap-10 md:grid-cols-2">
					{missions.map((m) => (
						<div key={m.label}>
							<span className="mb-3 inline-block font-label text-xs uppercase tracking-[0.3em] text-secondary">
								{m.label}
							</span>
							<h3 className="font-display text-2xl font-bold md:text-3xl">
								{m.heading}
							</h3>
							<p className="mt-4 leading-relaxed text-text-light/75">
								{m.body}
							</p>
						</div>
					))}
				</div>

				{/* Highlights */}
				<div className="mt-16 grid gap-8 md:grid-cols-3">
					{highlights.map((h) => (
						<div key={h.number} className="relative">
							<span className="font-display text-6xl font-extrabold text-primary/20">
								{h.number}
							</span>
							<h4 className="mt-2 font-display text-lg font-bold">{h.title}</h4>
							<p className="mt-2 text-sm leading-relaxed text-text-light/65">
								{h.text}
							</p>
						</div>
					))}
				</div>
			</SectionContainer>
		</section>
	);
}

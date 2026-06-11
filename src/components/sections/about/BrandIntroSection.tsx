import SectionContainer from "@/components/layout/SectionContainer";

export default function BrandIntroSection() {
	return (
		<SectionContainer>
			<div className="mx-auto max-w-3xl text-center">
				<span className="mb-4 inline-block font-label text-xs uppercase tracking-[0.3em] text-text-muted">
					Siapa Naur?
				</span>
				<h2 className="font-display text-3xl font-bold md:text-5xl">
					Bukan Kedai Teh Biasa.
					<br />
					Sebuah <span className="text-primary">Pengalaman</span>.
				</h2>
				<p className="mt-8 text-lg leading-relaxed text-text-muted">
					Naur lahir dari keyakinan sederhana: teh Indonesia layak diangkat ke
					level yang lebih tinggi. Bukan cuma minuman penunda haus, tapi sebuah
					pengalaman yang bisa mengubah cara kamu menikmati hari.
				</p>
				<p className="mt-4 text-lg leading-relaxed text-text-muted">
					Kami menyeduh teh daun asli dari kebun terbaik Nusantara — tanpa
					topping berlebihan, tanpa rasa artificial. Cita rasa murni, disajikan
					dengan karakter.
				</p>
			</div>

			{/* Stats row */}
			<div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 md:grid-cols-4">
				{[
					{ value: "3", label: "Asal Kebun" },
					{ value: "20+", label: "Varian Menu" },
					{ value: "100%", label: "Teh Daun Asli" },
					{ value: "1", label: "Misi: Rasa Terbaik" },
				].map((stat) => (
					<div key={stat.label} className="text-center">
						<p className="font-display text-4xl font-bold text-primary">
							{stat.value}
						</p>
						<p className="mt-2 font-label text-xs uppercase tracking-wider text-text-muted">
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</SectionContainer>
	);
}

import SectionContainer from "@/components/layout/SectionContainer";

export default function TheBeginningSection() {
	return (
		<SectionContainer bg="bg-light-base">
			<div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
				{/* Visual — left */}
				<div className="relative md:w-1/2">
					<div className="aspect-[4/3] w-full overflow-hidden rounded-flat border-2 border-text-dark bg-tertiary">
						{/* Placeholder visual — replace with actual image */}
						<div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-text-light">
							<svg
								viewBox="0 0 64 64"
								fill="none"
								className="h-16 w-16 text-secondary"
								role="img"
								aria-label="Ilustrasi api"
							>
								<path
									d="M32 4C32 4 12 20 12 36a20 20 0 0040 0C52 20 32 4 32 4z"
									stroke="currentColor"
									strokeWidth="3"
									strokeLinejoin="round"
								/>
								<path
									d="M32 20c0 0-8 8-8 16a8 8 0 0016 0c0-8-8-16-8-16z"
									fill="currentColor"
									opacity="0.3"
								/>
							</svg>
							<p className="font-label text-xs uppercase tracking-wider text-text-light/50">
								Placeholder — about-beginning.jpg
							</p>
						</div>
					</div>
					{/* Accent block */}
					<div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-flat bg-primary" />
				</div>

				{/* Text — right */}
				<div className="md:w-1/2">
					<span className="mb-3 inline-block font-label text-xs uppercase tracking-[0.3em] text-text-muted">
						The Beginning
					</span>
					<h2 className="font-display text-3xl font-bold md:text-4xl">
						Dari Rasa Penasaran,
						<br />
						Jadi <span className="text-primary">Nyala</span> yang Tak Padam
					</h2>
					<div className="mt-6 space-y-4 text-text-muted leading-relaxed">
						<p>
							Semua bermula dari satu pertanyaan sederhana:{" "}
							<em className="font-medium text-text-dark">
								&quot;Kenapa teh Indonesia yang kaya rasa ini jarang dinikmati
								dalam bentuk terbaiknya?&quot;
							</em>
						</p>
						<p>
							Kami melihat teh yang begitu istimewa — dari lereng Kerinci,
							dataran Wonosobo, hingga ketinggian Puncak — justru sering kali
							berakhir dalam kemasan instan yang menghilangkan jati dirinya.
						</p>
						<p>
							Naur lahir dari rasa tidak terima itu. Kami ingin membuktikan
							bahwa teh Indonesia bisa berdiri setara dengan specialty tea
							dunia. Bahwa setiap daun punya cerita, dan setiap tegukan bisa
							menjadi momen yang bermakna.
						</p>
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface MarqueeTickerProps {
	items: string[];
	speed?: "slow" | "normal" | "fast";
	separator?: string;
}

const speedDuration: Record<string, string> = {
	slow: "45s",
	normal: "30s",
	fast: "18s",
};

export default function MarqueeTicker({
	items,
	speed = "normal",
	separator = "·",
}: MarqueeTickerProps) {
	const [paused, setPaused] = useState(false);
	const content = items.join(` ${separator} `);

	return (
		<div
			className="w-full overflow-hidden bg-text-dark py-3"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			role="marquee"
			aria-label={content}
		>
			<div
				className={cn(
					"animate-marquee flex whitespace-nowrap",
					paused && "!animate-none",
				)}
				style={{ animationDuration: speedDuration[speed] }}
				aria-hidden="true"
			>
				{[0, 1, 2, 3, 4, 5].map((i) => (
					<span
						key={i}
						className="font-display font-bold uppercase tracking-widest text-lg text-secondary mr-8"
					>
						{content}
					</span>
				))}
			</div>
		</div>
	);
}

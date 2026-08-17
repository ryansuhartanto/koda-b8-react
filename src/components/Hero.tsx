import type { JSX } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import ArrowRight from "~icons/lucide/arrow-right";
import ChevronLeft from "~icons/lucide/chevron-left";
import ChevronRight from "~icons/lucide/chevron-right";

import { Button } from "#/components/ui/button";
import data from "#/data.json";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import { cn } from "#/lib/utils";

const { banners } = data;

// Literal class strings so Tailwind can see them; JSON values would be purged.
const gradients: Record<string, string> = {
	electronic: "from-brand-600 to-purple-700",
	fashion: "from-accent-600 to-brand-700",
	sport: "from-brand-800 to-brand-500",
};

const AUTOPLAY_MS = 6000;

export default function Hero(): JSX.Element {
	const trackRef = useRef<HTMLDivElement>(null);
	// Where we're heading. Kept off render state so the dots can trail the real
	// scroll position instead of snapping ahead of it mid-animation.
	const targetRef = useRef(0);
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

	const goTo = useCallback(
		(next: number) => {
			const track = trackRef.current;
			if (!track) {
				return;
			}
			const wrapped = (next + banners.length) % banners.length;
			targetRef.current = wrapped;
			track.scrollTo({
				left: wrapped * track.clientWidth,
				behavior: reduceMotion ? "auto" : "smooth",
			});
		},
		[reduceMotion],
	);

	// Re-base the target once scrolling settles, so a swipe changes where "next"
	// counts from. Doing this on every scroll event would clobber the target
	// mid-animation and swallow rapid clicks.
	useEffect(() => {
		const track = trackRef.current;
		if (!track) {
			return;
		}
		const sync = () => {
			targetRef.current = Math.round(track.scrollLeft / track.clientWidth);
		};
		track.addEventListener("scrollend", sync);
		return () => {
			track.removeEventListener("scrollend", sync);
		};
	}, []);

	// Autoplay pauses on hover/focus, and is disabled outright for reduced motion.
	useEffect(() => {
		if (paused || reduceMotion || banners.length < 2) {
			return;
		}
		const id = setInterval(() => {
			goTo(targetRef.current + 1);
		}, AUTOPLAY_MS);
		return () => {
			clearInterval(id);
		};
	}, [paused, reduceMotion, goTo]);

	return (
		<section
			aria-roledescription="carousel"
			aria-label="Promosi utama"
			className="-mt-6 relative h-64 sm:h-80 md:h-100"
			onMouseEnter={() => {
				setPaused(true);
			}}
			onMouseLeave={() => {
				setPaused(false);
			}}
			onFocusCapture={() => {
				setPaused(true);
			}}
			onBlurCapture={() => {
				setPaused(false);
			}}
		>
			<div
				ref={trackRef}
				onScroll={(e) => {
					const track = e.currentTarget;
					setIndex(Math.round(track.scrollLeft / track.clientWidth));
				}}
				className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain no-scrollbar"
			>
				{banners.map((banner, i) => (
					<div
						key={banner.title}
						role="group"
						aria-roledescription="slide"
						aria-label={`${String(i + 1)} dari ${String(banners.length)}`}
						className={cn(
							"relative shrink-0 w-full h-full snap-start bg-linear-to-r",
							gradients[banner.theme],
						)}
					>
						<img
							className="absolute inset-y-0 inset-e-0 w-1/2 h-full object-cover mix-blend-hard-light opacity-25"
							src={banner.img}
							alt=""
						/>
						<div className="wrapper absolute inset-0 flex flex-col justify-center">
							<div className="w-full md:w-2/5 flex flex-col gap-3 md:gap-4">
								<h2 className="text-white font-bold text-2xl md:text-[2.5rem] leading-tight">
									{banner.title}
								</h2>
								<p className="hidden sm:block text-white/80 text-base md:text-lg leading-relaxed">
									{banner.body}
								</p>
								<Link
									className="flex gap-2 items-center w-fit bg-white text-brand-600 py-2.5 px-5 md:py-3 md:px-6 rounded-xl text-sm md:text-base"
									to={banner.href}
									tabIndex={i === index ? undefined : -1}
								>
									{banner.cta} <ArrowRight />
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>

			<nav
				aria-label="Navigasi promosi"
				className="absolute z-10 inset-0 m-4 grid text-xl text-white grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] pointer-events-none [&_button]:pointer-events-auto"
			>
				<div className="flex flex-col justify-center gap-2 col-1 row-[1/4] *:size-10 *:grid *:place-content-center *:rounded-full *:bg-white/20 *:hover:bg-white/30">
					<Button
						aria-label="Sebelumnya"
						size="none"
						variant="icon"
						onClick={() => {
							goTo(targetRef.current - 1);
						}}
					>
						<ChevronLeft />
					</Button>
				</div>
				<div className="flex flex-col justify-center gap-2 col-3 row-[1/4] *:size-10 *:grid *:place-content-center *:rounded-full *:bg-white/20 *:hover:bg-white/30">
					<Button
						aria-label="Berikutnya"
						size="none"
						variant="icon"
						onClick={() => {
							goTo(targetRef.current + 1);
						}}
					>
						<ChevronRight />
					</Button>
				</div>
				<div className="flex justify-center gap-2 col-2 row-3 *:h-2 *:rounded-full *:bg-white/50 *:transition-all *:duration-200 *:ease-out *:aria-current:w-6 *:aria-current:bg-white">
					{banners.map((banner, i) => (
						<Button
							key={banner.title}
							aria-label={`Ke slide ${String(i + 1)}`}
							aria-current={i === index ? "true" : undefined}
							size="none"
							variant="icon"
							className="w-2"
							onClick={() => {
								goTo(i);
							}}
						/>
					))}
				</div>
			</nav>
		</section>
	);
}

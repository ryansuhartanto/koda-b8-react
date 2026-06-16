import ArrowRight from "~icons/lucide/arrow-right";
import ChevronLeft from "~icons/lucide/chevron-left";
import ChevronRight from "~icons/lucide/chevron-right";
import Clock from "~icons/lucide/clock";
import TrendingUp from "~icons/lucide/trending-up";
import Zap from "~icons/lucide/zap";

import { ProductCard } from "#/components/ProductCard";
import data from "#/data.json";

const flashDeals = data.products
	.filter((p) => p.tags.includes("promo"))
	.slice(0, 4);
const newest = data.products.filter((p) => p.tags.includes("baru"));
const featured = data.products.filter((p) => p.tags.includes("unggulan"));

export default function Page() {
	return (
		<main className="flex flex-col gap-12 pt-6 pb-16 bg-gray-50">
			<section
				aria-label="Hero"
				className="-mt-6 relative h-100 bg-linear-to-r from-blue-600 to-purple-700"
			>
				<nav
					aria-label="Hero slides navigations"
					className="absolute z-10 inset-0 m-4 grid text-xl text-white grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] pointer-events-none [&_button]:pointer-events-auto [&_button]:cursor-pointer"
				>
					<div className="flex flex-col justify-center gap-2 col-1 row-[1/4] *:size-10 *:grid *:place-content-center *:rounded-full *:bg-white/20">
						<button
							aria-label="Previous"
							type="button"
						>
							<ChevronLeft />
						</button>
					</div>
					<div className="flex flex-col justify-center gap-2 col-3 row-[1/4] *:size-10 *:grid *:place-content-center *:rounded-full *:bg-white/20">
						<button
							aria-label="Next"
							type="button"
						>
							<ChevronRight />
						</button>
					</div>
					<div className="flex justify-center gap-2 col-2 row-3 *:size-2 *:rounded-full *:bg-white/50 *:pointer-events-auto *:transition-all *:duration-200 *:ease-out *:aria-selected:w-6 *:aria-selected:bg-white">
						<button
							type="button"
							aria-label="Go to slide 1"
							aria-selected="false"
						/>
						<button
							type="button"
							aria-label="Go to slide 2"
							aria-selected="true"
						/>
						<button
							type="button"
							aria-label="Go to slide 3"
							aria-selected="false"
						/>
					</div>
				</nav>

				<img
					className="absolute inset-y-0 inset-e-0 w-1/2 h-full object-cover mix-blend-hard-light opacity-25"
					src="/images/category/electronic.png"
					alt="Electronics"
				/>

				<div className="wrapper absolute inset-0 flex flex-col justify-center">
					<div className="w-2/5 flex flex-col gap-4">
						<h2 className="text-white font-bold text-[2.5rem] leading-tight">
							Elektronik Pilihan, Harga Spesial
						</h2>
						<p className="text-white/80 text-lg leading-relaxed">
							Laptop, smartphone, headphone, dan masih banyak lagi dengan diskon
							hingga 40%
						</p>
						<a
							className="flex gap-2 items-center w-fit bg-white text-blue-600 py-3 px-6 rounded-xl"
							href=""
						>
							Lihat Promo <ArrowRight />
						</a>
					</div>
				</div>
			</section>

			<section
				aria-label="Browse categories"
				className="text-xs"
			>
				<div className="wrapper flex flex-col gap-6">
					<header className="flex justify-between items-center text-sm">
						<h2 className="text-xl font-medium">Belanja Bedasarkan Kategori</h2>
						<a
							className="text-blue-600 *:align-middle"
							href=""
						>
							Lihat Semua <ArrowRight />
						</a>
					</header>
					<div className="grid grid-cols-6 gap-3">
						{data.categories.map(({ name, img, items }) => (
							<a
								key={name}
								href=""
							>
								<article className="card rounded-xl">
									<div className="m-4 flex flex-col gap-2 items-center">
										<img
											className="w-14 rounded-xl"
											src={img}
											alt={`${name} category`}
										/>
										<h3>{name}</h3>
										<p>{items} produk</p>
									</div>
								</article>
							</a>
						))}
					</div>
				</div>
			</section>

			<section aria-label="Flash Deal">
				<div className="wrapper flex flex-col gap-6">
					<header className="flex justify-between items-center text-sm">
						<div className="flex gap-4 items-center">
							<h2 className="flex gap-1 items-center bg-red-600 text-white px-3 py-2 rounded-lg font-medium">
								<Zap />
								<span>Flash Deal</span>
							</h2>
							<span className="flex gap-2 items-center text-gray-500">
								<Clock />
								<span>Berakhir dalam:</span>
								<span className="tabular-nums">05 : 21 : 38</span>
							</span>
						</div>
						<a
							className="text-blue-600 *:align-middle"
							href=""
						>
							Lihat Semua <ArrowRight />
						</a>
					</header>
					<div className="grid grid-cols-4 gap-4">
						{flashDeals.map((p) => (
							<ProductCard
								key={p.name}
								{...p}
							/>
						))}
					</div>
				</div>
			</section>

			<section aria-label="Marketing">
				<div className="wrapper grid grid-cols-2 gap-4">
					<a href="">
						<article className="card fashion flex flex-col justify-center h-44 text-white text-sm leading-normal">
							<div className="m-6 flex flex-col gap-2">
								<div>
									<span className="text-white/80">Fashion Wanita</span>
									<br />
									<strong className="text-xl font-bold">Diskon s/d 50%</strong>
								</div>
								<div className="w-fit px-3 py-1 rounded-lg border border-white">
									Belanja Sekarang
								</div>
							</div>
						</article>
					</a>
					<a href="">
						<article className="card electronic flex flex-col justify-center h-44 text-white text-sm leading-normal">
							<div className="m-6 flex flex-col gap-2">
								<div>
									<span className="text-white/80">Electronik Pilihan</span>
									<br />
									<strong className="text-xl font-bold">Harga Terbaik</strong>
								</div>
								<div className="w-fit px-3 py-1 rounded-lg border border-white">
									Lihat Produk
								</div>
							</div>
						</article>
					</a>
				</div>
			</section>

			<section aria-label="Produk Terbaru">
				<div className="wrapper flex flex-col gap-6">
					<header className="flex justify-between items-center text-sm">
						<h2 className="text-xl font-medium *:align-middle">
							<TrendingUp className="text-blue-600" /> Produk Terbaru
						</h2>
						<a
							className="text-blue-600 *:align-middle"
							href=""
						>
							Lihat Semua <ArrowRight />
						</a>
					</header>
					<div className="grid grid-cols-4 gap-4">
						{newest.map((p) => (
							<ProductCard
								key={p.name}
								{...p}
							/>
						))}
					</div>
				</div>
			</section>

			<section aria-label="Produk Unggulan">
				<div className="wrapper flex flex-col gap-6">
					<header className="flex justify-between items-center text-sm">
						<h2 className="text-xl font-medium">Produk Unggulan</h2>
						<a
							className="text-blue-600 *:align-middle"
							href=""
						>
							Lihat Semua <ArrowRight />
						</a>
					</header>
					<div className="grid grid-cols-4 gap-4">
						{featured.map((p) => (
							<ProductCard
								key={p.name}
								{...p}
							/>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

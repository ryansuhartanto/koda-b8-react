import type { JSX } from "react";
import { Link } from "react-router";

import ArrowRight from "~icons/lucide/arrow-right";
import Clock from "~icons/lucide/clock";
import TrendingUp from "~icons/lucide/trending-up";
import Zap from "~icons/lucide/zap";

import Hero from "#/components/Hero";
import { ProductCard } from "#/components/ProductCard";
import catalogApi from "#/services/api/catalog";
import productsApi from "#/services/api/products";

export default function Page(): JSX.Element {
	const { data: categories = [] } = catalogApi.useCategoriesQuery();
	const { data: discounted } = productsApi.useProductsQuery({ limit: 24 });
	const { data: newest } = productsApi.useProductsQuery({
		sort: "newest",
		limit: 4,
	});
	const { data: featured } = productsApi.useProductsQuery({
		sort: "rating",
		limit: 4,
	});

	// the API has no promo flag, so a discount marks a deal
	const flashDeals = (discounted?.items ?? [])
		.filter((p) => (p.original_price_idr ?? 0) > (p.price_idr ?? 0))
		.slice(0, 4);

	return (
		<main className="flex flex-col gap-12 pt-6 pb-16 bg-gray-50">
			<Hero />

			<section
				aria-label="Browse categories"
				className="text-xs"
			>
				<div className="wrapper flex flex-col gap-6">
					<header className="flex justify-between items-center text-sm">
						<h2 className="text-h2 font-medium">Belanja Bedasarkan Kategori</h2>
						<Link
							className="text-brand-600 *:align-middle"
							to="/browse"
						>
							Lihat Semua <ArrowRight />
						</Link>
					</header>
					<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
						{categories.map(({ id, name, img, product_count }) => (
							<Link
								key={id}
								to={`/browse?category=${encodeURIComponent(name)}`}
							>
								<article className="card rounded-xl">
									<div className="m-4 flex flex-col gap-2 items-center">
										<img
											className="w-14 rounded-xl"
											src={img ?? ""}
											alt={`${name} category`}
										/>
										<h3>{name}</h3>
										<p>{product_count} produk</p>
									</div>
								</article>
							</Link>
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
						<Link
							className="text-brand-600 *:align-middle"
							to="/browse?sort=price_asc"
						>
							Lihat Semua <ArrowRight />
						</Link>
					</header>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{flashDeals.map((p) => (
							<ProductCard
								key={p.id}
								product={p}
							/>
						))}
					</div>
				</div>
			</section>

			<section aria-label="Marketing">
				<div className="wrapper grid grid-cols-1 sm:grid-cols-2 gap-4">
					<Link to="/browse?category=Fashion">
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
					</Link>
					<Link to="/browse?category=Elektronik">
						<article className="card electronic flex flex-col justify-center h-44 text-white text-sm leading-normal">
							<div className="m-6 flex flex-col gap-2">
								<div>
									<span className="text-white/80">Elektronik Pilihan</span>
									<br />
									<strong className="text-xl font-bold">Harga Terbaik</strong>
								</div>
								<div className="w-fit px-3 py-1 rounded-lg border border-white">
									Lihat Produk
								</div>
							</div>
						</article>
					</Link>
				</div>
			</section>

			<section aria-label="Produk Terbaru">
				<div className="wrapper flex flex-col gap-6">
					<header className="flex justify-between items-center text-sm">
						<h2 className="text-h2 font-medium *:align-middle">
							<TrendingUp className="text-brand-600" /> Produk Terbaru
						</h2>
						<Link
							className="text-brand-600 *:align-middle"
							to="/browse?sort=newest"
						>
							Lihat Semua <ArrowRight />
						</Link>
					</header>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{(newest?.items ?? []).map((p) => (
							<ProductCard
								key={p.id}
								product={p}
							/>
						))}
					</div>
				</div>
			</section>

			<section aria-label="Produk Unggulan">
				<div className="wrapper flex flex-col gap-6">
					<header className="flex justify-between items-center text-sm">
						<h2 className="text-h2 font-medium">Produk Unggulan</h2>
						<Link
							className="text-brand-600 *:align-middle"
							to="/browse?sort=rating"
						>
							Lihat Semua <ArrowRight />
						</Link>
					</header>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{(featured?.items ?? []).map((p) => (
							<ProductCard
								key={p.id}
								product={p}
							/>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

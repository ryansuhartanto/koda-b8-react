import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import Breadcrumb from "#/components/Breadcrumb";
import { ProductCard } from "#/components/ProductCard";
import Star5 from "#/components/Star5";
import data from "#/data.json";

const PAGE_SIZE = 12;

const sortOptions = [
	{ value: "popular", label: "Paling Populer" },
	{ value: "price-asc", label: "Harga Terendah" },
	{ value: "price-desc", label: "Harga Tertinggi" },
	{ value: "rating", label: "Rating Tertinggi" },
];

// Derive unique categories from products (source of truth for filtering)
const categories = [
	...new Set(data.products.map((p) => p.category)),
].toSorted();

export default function Page() {
	const [searchParams, setSearchParams] = useSearchParams();

	const selectedCategories = searchParams.getAll("category");
	const minRating = searchParams.get("rating")
		? Number(searchParams.get("rating"))
		: undefined;
	const inStockOnly = searchParams.get("inStock") === "1";
	const sort = searchParams.get("sort") ?? "popular";
	const urlTag = searchParams.get("tag");

	// Reset load-more page whenever any filter changes
	const [page, setPage] = useState(1);
	const filterKey = [
		selectedCategories.join(","),
		minRating,
		inStockOnly,
		sort,
		urlTag,
	].join("|");
	useEffect(() => {
		setPage(1);
	}, [filterKey]);

	/** @param {string} name */
	function toggleCategory(name) {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			const cats = next.getAll("category");
			next.delete("category");
			const newCats = cats.includes(name)
				? cats.filter((c) => c !== name)
				: [...cats, name];
			for (const c of newCats) {
				next.append("category", c);
			}
			return next;
		});
	}

	/** @param {number} rating */
	function handleRating(rating) {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (next.get("rating") === String(rating)) {
				next.delete("rating");
			} else {
				next.set("rating", String(rating));
			}
			return next;
		});
	}

	/** @param {boolean} checked */
	function handleInStock(checked) {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (checked) {
				next.set("inStock", "1");
			} else {
				next.delete("inStock");
			}
			return next;
		});
	}

	/** @param {string} value */
	function handleSort(value) {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (value === "popular") {
				next.delete("sort");
			} else {
				next.set("sort", value);
			}
			return next;
		});
	}

	function resetFilters() {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			next.delete("category");
			next.delete("rating");
			next.delete("inStock");
			next.delete("sort");
			return next;
		});
	}

	const hasActiveFilters =
		selectedCategories.length > 0 || minRating !== undefined || inStockOnly;

	const filtered = useMemo(() => {
		let result = data.products;

		if (urlTag) {
			result = result.filter((p) => p.tags.includes(urlTag));
		}
		if (selectedCategories.length > 0) {
			result = result.filter((p) => selectedCategories.includes(p.category));
		}
		if (minRating !== undefined) {
			result = result.filter((p) => p.rating >= minRating);
		}
		if (inStockOnly) {
			result = result.filter((p) => p.stock > 0);
		}

		if (sort === "popular") {
			return [...result].toSorted((a, b) => b.ratingCount - a.ratingCount);
		}
		if (sort === "price-asc") {
			return [...result].toSorted((a, b) => a.price - b.price);
		}
		if (sort === "price-desc") {
			return [...result].toSorted((a, b) => b.price - a.price);
		}
		if (sort === "rating") {
			return [...result].toSorted((a, b) => b.rating - a.rating);
		}
		return result;
	}, [selectedCategories, minRating, inStockOnly, sort, urlTag]);

	const visible = filtered.slice(0, page * PAGE_SIZE);
	const remaining = filtered.length - visible.length;

	const pageTitle =
		urlTag === "promo"
			? "🔥 Produk Promo"
			: (selectedCategories[0] ?? "Semua Produk");

	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-6">
				<Breadcrumb
					items={[{ label: "Beranda", url: "/" }, { label: pageTitle }]}
				/>

				<h1 className="text-2xl font-medium">{pageTitle}</h1>

				<div className="flex gap-8 items-start">
					<aside className="w-56 shrink-0 flex flex-col gap-8 text-sm [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:text-gray-600 [&_label]:flex [&_label]:gap-2 [&_label]:items-center [&_label]:cursor-pointer hover:[&_label]:text-black [&_input]:accent-blue-600 [&_input]:size-4">
						<section aria-label="Category filter">
							<h3>Kategori</h3>
							<ul>
								{categories.map((name) => (
									<li key={name}>
										<label>
											<input
												type="checkbox"
												checked={selectedCategories.includes(name)}
												onChange={() => toggleCategory(name)}
											/>{" "}
											{name}
										</label>
									</li>
								))}
							</ul>
						</section>

						<section aria-label="Rating filter">
							<h3>Rating Minimum</h3>
							<ul>
								{[4, 3, 2].map((rating) => (
									<li key={rating}>
										<label>
											<input
												type="radio"
												name="rating"
												checked={minRating === rating}
												onChange={() => handleRating(rating)}
											/>
											<span
												className="flex gap-0.5"
												aria-label={`${rating} bintang ke atas`}
											>
												<Star5
													count={rating}
													variant="monochrome"
												/>
											</span>{" "}
											ke atas
										</label>
									</li>
								))}
							</ul>
						</section>

						<section>
							<h3>Ketersediaan</h3>
							<ul>
								<li>
									<label>
										<input
											type="checkbox"
											checked={inStockOnly}
											onChange={(e) => handleInStock(e.target.checked)}
										/>{" "}
										Stok tersedia
									</label>
								</li>
							</ul>
						</section>

						{hasActiveFilters && (
							<button
								type="button"
								onClick={resetFilters}
								className="text-sm text-red-500 hover:text-red-700 text-left cursor-pointer"
							>
								Reset filter
							</button>
						)}
					</aside>

					<section
						aria-label="Product list"
						className="flex-1 flex flex-col gap-6"
					>
						<header className="flex justify-between items-center text-sm *:text-gray-500">
							<span>{filtered.length} produk ditemukan</span>
							<div className="flex items-center gap-3">
								<label htmlFor="sort">Urutkan:</label>
								<select
									id="sort"
									value={sort}
									onChange={(e) => handleSort(e.target.value)}
									className="border border-black/10 rounded-lg p-2 px-4 bg-white text-black outline-none focus:border-black/50 transition-colors cursor-pointer"
								>
									{sortOptions.map(({ value, label }) => (
										<option
											key={value}
											value={value}
										>
											{label}
										</option>
									))}
								</select>
							</div>
						</header>

						{visible.length > 0 ? (
							<div className="grid grid-cols-4 gap-4">
								{visible.map((p) => (
									<ProductCard
										key={p.name}
										{...p}
									/>
								))}
							</div>
						) : (
							<div className="py-24 flex flex-col items-center gap-3 text-center text-gray-500 text-sm">
								Tidak ada produk yang sesuai filter.
							</div>
						)}

						{remaining > 0 && (
							<div className="my-4 flex justify-center">
								<button
									type="button"
									onClick={() => setPage((p) => p + 1)}
									className="p-3 px-8 border border-blue-600 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors cursor-pointer bg-white"
								>
									Muat Lebih Banyak ({remaining} produk lagi)
								</button>
							</div>
						)}
					</section>
				</div>
			</div>
		</main>
	);
}

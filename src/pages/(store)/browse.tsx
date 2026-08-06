import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import SlidersHorizontal from "~icons/lucide/sliders-horizontal";
import X from "~icons/lucide/x";

import Breadcrumb from "#/components/Breadcrumb";
import { ProductCard } from "#/components/ProductCard";
import Star5 from "#/components/Star5";
import { Button, buttonVariants } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Drawer, DrawerClose } from "#/components/ui/drawer";
import { Radio, RadioGroup } from "#/components/ui/radio";
import { Select } from "#/components/ui/select";
import data from "#/data.json";
import { cn } from "#/lib/utils";

const PAGE_SIZE = 12;

const sortOptions = [
	{ value: "popular", label: "Paling Populer" },
	{ value: "price-asc", label: "Harga Terendah" },
	{ value: "price-desc", label: "Harga Tertinggi" },
	{ value: "rating", label: "Rating Tertinggi" },
];

const categories = [
	...new Set(data.products.map((p) => p.category)),
].toSorted();

export default function Page(): JSX.Element {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filtersOpen, setFiltersOpen] = useState(false);

	const selectedCategories = searchParams.getAll("category");
	const minRating = searchParams.get("rating")
		? Number(searchParams.get("rating"))
		: undefined;
	const inStockOnly = searchParams.get("inStock") === "1";
	const sort = searchParams.get("sort") ?? "popular";
	const urlTag = searchParams.get("tag");

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

	function toggleCategory(name: string) {
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

	function handleRating(rating: number) {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (rating === 0) {
				next.delete("rating");
			} else {
				next.set("rating", String(rating));
			}
			return next;
		});
	}

	function handleInStock(checked: boolean) {
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

	function handleSort(value: string) {
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

	const filterPanel = (
		<div className="flex flex-col gap-8 text-sm [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3">
			<section aria-label="Category filter">
				<h3>Kategori</h3>
				<ul>
					{categories.map((name) => (
						<li key={name}>
							<Checkbox
								checked={selectedCategories.includes(name)}
								onCheckedChange={() => {
									toggleCategory(name);
								}}
								className="hover:text-black"
							>
								{name}
							</Checkbox>
						</li>
					))}
				</ul>
			</section>

			<section aria-label="Rating filter">
				<h3>Rating Minimum</h3>
				<RadioGroup
					value={minRating ?? 0}
					onValueChange={handleRating}
					className="flex flex-col gap-3"
				>
					<Radio
						value={0}
						className="hover:text-black"
					>
						Semua rating
					</Radio>
					{[4, 3, 2].map((rating) => (
						<Radio
							key={rating}
							value={rating}
							className="hover:text-black"
						>
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
						</Radio>
					))}
				</RadioGroup>
			</section>

			<section>
				<h3>Ketersediaan</h3>
				<ul>
					<li>
						<Checkbox
							checked={inStockOnly}
							onCheckedChange={handleInStock}
							className="hover:text-black"
						>
							Stok tersedia
						</Checkbox>
					</li>
				</ul>
			</section>

			{hasActiveFilters && (
				<Button
					variant="link"
					tone="danger"
					size="none"
					className="text-sm text-left"
					onClick={resetFilters}
				>
					Reset filter
				</Button>
			)}
		</div>
	);

	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-6">
				<Breadcrumb
					items={[{ label: "Beranda", url: "/" }, { label: pageTitle }]}
				/>

				<h1 className="text-2xl font-medium">{pageTitle}</h1>

				<div className="flex gap-8 items-start">
					<aside className="hidden md:flex w-56 shrink-0 flex-col gap-8">
						{filterPanel}
					</aside>

					<section
						aria-label="Product list"
						className="flex-1 flex flex-col gap-6"
					>
						<header className="flex justify-between items-center gap-3 text-sm">
							<div className="flex items-center gap-3">
								<Button
									variant="outline"
									tone={hasActiveFilters ? "primary" : "neutral"}
									size="sm"
									onClick={() => setFiltersOpen(true)}
									className={cn(
										"md:hidden rounded-xl",
										hasActiveFilters && "bg-blue-50",
									)}
								>
									<SlidersHorizontal className="size-4" />
									Filter
									{hasActiveFilters && (
										<span className="grid place-content-center size-4 rounded-full bg-blue-600 text-white text-[10px] font-bold">
											{selectedCategories.length +
												(minRating ? 1 : 0) +
												(inStockOnly ? 1 : 0)}
										</span>
									)}
								</Button>
								<span className="text-gray-500">
									{filtered.length} produk ditemukan
								</span>
							</div>
							<Select
								items={sortOptions}
								value={sort}
								onValueChange={(value) => {
									handleSort(value ?? "popular");
								}}
								label={<span className="hidden sm:block">Urutkan:</span>}
								className="flex-row! items-center gap-3"
								triggerClassName="w-auto rounded-lg py-2 bg-white"
							/>
						</header>

						{visible.length > 0 ? (
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
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
								<Button
									variant="outline"
									className="p-3 px-8"
									onClick={() => setPage((p) => p + 1)}
								>
									Muat Lebih Banyak ({remaining} produk lagi)
								</Button>
							</div>
						)}
					</section>
				</div>
			</div>

			<Drawer
				open={filtersOpen}
				onOpenChange={setFiltersOpen}
				side="bottom"
				title="Filter"
				hideTitle
				className="max-h-[85vh] shadow-2xl"
			>
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
						<h2 className="font-semibold text-gray-900">Filter</h2>
						<DrawerClose
							aria-label="Close filters"
							className={cn(
								buttonVariants({
									variant: "ghost",
									tone: "neutral",
									size: "square",
								}),
								"bg-gray-100 hover:bg-gray-200",
							)}
						>
							<X />
						</DrawerClose>
					</div>
					<div className="flex-1 overflow-y-auto p-5">{filterPanel}</div>
					<div className="p-4 border-t border-black/10 flex gap-3">
						{hasActiveFilters && (
							<Button
								variant="outline"
								tone="danger"
								size="lg"
								className="flex-1 text-sm"
								onClick={() => {
									resetFilters();
									setFiltersOpen(false);
								}}
							>
								Reset
							</Button>
						)}
						<DrawerClose
							className={cn(buttonVariants({ size: "lg" }), "flex-1 text-sm")}
						>
							Lihat {filtered.length} Produk
						</DrawerClose>
					</div>
				</div>
			</Drawer>
		</main>
	);
}

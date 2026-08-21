import type { JSX } from "react";
import { useEffect, useState } from "react";
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
import { cn } from "#/lib/utils";
import catalogApi from "#/services/api/catalog";
import productsApi from "#/services/api/products";
import type { ProductSort } from "#/services/api/products";

const PAGE_SIZE = 12;

const DEFAULT_SORT: ProductSort = "rating";

const sortOptions: Array<{ value: ProductSort; label: string }> = [
	{ value: "rating", label: "Rating Tertinggi" },
	{ value: "newest", label: "Terbaru" },
	{ value: "price_asc", label: "Harga Terendah" },
	{ value: "price_desc", label: "Harga Tertinggi" },
];

function titleFor(query: string, category: string | undefined): string {
	if (query) {
		return `Hasil pencarian "${query}"`;
	}
	return category ?? "Semua Produk";
}

export default function Page(): JSX.Element {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filtersOpen, setFiltersOpen] = useState(false);

	const category = searchParams.get("category") ?? undefined;
	const minRating = searchParams.get("rating")
		? Number(searchParams.get("rating"))
		: undefined;
	const inStockOnly = searchParams.get("inStock") === "1";
	// an unknown sort in the URL earns a 400, so only known ones survive
	const sort =
		sortOptions.find((o) => o.value === searchParams.get("sort"))?.value ??
		DEFAULT_SORT;
	const query = (searchParams.get("q") ?? "").trim();

	const [page, setPage] = useState(1);
	const filterKey = [category, sort, query].join("|");
	useEffect(() => {
		setPage(1);
	}, [filterKey]);

	const { data: categories = [] } = catalogApi.useCategoriesQuery();
	// the API pages by limit and offset, so "load more" grows the limit
	const { data, isFetching } = productsApi.useProductsQuery({
		search: query || undefined,
		category,
		sort,
		limit: page * PAGE_SIZE,
	});

	const products = data?.items ?? [];
	const total = data?.total ?? 0;

	// rating and stock are not query parameters, so they narrow the fetched page
	const visible = products.filter(
		(p) =>
			(minRating === undefined || (p.rating ?? 0) >= minRating) &&
			(!inStockOnly || p.stock > 0),
	);
	const remaining = total - products.length;

	function setParam(name: string, value: string | undefined) {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (value === undefined) {
				next.delete(name);
			} else {
				next.set(name, value);
			}
			return next;
		});
	}

	function resetFilters() {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			for (const name of ["category", "rating", "inStock", "sort"]) {
				next.delete(name);
			}
			return next;
		});
	}

	const hasActiveFilters =
		category !== undefined || minRating !== undefined || inStockOnly;

	const pageTitle = titleFor(query, category);

	let emptyMessage = "Tidak ada produk yang sesuai filter.";
	if (isFetching) {
		emptyMessage = "Memuat produk...";
	} else if (query) {
		emptyMessage = `Tidak ada produk yang cocok dengan "${query}".`;
	}

	const filterPanel = (
		<div className="flex flex-col gap-8 text-sm [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3">
			<section aria-label="Category filter">
				<h3>Kategori</h3>
				<RadioGroup
					value={category ?? ""}
					onValueChange={(value: string) => {
						setParam("category", value || undefined);
					}}
					className="flex flex-col gap-3"
				>
					<Radio
						value=""
						className="hover:text-black"
					>
						Semua kategori
					</Radio>
					{categories.map(({ id, name }) => (
						<Radio
							key={id}
							value={name}
							className="hover:text-black"
						>
							{name}
						</Radio>
					))}
				</RadioGroup>
			</section>

			<section aria-label="Rating filter">
				<h3>Rating Minimum</h3>
				<RadioGroup
					value={minRating ?? 0}
					onValueChange={(value: number) => {
						setParam("rating", value === 0 ? undefined : String(value));
					}}
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
							onCheckedChange={(checked) => {
								setParam("inStock", checked ? "1" : undefined);
							}}
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

				<h1 className="text-h1 font-medium">{pageTitle}</h1>

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
										hasActiveFilters && "bg-brand-50",
									)}
								>
									<SlidersHorizontal className="size-4" />
									Filter
									{hasActiveFilters && (
										<span className="grid place-content-center size-4 rounded-full bg-brand-600 text-white text-[10px] font-bold">
											{(category ? 1 : 0) +
												(minRating ? 1 : 0) +
												(inStockOnly ? 1 : 0)}
										</span>
									)}
								</Button>
								<span className="text-gray-500">{total} produk ditemukan</span>
							</div>
							<Select
								items={sortOptions}
								value={sort}
								onValueChange={(value) => {
									setParam(
										"sort",
										!value || value === DEFAULT_SORT ? undefined : value,
									);
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
										key={p.id}
										product={p}
									/>
								))}
							</div>
						) : (
							<div className="py-24 flex flex-col items-center gap-3 text-center text-gray-500 text-sm">
								{emptyMessage}
							</div>
						)}

						{remaining > 0 && (
							<div className="my-4 flex justify-center">
								<Button
									variant="outline"
									className="p-3 px-8"
									disabled={isFetching}
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
				mobileOnly
				className="max-h-[85vh] shadow-2xl"
			>
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
						<h2 className="text-h3 font-semibold text-gray-900">Filter</h2>
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
							Lihat {visible.length} Produk
						</DrawerClose>
					</div>
				</div>
			</Drawer>
		</main>
	);
}

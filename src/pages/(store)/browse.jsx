import Breadcrumb from "#/components/Breadcrumb";
import { ProductCard } from "#/components/ProductCard";
import Star5 from "#/components/Star5";
import data from "#/data.json";

const displayed = [...data.products]
	.toSorted((a, b) => b.ratingCount - a.ratingCount)
	.slice(0, 12);

export default function Page() {
	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-6">
				<Breadcrumb
					items={[{ label: "Beranda", url: "/" }, { label: "Toko" }]}
				/>

				<h1 className="text-2xl font-medium">Semua Produk</h1>

				<div className="flex gap-8 items-start">
					<aside className="w-56 shrink-0 flex flex-col gap-8 text-sm [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:text-gray-600 [&_label]:flex [&_label]:gap-2 [&_label]:items-center [&_label]:cursor-pointer hover:[&_label]:text-black [&_input]:accent-blue-600 [&_input]:size-4">
						<section>
							<h3>Harga</h3>
							<div className="flex justify-between text-gray-500 text-xs mb-3">
								<span>Rp 0</span>
								<span>Rp 20.000.000</span>
							</div>
							<div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
								<div className="h-full bg-blue-600 w-full" />
							</div>
						</section>

						<section aria-label="Category filter">
							<h3>Kategori</h3>
							<ul>
								{data.categories.map(({ name }) => (
									<li key={name}>
										<label>
											<input
												type="checkbox"
												value={name}
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
												value={rating}
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
										<input type="checkbox" /> Stok tersedia
									</label>
								</li>
							</ul>
						</section>
					</aside>

					<section
						aria-label="Product list"
						className="flex-1 flex flex-col gap-6"
					>
						<header className="flex justify-between items-center text-sm *:text-gray-500">
							<span>18 produk ditemukan</span>
							<div className="flex items-center gap-3">
								<label htmlFor="sort">Urutkan:</label>
								<select
									id="sort"
									className="border border-black/10 rounded-lg p-2 px-4 bg-white text-black outline-none focus:border-black/50 transition-colors cursor-pointer"
								>
									<option>Paling Populer</option>
									<option>Harga Terendah</option>
									<option>Harga Tertinggi</option>
								</select>
							</div>
						</header>

						<div className="grid grid-cols-4 gap-4">
							{displayed.map((p) => (
								<ProductCard
									key={p.name}
									{...p}
								/>
							))}
						</div>

						<div className="my-4 flex justify-center">
							<button
								type="button"
								className="p-3 px-8 border border-blue-600 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors cursor-pointer bg-white"
							>
								Muat Lebih Banyak (6 produk lagi)
							</button>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}

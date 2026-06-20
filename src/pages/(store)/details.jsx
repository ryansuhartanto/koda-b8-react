import { useParams } from "react-router";
import Check from "~icons/lucide/check";
import Heart from "~icons/lucide/heart";
import RefreshCcw from "~icons/lucide/refresh-ccw";
import ShieldCheck from "~icons/lucide/shield-check";
import ShoppingCart from "~icons/lucide/shopping-cart";
import Truck from "~icons/lucide/truck";

import Breadcrumb from "#/components/Breadcrumb";
import { ProductCard } from "#/components/ProductCard";
import QuantityStepper from "#/components/QuantityStepper";
import Star5 from "#/components/Star5";
import data from "#/data.json";
import { rupiah } from "#/lib/utils";

export default function Page() {
	const { slug } = useParams();
	const product = data.products.find((p) => p.slug === slug);

	if (!product) {
		return (
			<main className="pt-6 pb-16 bg-gray-50">
				<div className="wrapper flex flex-col gap-4 items-center text-center py-24">
					<h1 className="text-2xl font-medium text-gray-900">
						Produk Tidak Ditemukan
					</h1>
					<p className="text-sm text-gray-500">
						Produk yang kamu cari mungkin sudah tidak tersedia.
					</p>
				</div>
			</main>
		);
	}

	const {
		name,
		brand,
		category,
		img,
		price,
		originalPrice,
		stock,
		rating,
		ratingCount,
		summary,
	} = product;

	const discount = originalPrice
		? Math.round((1 - price / originalPrice) * 100)
		: null;

	const related = data.products
		.filter((p) => p.category === category && p.name !== name)
		.slice(0, 4);

	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-8">
				<Breadcrumb
					items={[
						{ label: "Beranda", url: "/" },
						{ label: "Toko", url: "/browse" },
						{ label: category, url: `/browse?category=${category}` },
						{ label: name },
					]}
				/>

				<section className="grid grid-cols-2 gap-12 items-start">
					<div className="flex flex-col gap-4">
						<div className="relative bg-white border border-black/10 rounded-2xl overflow-hidden aspect-square">
							{discount && (
								<span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">
									-{discount}%
								</span>
							)}
							<img
								src={img}
								alt={name}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex gap-4">
							<button
								type="button"
								className="size-20 border-2 border-blue-600 rounded-xl overflow-hidden cursor-pointer shrink-0"
							>
								<img
									src={img}
									alt="Thumbnail 1"
									className="w-full h-full object-cover"
								/>
							</button>
							<button
								type="button"
								className="size-20 border border-black/10 rounded-xl overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity shrink-0"
							>
								<img
									src={img}
									alt="Thumbnail 2"
									className="w-full h-full object-cover"
								/>
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-1">
							<div className="text-sm text-gray-500">
								{brand} &bull; {category}
							</div>
							<h1 className="text-3xl font-bold text-gray-900">{name}</h1>
							<div className="flex items-center gap-4 text-sm">
								<div className="flex items-center gap-1 tabular-nums text-amber-400">
									<Star5 count={Math.round(rating)} />
									<span className="ml-1 text-gray-900">{rating}</span>
									<span className="text-gray-500">({ratingCount})</span>
								</div>
								<div className="flex items-center gap-1 p-0.5 px-2 rounded-full text-xs text-green-600 bg-green-50">
									<Check /> Stok tersedia ({stock})
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-1 p-4 rounded-xl bg-blue-50">
							<div className="flex items-center gap-3 price">
								<ins className="text-3xl font-bold">{rupiah(price)}</ins>
								{originalPrice && (
									<>
										<del className="text-lg">{rupiah(originalPrice)}</del>
										<span className="bg-red-600 text-white text-xs font-medium p-0.5 px-2 rounded-full">
											Hemat {discount}%
										</span>
									</>
								)}
							</div>
							{originalPrice && (
								<span className="text-green-600 text-sm font-medium">
									Kamu hemat {rupiah(originalPrice - price)}
								</span>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<div className="text-sm text-gray-500">
								Warna: <span className="text-blue-600">Hitam</span>
							</div>
							<div className="flex gap-2">
								{
									/** @type {[string, boolean][]} */ ([
										["Hitam", true],
										["Putih", false],
										["Biru", false],
									]).map(([color, active]) => (
										<button
											key={color}
											type="button"
											className={`p-1.5 px-3 text-sm border rounded-lg cursor-pointer font-medium ${active ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"}`}
										>
											{color}
										</button>
									))
								}
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-sm text-gray-900">Jumlah</span>
							<div className="flex items-center gap-4">
								<QuantityStepper max={stock} />
								<span className="text-sm text-gray-500">Stok: {stock} pcs</span>
							</div>
						</div>

						<div className="flex gap-4 mb-8 [&_button]:cursor-pointer">
							<button
								type="button"
								className="flex-1 flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 font-medium bg-orange-50/50 py-3 rounded-xl hover:bg-orange-50 transition-colors"
							>
								<ShoppingCart className="size-5" /> Tambah ke Keranjang
							</button>
							<button
								type="button"
								className="flex-1 bg-orange-500 text-white font-medium py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/20"
							>
								Beli Sekarang
							</button>
							<button
								type="button"
								className="w-14 flex items-center justify-center border border-gray-300 text-gray-500 bg-white rounded-xl hover:bg-gray-50 transition-colors"
							>
								<Heart className="size-5" />
							</button>
						</div>

						<div className="grid grid-cols-3 gap-4 *:p-2">
							{[
								[Truck, "Gratis Ongkir", "Min. Rp 100.000"],
								[ShieldCheck, "Pembayaran Aman", "SSL Terenkripsi"],
								[RefreshCcw, "Retur 30 Hari", "Gratis retur"],
							].map(([Icon, title, sub]) => (
								<div
									key={title}
									className="bg-gray-200/50 rounded-xl flex flex-col items-center justify-center text-center gap-2"
								>
									<Icon className="text-blue-600 size-5" />
									<div>
										<div className="text-xs font-medium text-gray-900">
											{title}
										</div>
										<div className="text-[10px] text-gray-500 mt-0.5">
											{sub}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="border border-black/10 rounded-2xl overflow-hidden mt-4">
					<div className="flex border-b border-black/10 bg-white">
						<button
							type="button"
							className="p-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600 cursor-pointer"
						>
							Deskripsi
						</button>
						<button
							type="button"
							className="p-4 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
						>
							Spesifikasi
						</button>
						<button
							type="button"
							className="p-4 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
						>
							Ulasan ({ratingCount})
						</button>
					</div>
					<div className="p-6 bg-white text-gray-600 leading-relaxed">
						{summary}
					</div>
				</section>

				{related.length > 0 && (
					<section className="flex flex-col gap-6">
						<h2 className="text-xl font-medium">Produk Terkait</h2>
						<div className="grid grid-cols-4 gap-4">
							{related.map((p) => (
								<ProductCard
									key={p.name}
									{...p}
								/>
							))}
						</div>
					</section>
				)}
			</div>
		</main>
	);
}

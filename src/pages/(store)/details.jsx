import * as Lucide from "lucide-react";

import Breadcrumb from "#/components/Breadcrumb";
import { ProductCard } from "#/components/ProductCard";
import data from "#/data.json";

const relatedNames = [
	"Smartphone 5G Ultra",
	"Smartwatch Series 5",
	'Tablet 10.5" WiFi + 4G',
	"Speaker Bluetooth Portable",
];
const related = relatedNames
	.map((name) => data.products.find((p) => p.name === name))
	.filter(Boolean);

export default function Page() {
	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-8">
				<Breadcrumb
					items={[
						{ label: "Beranda", url: "#" },
						{ label: "Toko", url: "#" },
						{ label: "Elektronik", url: "#" },
						{ label: "Headphone Wireless Premium" },
					]}
				/>

				<section className="grid grid-cols-2 gap-12 items-start">
					<div className="flex flex-col gap-4">
						<div className="relative bg-white border border-black/10 rounded-2xl overflow-hidden aspect-square">
							<span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">
								-31%
							</span>
							<img
								src="images/product/soundwave-headphone_wireless_premium.png"
								alt="Headphone Wireless Premium"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex gap-4">
							<button
								type="button"
								className="size-20 border-2 border-blue-600 rounded-xl overflow-hidden cursor-pointer shrink-0"
							>
								<img
									src="images/product/soundwave-headphone_wireless_premium.png"
									alt="Thumbnail 1"
									className="w-full h-full object-cover"
								/>
							</button>
							<button
								type="button"
								className="size-20 border border-black/10 rounded-xl overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity shrink-0"
							>
								<img
									src="images/product/soundwave-headphone_wireless_premium_2.png"
									alt="Thumbnail 2"
									className="w-full h-full object-cover"
								/>
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-1">
							<div className="text-sm text-gray-500">
								SoundWave &bull; Audio
							</div>
							<h1 className="text-3xl font-bold text-gray-900">
								Headphone Wireless Premium
							</h1>
							<div className="flex items-center gap-4 text-sm">
								<div className="flex items-center gap-1 tabular-nums text-amber-400">
									{Array.from({ length: 5 }, (_, i) => (
										<Lucide.Star
											key={i}
											fill="currentColor"
											strokeWidth={0}
											className="size-4"
										/>
									))}
									<span className="ml-1 text-gray-900">4.8</span>
									<span className="text-gray-500">(512)</span>
								</div>
								<div className="flex items-center gap-1 p-0.5 px-2 rounded-full text-xs text-green-600 bg-green-50">
									<Lucide.Check /> Stok tersedia (45)
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-1 p-4 rounded-xl bg-blue-50">
							<div className="flex items-center gap-3 price">
								<ins className="text-3xl font-bold">Rp 450.000</ins>
								<del className="text-lg">Rp 650.000</del>
								<span className="bg-red-600 text-white text-xs font-medium p-0.5 px-2 rounded-full">
									Hemat 31%
								</span>
							</div>
							<span className="text-green-600 text-sm font-medium">
								Kamu hemat Rp 200.000
							</span>
						</div>

						<div className="flex flex-col gap-2">
							<div className="text-sm text-gray-500">
								Warna: <span className="text-blue-600">Hitam</span>
							</div>
							<div className="flex gap-2">
								{[
									["Hitam", true],
									["Putih", false],
									["Biru", false],
								].map(([color, active]) => (
									<button
										key={color}
										type="button"
										className={`p-1.5 px-3 text-sm border rounded-lg cursor-pointer font-medium ${active ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"}`}
									>
										{color}
									</button>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-sm text-gray-900">Jumlah</span>
							<div className="flex items-center gap-4">
								<div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-10 w-32 bg-white">
									<button
										type="button"
										className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
									>
										{"-"}
									</button>
									<input
										type="number"
										defaultValue={1}
										min={1}
										className="flex-1 w-full text-center text-sm font-medium outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
									/>
									<button
										type="button"
										className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
									>
										{"+"}
									</button>
								</div>
								<span className="text-sm text-gray-500">Stok: 45 pcs</span>
							</div>
						</div>

						<div className="flex gap-4 mb-8 [&_button]:cursor-pointer">
							<button
								type="button"
								className="flex-1 flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 font-medium bg-orange-50/50 py-3 rounded-xl hover:bg-orange-50 transition-colors"
							>
								<Lucide.ShoppingCart className="size-5" /> Tambah ke Keranjang
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
								<Lucide.Heart className="size-5" />
							</button>
						</div>

						<div className="grid grid-cols-3 gap-4 *:p-2">
							{[
								[Lucide.Truck, "Gratis Ongkir", "Min. Rp 100.000"],
								[Lucide.ShieldCheck, "Pembayaran Aman", "SSL Terenkripsi"],
								[Lucide.RefreshCcw, "Retur 30 Hari", "Gratis retur"],
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
							Ulasan (2)
						</button>
					</div>
					<div className="p-6 bg-white text-gray-600 leading-relaxed">
						Headphone wireless dengan teknologi noise-cancelling terdepan.
						Nikmati musik favoritmu tanpa gangguan dengan kualitas suara yang
						memukau.
					</div>
				</section>

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
			</div>
		</main>
	);
}

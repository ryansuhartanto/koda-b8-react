import Heart from "~icons/lucide/heart";
import ShieldCheck from "~icons/lucide/shield-check";
import Tag from "~icons/lucide/tag";
import Trash2 from "~icons/lucide/trash-2";

import { ProductCard } from "#/components/ProductCard";
import data from "#/data.json";

const suggestionNames = [
	"Headphone Wireless Premium",
	"Smartphone 5G Ultra",
	"Smartwatch Series 5",
	"Sneakers Sport Runfast",
];
const suggestions = suggestionNames
	.map((name) => data.products.find((p) => p.name === name))
	.filter(Boolean);

export default function Page() {
	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-8">
				<h1 className="text-2xl font-medium text-gray-900">
					Keranjang Belanja (<span className="tabular-nums">1</span> item)
				</h1>

				<div className="grid grid-cols-3 gap-8 items-start">
					<section
						aria-label="Cart items"
						className="col-span-2 flex flex-col gap-4"
					>
						<article className="bg-white border border-black/10 rounded-2xl p-5 flex gap-6">
							<div className="size-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
								<img
									src="images/product/soundwave-headphone_wireless_premium.png"
									alt="Headphone Wireless Premium"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex-1 flex flex-col justify-between gap-2">
								<div className="flex justify-between items-start">
									<div className="flex flex-col gap-1">
										<h3 className="font-medium text-gray-900 text-sm">
											Headphone Wireless Premium
										</h3>
										<div className="text-xs text-gray-500">Hitam</div>
									</div>
									<button
										type="button"
										className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
										aria-label="Hapus item"
									>
										<Trash2 className="size-5" />
									</button>
								</div>
								<div className="flex justify-between items-end">
									<div className="flex flex-col gap-2 items-start">
										<div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-8 w-24 bg-white">
											<button
												type="button"
												className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
											>
												&minus;
											</button>
											<input
												type="number"
												defaultValue={1}
												min={1}
												className="flex-1 w-full text-center text-sm font-medium outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
											/>
											<button
												type="button"
												className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
											>
												&plus;
											</button>
										</div>
										<button
											type="button"
											className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 cursor-pointer transition-colors"
										>
											<Heart className="size-4" /> Simpan ke Wishlist
										</button>
									</div>
									<span className="text-blue-600 font-medium">Rp 450.000</span>
								</div>
							</div>
						</article>

						<div className="flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-6">
							<h2 className="flex items-center gap-2 font-medium text-gray-900">
								<Tag className="text-blue-600" /> Kode Promo
							</h2>
							<div className="flex flex-col gap-3">
								<form className="flex gap-2">
									<input
										type="text"
										placeholder="Masukkan kode promo"
										className="flex-1 border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white"
									/>
									<button
										type="submit"
										className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer shrink-0"
									>
										Terapkan
									</button>
								</form>
								<div className="text-xs text-gray-500">
									Coba: HEMAT10, BELIMUDAH, atau NEWUSER
								</div>
							</div>
						</div>
					</section>

					<aside className="flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5 sticky top-36">
						<h2 className="text-lg font-medium text-gray-900">
							Ringkasan Pesanan
						</h2>
						<div className="flex flex-col gap-2 text-sm text-gray-600">
							<div className="flex justify-between">
								<span>Subtotal (1 item)</span>
								<span>Rp 450.000</span>
							</div>
							<div className="flex justify-between">
								<span>Ongkos Kirim</span>
								<span className="text-green-600 font-medium">GRATIS</span>
							</div>
							<hr className="border-gray-200" />
							<div className="flex justify-between items-center">
								<span className="font-medium text-gray-900">Total</span>
								<span className="font-bold text-blue-600">Rp 450.000</span>
							</div>
						</div>
						<button
							type="button"
							className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 font-medium flex justify-center items-center gap-2 cursor-pointer shadow-sm shadow-orange-500/20 transition-colors"
						>
							<ShieldCheck className="size-5" /> Checkout Aman
						</button>
						<div className="flex flex-col items-center gap-2 text-center text-xs text-gray-500">
							<div className="flex items-center gap-1 text-yellow-600 font-medium">
								🔒 Pembayaran 100% Aman
							</div>
							<div>
								Metode: Transfer Bank &bull; Virtual Account &bull; Kartu Kredit
								&bull; e-Wallet
							</div>
						</div>
					</aside>
				</div>

				<section className="flex flex-col gap-6">
					<h2 className="text-xl font-medium">Mungkin Kamu Suka Ini</h2>
					<div className="grid grid-cols-4 gap-4">
						{suggestions.map((p) => (
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

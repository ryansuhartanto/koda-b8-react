import { Link } from "react-router";
import Heart from "~icons/lucide/heart";
import ShieldCheck from "~icons/lucide/shield-check";
import Tag from "~icons/lucide/tag";
import Trash2 from "~icons/lucide/trash-2";

import { ProductCard } from "#/components/ProductCard";
import QuantityStepper from "#/components/QuantityStepper";
import { useAuth } from "#/context/auth";
import data from "#/data.json";
import { rupiah } from "#/lib/utils";

const suggestionNames = [
	"Headphone Wireless Premium",
	"Smartphone 5G Ultra",
	"Smartwatch Series 5",
	"Sneakers Sport Runfast",
];
const suggestions = suggestionNames
	.map((name) => data.products.find((p) => p.name === name))
	.filter((name) => name !== undefined);

export default function Page() {
	const { user, removeFromCart, updateCartQty, toggleWishlist } = useAuth();

	const cartItems = (user?.cart ?? [])
		.map((item) => {
			const product = data.products.find((p) => p.name === item.productName);
			if (!product) {
				return;
			}
			return Object.assign(product, { quantity: item.quantity });
		})
		.filter((product) => product !== undefined);

	const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-8">
				<h1 className="text-2xl font-medium text-gray-900">
					Keranjang Belanja (
					<span className="tabular-nums">{cartItems.length}</span> item)
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
					<section
						aria-label="Cart items"
						className="lg:col-span-2 flex flex-col gap-4"
					>
						{cartItems.length > 0 ? (
							cartItems.map((item) => (
								<article
									key={item.name}
									className="bg-white border border-black/10 rounded-2xl p-5 flex gap-6"
								>
									<div className="size-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
										<img
											src={item.img}
											alt={item.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex-1 flex flex-col justify-between gap-2">
										<div className="flex justify-between items-start">
											<div className="flex flex-col gap-1">
												<h3 className="font-medium text-gray-900 text-sm">
													{item.name}
												</h3>
												<div className="text-xs text-gray-500">
													{item.brand}
												</div>
											</div>
											<button
												type="button"
												onClick={() => removeFromCart(item.name)}
												className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
												aria-label="Hapus item"
											>
												<Trash2 className="size-5" />
											</button>
										</div>
										<div className="flex justify-between items-end">
											<div className="flex flex-col gap-2 items-start">
												<QuantityStepper
													size="sm"
													value={item.quantity}
													max={item.stock}
													onChange={(qty) => updateCartQty(item.name, qty)}
												/>
												<button
													type="button"
													onClick={() => {
														toggleWishlist(item.name);
														removeFromCart(item.name);
													}}
													className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 cursor-pointer transition-colors"
												>
													<Heart className="size-4" /> Simpan ke Wishlist
												</button>
											</div>
											<span className="text-blue-600 font-medium">
												{rupiah(item.price * item.quantity)}
											</span>
										</div>
									</div>
								</article>
							))
						) : (
							<div className="bg-white border border-black/10 rounded-2xl p-12 flex flex-col items-center gap-3 text-center text-gray-500 text-sm">
								Keranjang kamu masih kosong.
							</div>
						)}

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

					<aside className="flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5 lg:sticky lg:top-36">
						<h2 className="text-lg font-medium text-gray-900">
							Ringkasan Pesanan
						</h2>
						<div className="flex flex-col gap-2 text-sm text-gray-600">
							<div className="flex justify-between">
								<span>Subtotal ({cartItems.length} item)</span>
								<span>{rupiah(subtotal)}</span>
							</div>
							<div className="flex justify-between">
								<span>Ongkos Kirim</span>
								<span className="text-green-600 font-medium">GRATIS</span>
							</div>
							<hr className="border-gray-200" />
							<div className="flex justify-between items-center">
								<span className="font-medium text-gray-900">Total</span>
								<span className="font-bold text-blue-600">
									{rupiah(subtotal)}
								</span>
							</div>
						</div>
						<Link
							to="/checkout"
							className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 font-medium flex justify-center items-center gap-2 cursor-pointer shadow-sm shadow-orange-500/20 transition-colors"
						>
							<ShieldCheck className="size-5" /> Checkout Aman
						</Link>
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
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

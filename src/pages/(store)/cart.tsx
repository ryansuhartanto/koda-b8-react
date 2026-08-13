import type { JSX } from "react";
import { Link } from "react-router";
import Heart from "~icons/lucide/heart";
import ShieldCheck from "~icons/lucide/shield-check";
import Trash2 from "~icons/lucide/trash-2";

import { ProductCard } from "#/components/ProductCard";
import QuantityStepper from "#/components/QuantityStepper";
import { Button } from "#/components/ui/button";
import { toggle } from "#/features/wishlist";
import { rupiah } from "#/lib/utils";
import cartApi from "#/services/api/cart";
import productsApi from "#/services/api/products";
import { useAppDispatch } from "#/store";

export default function Page(): JSX.Element {
	const dispatch = useAppDispatch();
	const { data: cart } = cartApi.useCartQuery();
	const [setCartItem] = cartApi.useSetCartItemMutation();
	const [removeCartItem] = cartApi.useRemoveCartItemMutation();
	const { data: suggestions } = productsApi.useProductsQuery({
		sort: "rating",
		limit: 4,
	});

	const items = cart?.items ?? [];
	const subtotal = cart?.subtotal_idr ?? 0;

	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-8">
				<h1 className="text-h1 font-medium text-gray-900">
					Keranjang Belanja (
					<span className="tabular-nums">{items.length}</span> item)
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
					<section
						aria-label="Cart items"
						className="lg:col-span-2 flex flex-col gap-4"
					>
						{items.length > 0 ? (
							items.map((item) => (
								<article
									key={item.id_variant}
									className="bg-white border border-black/10 rounded-2xl p-5 flex gap-6"
								>
									<div className="size-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
										<img
											src={item.urls?.[0] ?? ""}
											alt={item.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex-1 flex flex-col justify-between gap-2">
										<div className="flex justify-between items-start">
											<div className="flex flex-col gap-1">
												<Link
													to={`/details/${item.id_product}`}
													className="font-medium text-gray-900 text-body"
												>
													{item.name}
												</Link>
												<div className="text-xs text-gray-500">
													{(item.variant_options ?? [])
														.map((o) => `${o.option}: ${o.value}`)
														.join(" · ")}
												</div>
											</div>
											<Button
												variant="icon"
												tone="danger"
												size="none"
												className="text-gray-400"
												onClick={() => void removeCartItem(item.id_variant)}
												aria-label="Hapus item"
											>
												<Trash2 className="size-5" />
											</Button>
										</div>
										<div className="flex justify-between items-end">
											<div className="flex flex-col gap-2 items-start">
												<QuantityStepper
													size="sm"
													value={item.quantity}
													max={item.inventory}
													onChange={(quantity) => {
														void setCartItem({
															id_variant: item.id_variant,
															quantity,
														});
													}}
												/>
												<Button
													variant="icon"
													tone="neutral"
													size="none"
													className="flex items-center gap-1 text-xs text-gray-500"
													onClick={() => {
														dispatch(toggle(item.id_product));
														void removeCartItem(item.id_variant);
													}}
												>
													<Heart className="size-4" /> Simpan ke Wishlist
												</Button>
											</div>
											<span className="text-brand-600 font-medium">
												{rupiah(item.price_idr * item.quantity)}
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
					</section>

					<aside className="flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5 lg:sticky lg:top-36">
						<h2 className="text-h2 font-medium text-gray-900">
							Ringkasan Pesanan
						</h2>
						<div className="flex flex-col gap-2 text-sm text-gray-600">
							<div className="flex justify-between">
								<span>Subtotal ({items.length} item)</span>
								<span>{rupiah(subtotal)}</span>
							</div>
							<div className="flex justify-between">
								<span>Ongkos Kirim</span>
								<span className="text-gray-500">Dihitung saat checkout</span>
							</div>
							<hr className="border-gray-200" />
							<div className="flex justify-between items-center">
								<span className="font-medium text-gray-900">Total</span>
								<span className="font-bold text-brand-600">
									{rupiah(subtotal)}
								</span>
							</div>
						</div>
						<Link
							to="/checkout"
							className="w-full bg-accent-500 text-white py-3 rounded-xl hover:bg-accent-600 font-medium flex justify-center items-center gap-2 cursor-pointer shadow-sm shadow-accent-500/20 transition-colors"
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
					<h2 className="text-h2 font-medium">Mungkin Kamu Suka Ini</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{(suggestions?.items ?? []).map((p) => (
							<ProductCard
								key={p.id}
								product={p}
							/>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}

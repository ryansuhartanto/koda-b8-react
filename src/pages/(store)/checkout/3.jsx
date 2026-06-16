import { Link } from "react-router";
import ShieldCheck from "~icons/lucide/shield-check";

import { Stepper, Summary } from "#/components/Checkout";
import { OrderReviewItem } from "#/components/ProductCard";
import data from "#/data.json";

const cartItem = { ...data.products[0], quantity: 1 };
const formattedTotal = `Rp ${(cartItem.price * cartItem.quantity).toLocaleString("id-ID")}`;

export default function Page() {
	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-12">
				<Stepper activeStep={3} />

				<div className="grid grid-cols-3 gap-8 items-start">
					<section
						aria-label="Order confirmation"
						className="col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
					>
						<h2 className="text-lg font-medium text-gray-900">
							Konfirmasi Pesanan
						</h2>

						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
									<h3 className="text-sm font-medium text-gray-900">
										Alamat Pengiriman
									</h3>
									<p className="text-sm text-gray-600">
										Budi Santoso &bull; 0812-3456-7890
									</p>
									<p className="text-sm text-gray-600">
										Jl. Kebon Jeruk No. 15, Jakarta Barat, DKI Jakarta 11530
									</p>
								</div>
								<div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
									<h3 className="text-sm font-medium text-gray-900">
										Metode Pengiriman
									</h3>
									<p className="text-sm text-gray-600">
										JNE Reguler &bull; 3-5 hari kerja
									</p>
								</div>
								<div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl">
									<h3 className="text-sm font-medium text-gray-900">
										Produk yang Dipesan
									</h3>
									<div className="flex flex-col gap-3">
										<OrderReviewItem {...cartItem} />
									</div>
								</div>
							</div>

							<div className="flex gap-3 items-center p-4 rounded-xl bg-blue-50 text-blue-700 text-xs">
								<ShieldCheck className="size-5 shrink-0" />
								<p>
									Dengan menekan 'Bayar Sekarang', kamu menyetujui Syarat &amp;
									Ketentuan kami. Pembayaran baru akan diproses setelah kamu
									mengkonfirmasi di langkah ini.
								</p>
							</div>

							<div className="flex gap-4">
								<Link
									to="/checkout/2"
									className="px-6 py-3 border border-black/10 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
								>
									Kembali
								</Link>
								<Link
									to="/checkout/4"
									className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 font-medium cursor-pointer shadow-sm shadow-orange-500/20 transition-colors"
								>
									🔒 Bayar {formattedTotal} Sekarang
								</Link>
							</div>
						</div>
					</section>

					<Summary
						items={[cartItem]}
						subtotal={formattedTotal}
					/>
				</div>
			</div>
		</main>
	);
}

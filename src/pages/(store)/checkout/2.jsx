import CreditCard from "~icons/lucide/credit-card";
import Lock from "~icons/lucide/lock";

import { Stepper, Summary } from "#/components/Checkout";
import data from "#/data.json";

const cartItem = { ...data.products[0], quantity: 1 };
const formattedTotal = `Rp ${(cartItem.price * cartItem.quantity).toLocaleString("id-ID")}`;

const paymentMethods = [
	{
		id: "bca",
		label: "Virtual Account BCA",
		badge: "BCA",
		badgeClass: "bg-gray-200 text-gray-800",
		defaultChecked: true,
	},
	{
		id: "bni",
		label: "Virtual Account BNI",
		badge: "BNI",
		badgeClass: "bg-gray-200 text-gray-800",
	},
	{ id: "card", label: "Kartu Kredit / Debit", useIcon: true },
	{
		id: "gopay",
		label: "GoPay",
		badge: "GP",
		badgeClass: "bg-gray-800 text-white",
	},
	{
		id: "ovo",
		label: "OVO",
		badge: "OVO",
		badgeClass: "bg-purple-600 text-white",
	},
	{
		id: "dana",
		label: "DANA",
		badge: "DN",
		badgeClass: "bg-blue-500 text-white",
	},
];

export default function Page() {
	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-12">
				<Stepper activeStep={2} />

				<div className="grid grid-cols-3 gap-8 items-start">
					<section
						aria-label="Payment methods"
						className="col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
					>
						<h2 className="flex items-center gap-2 text-lg font-medium text-gray-900">
							<CreditCard className="text-blue-600" /> Metode Pembayaran
						</h2>

						<div className="flex flex-col gap-6">
							<div className="grid grid-cols-2 gap-4">
								{paymentMethods.map(
									({
										id,
										label,
										badge,
										badgeClass,
										useIcon,
										defaultChecked,
									}) => (
										<label
											key={id}
											className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${defaultChecked ? "border-blue-600 bg-blue-50/30" : "border-black/10 hover:border-blue-600"}`}
										>
											<input
												type="radio"
												name="payment"
												defaultChecked={defaultChecked}
												className="size-4 accent-blue-600 shrink-0"
											/>
											{useIcon ? (
												<CreditCard className="text-gray-400 size-6 shrink-0" />
											) : (
												<div
													className={`w-8 h-5 rounded flex items-center justify-center text-[8px] font-bold shrink-0 ${badgeClass}`}
												>
													{badge}
												</div>
											)}
											<span className="text-sm font-medium text-gray-900">
												{label}
											</span>
										</label>
									),
								)}
							</div>

							<div className="flex gap-3 items-center p-4 rounded-xl bg-blue-50 text-blue-700 text-xs">
								<Lock className="size-5 shrink-0" />
								Informasi pembayaranmu dienkripsi dengan SSL 256-bit. Kami tidak
								menyimpan data kartu kreditmu.
							</div>

							<div className="flex gap-4">
								<button
									type="button"
									className="px-6 py-3 border border-black/10 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
								>
									Kembali
								</button>
								<button
									type="button"
									className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium cursor-pointer transition-colors"
								>
									Lanjut ke Konfirmasi &gt;
								</button>
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

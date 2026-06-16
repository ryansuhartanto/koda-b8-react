import Truck from "~icons/lucide/truck";

import { Stepper, Summary } from "#/components/Checkout";
import data from "#/data.json";

const cartItem = { ...data.products[0], quantity: 1 };
const formattedTotal = `Rp ${(cartItem.price * cartItem.quantity).toLocaleString("id-ID")}`;

const shippingMethods = [
	{ label: "JNE Reguler", sub: "3-5 hari kerja", defaultChecked: true },
	{ label: "JNE Express", sub: "1-2 hari kerja" },
	{ label: "Same Day Delivery", sub: "Hari ini (sebelum 16:00)" },
];

export default function Page() {
	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-12">
				<Stepper activeStep={1} />

				<div className="grid grid-cols-3 gap-8 items-start">
					<section
						aria-label="Shipping details"
						className="col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
					>
						<h2 className="flex items-center gap-2 text-lg font-medium text-gray-900">
							<Truck className="text-blue-600" /> Alamat Pengiriman
						</h2>

						<form className="flex flex-col gap-6">
							<div className="flex flex-col gap-4">
								<div className="grid grid-cols-2 gap-4">
									{[
										["Nama Penerima", "text", "Budi Santoso"],
										["Nomor Telepon", "tel", "0812-3456-7890"],
									].map(([label, type, val]) => (
										<label
											key={label}
											className="flex flex-col gap-2 text-sm text-gray-600"
										>
											<span className="after:content-['*'] after:ml-1 after:text-red-500">
												{label}
											</span>
											<input
												type={type}
												defaultValue={val}
												required
												className="border border-black/10 rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white text-gray-900"
											/>
										</label>
									))}
								</div>

								{[
									["Email", "email", "budi@email.com"],
									["Alamat Lengkap", "text", "Jl. Kebon Jeruk No. 15"],
								].map(([label, type, val]) => (
									<label
										key={label}
										className="flex flex-col gap-2 text-sm text-gray-600"
									>
										<span className="after:content-['*'] after:ml-1 after:text-red-500">
											{label}
										</span>
										<input
											type={type}
											defaultValue={val}
											required
											className="border border-black/10 rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white text-gray-900"
										/>
									</label>
								))}

								<div className="grid grid-cols-2 gap-4">
									{[
										["Kota", "text", "Jakarta Barat"],
										["Provinsi", "text", "DKI Jakarta"],
									].map(([label, type, val]) => (
										<label
											key={label}
											className="flex flex-col gap-2 text-sm text-gray-600"
										>
											<span className="after:content-['*'] after:ml-1 after:text-red-500">
												{label}
											</span>
											<input
												type={type}
												defaultValue={val}
												required
												className="border border-black/10 rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white text-gray-900"
											/>
										</label>
									))}
								</div>

								<div className="grid grid-cols-2 gap-4">
									<label className="flex flex-col gap-2 text-sm text-gray-600">
										<span className="after:content-['*'] after:ml-1 after:text-red-500">
											Kode Pos
										</span>
										<input
											type="text"
											defaultValue="11530"
											required
											className="border border-black/10 rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white text-gray-900"
										/>
									</label>
									<label className="flex flex-col gap-2 text-sm text-gray-600">
										<span>Catatan (opsional)</span>
										<input
											type="text"
											placeholder="Warna pagar, dll."
											className="border border-black/10 rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white text-gray-900"
										/>
									</label>
								</div>
							</div>

							<hr className="border-gray-100" />

							<div className="flex flex-col gap-4">
								<h3 className="text-base font-medium text-gray-900">
									Metode Pengiriman
								</h3>
								<div className="flex flex-col gap-3">
									{shippingMethods.map(({ label, sub, defaultChecked }) => (
										<label
											key={label}
											className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${defaultChecked ? "border-blue-600 bg-blue-50/30" : "border-black/10 hover:border-blue-600"}`}
										>
											<div className="flex items-center gap-3">
												<input
													type="radio"
													name="shipping"
													defaultChecked={defaultChecked}
													className="size-4 accent-blue-600"
												/>
												<div className="flex flex-col">
													<span className="text-sm font-medium text-gray-900">
														{label}
													</span>
													<span className="text-xs text-gray-500">{sub}</span>
												</div>
											</div>
											<span className="text-sm font-medium text-green-600">
												GRATIS
											</span>
										</label>
									))}
								</div>
							</div>

							<button
								type="button"
								className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium cursor-pointer transition-colors"
							>
								Lanjut ke Pembayaran &gt;
							</button>
						</form>
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

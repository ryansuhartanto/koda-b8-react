import { Link } from "react-router";
import Check from "~icons/lucide/check";
import CheckCircle2 from "~icons/lucide/check-circle-2";
import CreditCard from "~icons/lucide/credit-card";
import Lock from "~icons/lucide/lock";
import MapPin from "~icons/lucide/map-pin";
import Package from "~icons/lucide/package";
import ShieldCheck from "~icons/lucide/shield-check";
import Truck from "~icons/lucide/truck";

import { Stepper, Summary } from "#/components/Checkout";
import FormField from "#/components/FormField";
import { OrderReviewItem } from "#/components/ProductCard";
import data from "#/data.json";
import { useCheckout } from "#/hooks/useCheckout";

/**
 * @typedef {{ name: string; brand: string; category: string; img: string; price: number; originalPrice: number | null; stock: number; rating: number; ratingCount: number; tags: string[] }} Product
 */
const cartItem = { .../** @type {Product} */ (data.products[0]), quantity: 1 };
const formattedTotal = `Rp ${(cartItem.price * cartItem.quantity).toLocaleString("id-ID")}`;

const shippingMethods = [
	{ label: "JNE Reguler", sub: "3-5 hari kerja", defaultChecked: true },
	{ label: "JNE Express", sub: "1-2 hari kerja" },
	{ label: "Same Day Delivery", sub: "Hari ini (sebelum 16:00)" },
];

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

const timeline = [
	{ Icon: Check, label: "Pesanan Diterima", sub: "Baru saja", done: true },
	{ Icon: Package, label: "Sedang Dikemas", sub: "Estimasi 1-2 jam" },
	{ Icon: Truck, label: "Dalam Pengiriman", sub: "3-5 hari kerja" },
	{ Icon: MapPin, label: "Terkirim", sub: "14-16 Juni 2026" },
];

/**
 * @param {{ onNext: () => void }} props
 */
function StepShipping({ onNext }) {
	return (
		<section
			aria-label="Shipping details"
			className="col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
		>
			<h2 className="flex items-center gap-2 text-lg font-medium text-gray-900">
				<Truck className="text-blue-600" /> Alamat Pengiriman
			</h2>

			<form
				className="flex flex-col gap-6"
				onSubmit={(e) => {
					e.preventDefault();
					onNext();
				}}
			>
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-2 gap-4">
						<FormField
							label="Nama Penerima"
							defaultValue="Budi Santoso"
							required
						/>
						<FormField
							label="Nomor Telepon"
							type="tel"
							defaultValue="0812-3456-7890"
							required
						/>
					</div>

					<FormField
						label="Email"
						type="email"
						defaultValue="budi@email.com"
						required
					/>
					<FormField
						label="Alamat Lengkap"
						defaultValue="Jl. Kebon Jeruk No. 15"
						required
					/>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							label="Kota"
							defaultValue="Jakarta Barat"
							required
						/>
						<FormField
							label="Provinsi"
							defaultValue="DKI Jakarta"
							required
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							label="Kode Pos"
							defaultValue="11530"
							required
						/>
						<FormField
							label="Catatan (opsional)"
							placeholder="Warna pagar, dll."
						/>
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
					type="submit"
					className="w-full block text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium cursor-pointer transition-colors"
				>
					Lanjut ke Pembayaran &gt;
				</button>
			</form>
		</section>
	);
}

/**
 * @param {{ onNext: () => void; onBack: () => void }} props
 */
function StepPayment({ onNext, onBack }) {
	return (
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
						({ id, label, badge, badgeClass, useIcon, defaultChecked }) => (
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
						onClick={onBack}
						className="px-6 py-3 border border-black/10 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
					>
						Kembali
					</button>
					<button
						type="button"
						onClick={onNext}
						className="flex-1 block text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium cursor-pointer transition-colors"
					>
						Lanjut ke Konfirmasi &gt;
					</button>
				</div>
			</div>
		</section>
	);
}

/**
 * @param {{ onNext: () => void; onBack: () => void }} props
 */
function StepConfirmation({ onNext, onBack }) {
	return (
		<section
			aria-label="Order confirmation"
			className="col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
		>
			<h2 className="text-lg font-medium text-gray-900">Konfirmasi Pesanan</h2>

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
					<button
						type="button"
						onClick={onBack}
						className="px-6 py-3 border border-black/10 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
					>
						Kembali
					</button>
					<button
						type="button"
						onClick={onNext}
						className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 font-medium cursor-pointer shadow-sm shadow-orange-500/20 transition-colors"
					>
						🔒 Bayar {formattedTotal} Sekarang
					</button>
				</div>
			</div>
		</section>
	);
}

function StepSuccess() {
	return (
		<main className="pt-12 pb-24 bg-gray-50">
			<div className="wrapper flex flex-col items-center gap-8 max-w-2xl text-center mx-auto">
				<div className="flex flex-col items-center gap-4">
					<div className="size-20 rounded-full bg-green-100 text-green-500 flex items-center justify-center outline-8 outline-green-50">
						<CheckCircle2 className="size-10" />
					</div>
					<h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
						Pesanan Berhasil! 🎉
					</h1>
					<p className="text-sm text-gray-600">
						Terima kasih telah berbelanja di BeliMudah. Pesananmu sedang
						diproses.
					</p>
				</div>

				<div className="w-full flex flex-col gap-6 text-left">
					<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-6">
						<div className="flex justify-between items-start">
							<div className="flex flex-col gap-1">
								<span className="text-xs text-gray-500">Nomor Pesanan</span>
								<span className="text-sm font-bold text-blue-600">
									#BM28371132
								</span>
							</div>
							<div className="flex flex-col gap-1 text-right">
								<span className="text-xs text-gray-500">Total Pembayaran</span>
								<span className="text-sm font-bold text-gray-900">
									Rp 450.000
								</span>
							</div>
						</div>
						<hr className="border-gray-100" />
						<div className="flex flex-col gap-4">
							<div className="flex gap-3 items-start">
								<Truck className="text-gray-400 size-5 shrink-0" />
								<div className="flex flex-col gap-1">
									<span className="text-sm font-medium text-gray-900">
										JNE Reguler
									</span>
									<span className="text-xs text-gray-500">
										Estimasi tiba: 14-16 Juni 2026
									</span>
								</div>
							</div>
							<div className="flex gap-3 items-start">
								<MapPin className="text-blue-500 size-5 shrink-0" />
								<div className="flex flex-col gap-1">
									<span className="text-sm font-medium text-gray-900">
										Alamat Pengiriman
									</span>
									<span className="text-xs text-gray-500 leading-relaxed">
										Jl. Kebon Jeruk No. 15, Jakarta Barat, DKI Jakarta 11530
									</span>
								</div>
							</div>
						</div>
					</section>

					<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-6">
						<h2 className="font-medium text-gray-900">Status Pesanan</h2>
						<div className="flex flex-col gap-6 pl-2 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-gray-100">
							{timeline.map(({ Icon, label, sub, done }) => (
								<div
									key={label}
									className="flex gap-4 relative z-10 items-start"
								>
									<div
										className={`size-5 shrink-0 rounded-full flex items-center justify-center outline-4 outline-white ${done ? "bg-green-100 text-green-500" : "bg-gray-200 text-gray-500"}`}
									>
										<Icon className="size-3" />
									</div>
									<div className="flex-1 flex justify-between items-start">
										<div className="flex flex-col gap-1">
											<span
												className={`text-sm ${done ? "font-medium text-gray-900" : "text-gray-900"}`}
											>
												{label}
											</span>
											<span className="text-xs text-gray-500">{sub}</span>
										</div>
										{done && <Check className="size-4 text-green-500" />}
									</div>
								</div>
							))}
						</div>
					</section>

					<div className="flex justify-center items-center gap-4">
						<Link
							to="/track-order"
							className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium cursor-pointer hover:bg-blue-700 transition-colors flex items-center gap-2"
						>
							Lacak Pesanan
						</Link>
						<Link
							to="/orders"
							className="px-6 py-3 border border-black/10 rounded-xl text-gray-600 font-medium hover:bg-gray-50 cursor-pointer transition-colors"
						>
							Lihat Riwayat Pesanan
						</Link>
						<Link
							to="/"
							className="text-blue-600 font-medium hover:text-blue-800 transition-colors ml-4 text-sm"
						>
							Lanjut Belanja &rarr;
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

export default function Page() {
	const { step, nextStep, prevStep } = useCheckout();

	if (step === 4) {
		return <StepSuccess />;
	}

	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-12">
				<Stepper activeStep={step} />

				<div className="grid grid-cols-3 gap-8 items-start">
					{step === 1 && <StepShipping onNext={nextStep} />}
					{step === 2 && (
						<StepPayment
							onNext={nextStep}
							onBack={prevStep}
						/>
					)}
					{step === 3 && (
						<StepConfirmation
							onNext={nextStep}
							onBack={prevStep}
						/>
					)}

					<Summary
						items={[cartItem]}
						subtotal={formattedTotal}
					/>
				</div>
			</div>
		</main>
	);
}

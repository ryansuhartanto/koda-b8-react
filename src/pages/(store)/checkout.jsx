import { useState } from "react";
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
import { useAuth } from "#/context/auth";
import data from "#/data.json";
import { useCheckout } from "#/hooks/useCheckout";
import { rupiah } from "#/lib/utils";

/**
 * @typedef {import("#/lib/db").ShippingInfo} ShippingInfo
 * @typedef {import("#/lib/db").Order} Order
 */

const shippingMethods = [
	{
		id: "jne-reg",
		label: "JNE Reguler",
		sub: "3-5 hari kerja",
		defaultChecked: true,
	},
	{ id: "jne-exp", label: "JNE Express", sub: "1-2 hari kerja" },
	{
		id: "same-day",
		label: "Same Day Delivery",
		sub: "Hari ini (sebelum 16:00)",
	},
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

/**
 * @param {{ onNext: (shipping: ShippingInfo) => void }} props
 */
function StepShipping({ onNext }) {
	/** @param {React.FormEvent<HTMLFormElement>} e */
	function handleSubmit(e) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		onNext({
			name: form.get("name")?.toString() ?? "",
			phone: form.get("phone")?.toString() ?? "",
			email: form.get("email")?.toString() ?? "",
			address: form.get("address")?.toString() ?? "",
			city: form.get("city")?.toString() ?? "",
			province: form.get("province")?.toString() ?? "",
			postalCode: form.get("postalCode")?.toString() ?? "",
			note: form.get("note")?.toString() ?? "",
			method:
				form.get("shipping")?.toString() ?? shippingMethods[0]?.label ?? "",
			cost: 0,
		});
	}

	return (
		<section
			aria-label="Shipping details"
			className="lg:col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
		>
			<h2 className="flex items-center gap-2 text-lg font-medium text-gray-900">
				<Truck className="text-blue-600" /> Alamat Pengiriman
			</h2>

			<form
				className="flex flex-col gap-6"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							label="Nama Penerima"
							name="name"
							required
						/>
						<FormField
							label="Nomor Telepon"
							type="tel"
							name="phone"
							required
						/>
					</div>
					<FormField
						label="Email"
						type="email"
						name="email"
						required
					/>
					<FormField
						label="Alamat Lengkap"
						name="address"
						required
					/>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							label="Kota"
							name="city"
							required
						/>
						<FormField
							label="Provinsi"
							name="province"
							required
						/>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							label="Kode Pos"
							name="postalCode"
							required
						/>
						<FormField
							label="Catatan (opsional)"
							name="note"
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
						{shippingMethods.map(({ id, label, sub, defaultChecked }) => (
							<label
								key={id}
								className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${defaultChecked ? "border-blue-600 bg-blue-50/30" : "border-black/10 hover:border-blue-600"}`}
							>
								<div className="flex items-center gap-3">
									<input
										type="radio"
										name="shipping"
										value={label}
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
 * @param {{ selectedId: string; onSelect: (id: string) => void; onNext: () => void; onBack: () => void }} props
 */
function StepPayment({ selectedId, onSelect, onNext, onBack }) {
	return (
		<section
			aria-label="Payment methods"
			className="lg:col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
		>
			<h2 className="flex items-center gap-2 text-lg font-medium text-gray-900">
				<CreditCard className="text-blue-600" /> Metode Pembayaran
			</h2>

			<div className="flex flex-col gap-6">
				<div className="grid grid-cols-2 gap-4">
					{paymentMethods.map(({ id, label, badge, badgeClass, useIcon }) => (
						<label
							key={id}
							className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${selectedId === id ? "border-blue-600 bg-blue-50/30" : "border-black/10 hover:border-blue-600"}`}
						>
							<input
								type="radio"
								name="payment"
								checked={selectedId === id}
								onChange={() => onSelect(id)}
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
							<span className="text-sm font-medium text-gray-900">{label}</span>
						</label>
					))}
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
 * @param {{ shipping: ShippingInfo; paymentId: string; cartItems: { name: string; img: string; price: number; quantity: number }[]; total: number; onNext: () => void; onBack: () => void }} props
 */
function StepConfirmation({
	shipping,
	paymentId,
	cartItems,
	total,
	onNext,
	onBack,
}) {
	const paymentLabel =
		paymentMethods.find((m) => m.id === paymentId)?.label ?? paymentId;

	return (
		<section
			aria-label="Order confirmation"
			className="lg:col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
		>
			<h2 className="text-lg font-medium text-gray-900">Konfirmasi Pesanan</h2>

			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
						<h3 className="text-sm font-medium text-gray-900">
							Alamat Pengiriman
						</h3>
						<p className="text-sm text-gray-600">
							{shipping.name} &bull; {shipping.phone}
						</p>
						<p className="text-sm text-gray-600">
							{shipping.address}, {shipping.city}, {shipping.province}{" "}
							{shipping.postalCode}
						</p>
					</div>
					<div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
						<h3 className="text-sm font-medium text-gray-900">
							Metode Pengiriman
						</h3>
						<p className="text-sm text-gray-600">{shipping.method}</p>
					</div>
					<div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl">
						<h3 className="text-sm font-medium text-gray-900">
							Produk yang Dipesan
						</h3>
						<div className="flex flex-col gap-3">
							{cartItems.map((item) => (
								<OrderReviewItem
									key={item.name}
									{...item}
								/>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
						<h3 className="text-sm font-medium text-gray-900">
							Metode Pembayaran
						</h3>
						<p className="text-sm text-gray-600">{paymentLabel}</p>
					</div>
				</div>

				<div className="flex gap-3 items-center p-4 rounded-xl bg-blue-50 text-blue-700 text-xs">
					<ShieldCheck className="size-5 shrink-0" />
					<p>
						Dengan menekan 'Bayar Sekarang', kamu menyetujui Syarat &amp;
						Ketentuan kami.
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
						🔒 Bayar {rupiah(total)} Sekarang
					</button>
				</div>
			</div>
		</section>
	);
}

/**
 * @param {{ order: Order }} props
 */
function StepSuccess({ order }) {
	const timeline = [
		{ Icon: Check, label: "Pesanan Diterima", sub: "Baru saja", done: true },
		{ Icon: Package, label: "Sedang Dikemas", sub: "Estimasi 1-2 jam" },
		{ Icon: Truck, label: "Dalam Pengiriman", sub: order.shipping.method },
		{ Icon: MapPin, label: "Terkirim", sub: order.shipping.city },
	];

	return (
		<main className="pt-12 pb-24 bg-gray-50">
			<div className="wrapper flex flex-col items-center gap-8 max-w-2xl text-center mx-auto">
				<div className="flex flex-col items-center gap-4">
					<div className="size-20 rounded-full bg-green-100 text-green-500 flex items-center justify-center outline-8 outline-green-50">
						<CheckCircle2 className="size-10" />
					</div>
					<h1 className="text-2xl font-bold text-gray-900">
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
									#{order.id}
								</span>
							</div>
							<div className="flex flex-col gap-1 text-right">
								<span className="text-xs text-gray-500">Total Pembayaran</span>
								<span className="text-sm font-bold text-gray-900">
									{rupiah(order.total)}
								</span>
							</div>
						</div>
						<hr className="border-gray-100" />
						<div className="flex flex-col gap-4">
							<div className="flex gap-3 items-start">
								<Truck className="text-gray-400 size-5 shrink-0" />
								<div className="flex flex-col gap-1">
									<span className="text-sm font-medium text-gray-900">
										{order.shipping.method}
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
										{order.shipping.address}, {order.shipping.city},{" "}
										{order.shipping.province} {order.shipping.postalCode}
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
							to="/orders"
							className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium cursor-pointer hover:bg-blue-700 transition-colors"
						>
							Lihat Pesanan
						</Link>
						<Link
							to="/"
							className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm"
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
	const { user, placeOrder } = useAuth();
	const { step, nextStep, prevStep } = useCheckout();

	const [shipping, setShipping] = useState(
		/** @type {ShippingInfo | undefined} */ (undefined),
	);
	const [paymentId, setPaymentId] = useState("bca");
	const [placedOrder, setPlacedOrder] = useState(
		/** @type {Order | undefined} */ (undefined),
	);

	const cartItems = (user?.cart ?? [])
		.map((item) => {
			const product = data.products.find((p) => p.name === item.productName);
			if (!product) {
				return;
			}
			return {
				name: product.name,
				img: product.img,
				price: product.price,
				quantity: item.quantity,
			};
		})
		.filter((x) => x !== undefined);

	const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

	/** @param {ShippingInfo} info */
	function handleShippingNext(info) {
		setShipping(info);
		nextStep();
	}

	function handleConfirm() {
		if (!shipping) {
			return;
		}
		const order = placeOrder({
			items: cartItems.map((i) => ({
				productName: i.name,
				quantity: i.quantity,
				price: i.price,
			})),
			shipping,
			paymentMethod:
				paymentMethods.find((m) => m.id === paymentId)?.label ?? paymentId,
			discount: 0,
			subtotal,
			total: subtotal,
		});
		if (order) {
			setPlacedOrder(order);
			nextStep();
		}
	}

	if (step === 4 && placedOrder) {
		return <StepSuccess order={placedOrder} />;
	}

	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-12">
				<Stepper activeStep={step} />

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
					{step === 1 && <StepShipping onNext={handleShippingNext} />}
					{step === 2 && (
						<StepPayment
							selectedId={paymentId}
							onSelect={setPaymentId}
							onNext={nextStep}
							onBack={prevStep}
						/>
					)}
					{step === 3 && shipping && (
						<StepConfirmation
							shipping={shipping}
							paymentId={paymentId}
							cartItems={cartItems}
							total={subtotal}
							onNext={handleConfirm}
							onBack={prevStep}
						/>
					)}

					<Summary
						items={cartItems}
						subtotal={rupiah(subtotal)}
					/>
				</div>
			</div>
		</main>
	);
}

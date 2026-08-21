import type { JSX } from "react";
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
import { Button } from "#/components/ui/button";
import { Radio, RadioGroup } from "#/components/ui/radio";
import { useCheckout } from "#/hooks/useCheckout";
import { rupiah } from "#/lib/utils";
import { message } from "#/services/api";
import addressesApi from "#/services/api/addresses";
import type { Address } from "#/services/api/addresses";
import cartApi from "#/services/api/cart";
import catalogApi from "#/services/api/catalog";
import type { PaymentMethod, ShippingMethod } from "#/services/api/catalog";
import ordersApi from "#/services/api/orders";
import type { Order } from "#/services/api/orders";

function StepShipping({
	addresses,
	methods,
	draft,
	onChange,
	onNext,
}: {
	addresses: Address[];
	methods: ShippingMethod[];
	draft: Draft;
	onChange: (patch: Partial<Draft>) => void;
	onNext: () => void;
}) {
	return (
		<section
			aria-label="Shipping details"
			className="lg:col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
		>
			<h2 className="flex items-center gap-2 text-h2 font-medium text-gray-900">
				<Truck className="text-brand-600" /> Alamat Pengiriman
			</h2>

			{addresses.length > 0 ? (
				<RadioGroup
					value={draft.id_address ?? ""}
					onValueChange={(id_address: string) => {
						onChange({ id_address });
					}}
					className="flex flex-col gap-3"
				>
					{addresses.map((a) => (
						<Radio
							key={a.id}
							value={a.id}
							card
						>
							<div className="flex flex-col gap-1">
								<span className="text-sm font-medium text-gray-900">
									{a.label}
									{a.is_default ? " (Utama)" : ""}
								</span>
								<span className="text-xs text-gray-500">
									{a.name} &middot; {a.phone}
								</span>
								<span className="text-xs text-gray-500">
									{a.address}, {a.city}, {a.province} {a.postal_code}
								</span>
							</div>
						</Radio>
					))}
				</RadioGroup>
			) : (
				<div className="flex flex-col items-start gap-3 p-4 rounded-xl bg-gray-50 text-sm text-gray-600">
					Belum ada alamat tersimpan.
					<Link
						to="/addresses"
						className="text-brand-600 font-medium hover:underline"
					>
						Tambah alamat dulu &rarr;
					</Link>
				</div>
			)}

			<hr className="border-gray-100" />

			<div className="flex flex-col gap-4">
				<h3 className="text-h3 font-medium text-gray-900">Metode Pengiriman</h3>
				<RadioGroup
					value={draft.ship_method ?? ""}
					onValueChange={(ship_method: string) => {
						onChange({ ship_method });
					}}
					className="flex flex-col gap-3"
				>
					{methods.map((m) => (
						<Radio
							key={m.id}
							value={m.id}
							card
						>
							<span className="text-sm font-medium text-gray-900">
								{m.name}
							</span>
							<span className="ml-auto text-sm font-medium text-gray-900">
								{m.cost_idr === 0 ? "GRATIS" : rupiah(m.cost_idr)}
							</span>
						</Radio>
					))}
				</RadioGroup>
			</div>

			<FormField
				label="Catatan (opsional)"
				name="note"
				placeholder="Warna pagar, dll."
				value={draft.ship_note ?? ""}
				onChange={(e) => {
					onChange({ ship_note: e.currentTarget.value });
				}}
			/>

			<Button
				size="lg"
				block
				disabled={!draft.id_address || !draft.ship_method}
				onClick={onNext}
			>
				Lanjut ke Pembayaran &gt;
			</Button>
		</section>
	);
}

function StepPayment({
	methods,
	draft,
	onChange,
	onNext,
	onBack,
}: {
	methods: PaymentMethod[];
	draft: Draft;
	onChange: (patch: Partial<Draft>) => void;
	onNext: () => void;
	onBack: () => void;
}) {
	return (
		<section
			aria-label="Payment methods"
			className="lg:col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
		>
			<h2 className="flex items-center gap-2 text-h2 font-medium text-gray-900">
				<CreditCard className="text-brand-600" /> Metode Pembayaran
			</h2>

			<div className="flex flex-col gap-6">
				<RadioGroup
					value={draft.id_payment ?? ""}
					onValueChange={(id_payment: string) => {
						onChange({ id_payment });
					}}
					className="grid grid-cols-1 sm:grid-cols-2 gap-4"
				>
					{methods.map((m) => (
						<Radio
							key={m.id}
							value={m.id}
							card
						>
							<CreditCard className="text-gray-400 size-6 shrink-0" />
							<span className="text-sm font-medium text-gray-900">
								{m.name}
							</span>
						</Radio>
					))}
				</RadioGroup>

				<div className="flex gap-3 items-center p-4 rounded-xl bg-brand-50 text-brand-700 text-xs">
					<Lock className="size-5 shrink-0" />
					Informasi pembayaranmu dienkripsi dengan SSL 256-bit. Kami tidak
					menyimpan data kartu kreditmu.
				</div>

				<div className="flex gap-4">
					<Button
						variant="outline"
						tone="neutral"
						size="lg"
						className="shrink-0 text-gray-600"
						onClick={onBack}
					>
						Kembali
					</Button>
					<Button
						size="lg"
						className="flex-1"
						disabled={!draft.id_payment}
						onClick={onNext}
					>
						Lanjut ke Konfirmasi &gt;
					</Button>
				</div>
			</div>
		</section>
	);
}

function StepConfirmation({
	address,
	shipping,
	payment,
	items,
	total,
	draft,
	onChange,
	error,
	pending,
	onNext,
	onBack,
}: {
	address?: Address;
	shipping?: ShippingMethod;
	payment?: PaymentMethod;
	items: Array<{ name: string; img: string; price: number; quantity: number }>;
	total: number;
	draft: Draft;
	onChange: (patch: Partial<Draft>) => void;
	error?: string;
	pending: boolean;
	onNext: () => void;
	onBack: () => void;
}) {
	return (
		<section
			aria-label="Order confirmation"
			className="lg:col-span-2 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6"
		>
			<h2 className="text-h2 font-medium text-gray-900">Konfirmasi Pesanan</h2>

			<div className="flex flex-col gap-6">
				{error && (
					<p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
						{error}
					</p>
				)}

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
						<h3 className="text-body font-medium text-gray-900">
							Alamat Pengiriman
						</h3>
						<p className="text-sm text-gray-600">
							{address?.name} &bull; {address?.phone}
						</p>
						<p className="text-sm text-gray-600">
							{address?.address}, {address?.city}, {address?.province}{" "}
							{address?.postal_code}
						</p>
					</div>
					<div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
						<h3 className="text-body font-medium text-gray-900">
							Metode Pengiriman
						</h3>
						<p className="text-sm text-gray-600">{shipping?.name}</p>
					</div>
					<div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl">
						<h3 className="text-body font-medium text-gray-900">
							Produk yang Dipesan
						</h3>
						<div className="flex flex-col gap-3">
							{items.map((item) => (
								<OrderReviewItem
									key={item.name}
									{...item}
								/>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
						<h3 className="text-body font-medium text-gray-900">
							Metode Pembayaran
						</h3>
						<p className="text-sm text-gray-600">{payment?.name}</p>
					</div>
				</div>

				<FormField
					label="Kode Promo (opsional)"
					name="promo"
					placeholder="HEMAT10"
					value={draft.promo_code ?? ""}
					onChange={(e) => {
						onChange({ promo_code: e.currentTarget.value });
					}}
				/>

				<div className="flex gap-3 items-center p-4 rounded-xl bg-brand-50 text-brand-700 text-xs">
					<ShieldCheck className="size-5 shrink-0" />
					<p>
						Dengan menekan 'Bayar Sekarang', kamu menyetujui Syarat &amp;
						Ketentuan kami.
					</p>
				</div>

				<div className="flex gap-4">
					<Button
						variant="outline"
						tone="neutral"
						size="lg"
						className="shrink-0 text-gray-600"
						onClick={onBack}
					>
						Kembali
					</Button>
					<Button
						tone="accent"
						size="lg"
						className="flex-1"
						disabled={pending}
						onClick={onNext}
					>
						🔒 Bayar {rupiah(total)} Sekarang
					</Button>
				</div>
			</div>
		</section>
	);
}

function StepSuccess({ order }: { order: Order }) {
	const timeline = [
		{ Icon: Check, label: "Pesanan Diterima", sub: "Baru saja", done: true },
		{ Icon: Package, label: "Sedang Dikemas", sub: "Estimasi 1-2 jam" },
		{ Icon: Truck, label: "Dalam Pengiriman", sub: order.ship_method },
		{ Icon: MapPin, label: "Terkirim", sub: order.ship_address },
	];

	return (
		<main className="pt-12 pb-24 bg-gray-50">
			<div className="wrapper flex flex-col items-center gap-8 max-w-2xl text-center mx-auto">
				<div className="flex flex-col items-center gap-4">
					<div className="size-20 rounded-full bg-green-100 text-green-500 flex items-center justify-center outline-8 outline-green-50">
						<CheckCircle2 className="size-10" />
					</div>
					<h1 className="text-h1 font-bold text-gray-900">
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
								<span className="text-sm font-bold text-brand-600">
									#{order.id}
								</span>
							</div>
							<div className="flex flex-col gap-1 text-right">
								<span className="text-xs text-gray-500">Total Pembayaran</span>
								<span className="text-sm font-bold text-gray-900">
									{rupiah(order.total_idr)}
								</span>
							</div>
						</div>
						<hr className="border-gray-100" />
						<div className="flex flex-col gap-4">
							<div className="flex gap-3 items-start">
								<Truck className="text-gray-400 size-5 shrink-0" />
								<div className="flex flex-col gap-1">
									<span className="text-sm font-medium text-gray-900">
										{order.ship_method}
									</span>
								</div>
							</div>
							<div className="flex gap-3 items-start">
								<MapPin className="text-brand-500 size-5 shrink-0" />
								<div className="flex flex-col gap-1">
									<span className="text-sm font-medium text-gray-900">
										Alamat Pengiriman
									</span>
									<span className="text-xs text-gray-500 leading-relaxed">
										{order.ship_address}
									</span>
								</div>
							</div>
						</div>
					</section>

					<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-6">
						<h2 className="text-h3 font-medium text-gray-900">
							Status Pesanan
						</h2>
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
							className="bg-brand-600 text-white px-6 py-3 rounded-xl font-medium cursor-pointer hover:bg-brand-700 transition-colors"
						>
							Lihat Pesanan
						</Link>
						<Link
							to="/"
							className="text-brand-600 font-medium hover:text-brand-800 transition-colors text-sm"
						>
							Lanjut Belanja &rarr;
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

type Draft = {
	id_address?: string;
	ship_method?: string;
	ship_note?: string;
	id_payment?: string;
	promo_code?: string;
};

export default function Page(): JSX.Element {
	const { step, nextStep, prevStep } = useCheckout();
	const [draft, setDraft] = useState<Draft>({});
	const [placedOrder, setPlacedOrder] = useState<Order>();

	const { data: cart } = cartApi.useCartQuery();
	const { data: addresses = [] } = addressesApi.useAddressesQuery();
	const { data: shippingMethods = [] } = catalogApi.useShippingMethodsQuery();
	const { data: paymentMethods = [] } = catalogApi.usePaymentMethodsQuery();
	const [createOrder, { error, isLoading }] =
		ordersApi.useCreateOrderMutation();

	const cartItems = (cart?.items ?? []).map((item) => ({
		name: item.name,
		img: item.urls?.[0] ?? "",
		price: item.price_idr,
		quantity: item.quantity,
	}));

	const address = addresses.find((a) => a.id === draft.id_address);
	const shipping = shippingMethods.find((m) => m.id === draft.ship_method);
	const payment = paymentMethods.find((m) => m.id === draft.id_payment);

	const subtotal = cart?.subtotal_idr ?? 0;
	const total = subtotal + (shipping?.cost_idr ?? 0);

	function change(patch: Partial<Draft>) {
		setDraft((prev) => ({ ...prev, ...patch }));
	}

	async function handleConfirm() {
		const { id_address, ship_method, ship_note, id_payment, promo_code } =
			draft;
		if (!id_address || !ship_method || !id_payment) {
			return;
		}

		// a rejected order keeps the step; the banner reads the mutation's error
		const result = await createOrder({
			id_address,
			id_payment,
			ship_method,
			ship_note: ship_note === "" ? undefined : ship_note,
			promo_code: promo_code === "" ? undefined : promo_code,
		});

		if ("data" in result) {
			setPlacedOrder(result.data);
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
					{step === 1 && (
						<StepShipping
							addresses={addresses}
							methods={shippingMethods}
							draft={draft}
							onChange={change}
							onNext={nextStep}
						/>
					)}
					{step === 2 && (
						<StepPayment
							methods={paymentMethods}
							draft={draft}
							onChange={change}
							onNext={nextStep}
							onBack={prevStep}
						/>
					)}
					{step === 3 && (
						<StepConfirmation
							address={address}
							shipping={shipping}
							payment={payment}
							items={cartItems}
							total={total}
							draft={draft}
							onChange={change}
							error={message(error)}
							pending={isLoading}
							onNext={() => void handleConfirm()}
							onBack={prevStep}
						/>
					)}

					<Summary
						items={cartItems}
						subtotal={rupiah(subtotal)}
						shipping={shipping ? rupiah(shipping.cost_idr) : "Belum dipilih"}
						total={rupiah(total)}
					/>
				</div>
			</div>
		</main>
	);
}

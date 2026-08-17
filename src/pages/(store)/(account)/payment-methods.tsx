import type { JSX, ComponentType } from "react";

import CreditCard from "~icons/lucide/credit-card";
import Wallet from "~icons/lucide/wallet";

import meApi from "#/services/api/me";
import type { UserPayment } from "#/services/api/me";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
	"Kartu Kredit": CreditCard,
	"Kartu Debit": CreditCard,
	"VA BCA": CreditCard,
	"VA BNI": CreditCard,
	"VA BRI": CreditCard,
	"GoPay": Wallet,
	"OVO": Wallet,
	"DANA": Wallet,
};

function MethodCard({ type, is_default, data }: UserPayment) {
	const Icon = iconMap[type] ?? CreditCard;
	const detail = Object.values(data)
		.filter((v) => typeof v === "string")
		.join(" · ");

	return (
		<article className="bg-white border border-black/10 rounded-2xl p-5 flex items-center gap-4">
			<div className="grid place-content-center size-12 shrink-0 rounded-xl bg-brand-50 text-brand-600">
				<Icon className="size-6" />
			</div>
			<div className="flex-1 flex flex-col">
				<div className="flex items-center gap-2">
					<h2 className="text-h3 font-medium text-gray-900">{type}</h2>
					{is_default && (
						<span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-600 text-white">
							Utama
						</span>
					)}
				</div>
				{detail && <span className="text-sm text-gray-500">{detail}</span>}
			</div>
		</article>
	);
}

export default function Page(): JSX.Element {
	const { data: methods = [] } = meApi.usePaymentsQuery();

	return (
		<>
			<h1 className="text-h1 font-medium text-gray-900">Metode Pembayaran</h1>

			{methods.length > 0 ? (
				<div className="flex flex-col gap-4">
					{methods.map((method) => (
						<MethodCard
							key={method.id}
							{...method}
						/>
					))}
				</div>
			) : (
				<div className="bg-white border border-black/10 rounded-2xl p-12 flex flex-col items-center gap-3 text-center text-gray-500 text-sm">
					Belum ada metode pembayaran tersimpan.
				</div>
			)}
		</>
	);
}

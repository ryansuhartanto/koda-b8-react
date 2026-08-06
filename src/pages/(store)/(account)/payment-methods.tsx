import type { JSX, ComponentType } from "react";
import CreditCard from "~icons/lucide/credit-card";
import Plus from "~icons/lucide/plus";
import Trash2 from "~icons/lucide/trash-2";
import Wallet from "~icons/lucide/wallet";

import { Button } from "#/components/ui/button";
import type { SavedPayment } from "#/lib/db";
import { useAppDispatch, useAppSelector } from "#/store";
import { removeSavedPayment, selectCurrentUser } from "#/store/reducers/auth";

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

function MethodCard({
	type,
	isDefault,
	onDelete,
}: SavedPayment & { onDelete: () => void }) {
	const Icon = iconMap[type] ?? CreditCard;
	return (
		<article className="bg-white border border-black/10 rounded-2xl p-5 flex items-center gap-4">
			<div className="grid place-content-center size-12 shrink-0 rounded-xl bg-blue-50 text-blue-600">
				<Icon className="size-6" />
			</div>
			<div className="flex-1 flex flex-col">
				<div className="flex items-center gap-2">
					<h2 className="font-medium text-gray-900">{type}</h2>
					{isDefault && (
						<span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
							Utama
						</span>
					)}
				</div>
			</div>
			<Button
				variant="icon"
				tone="danger"
				size="none"
				className="text-gray-400"
				aria-label={`Hapus ${type}`}
				onClick={onDelete}
			>
				<Trash2 className="size-5" />
			</Button>
		</article>
	);
}

export default function Page(): JSX.Element {
	const user = useAppSelector(selectCurrentUser);
	const dispatch = useAppDispatch();
	const methods = user?.savedPayments ?? [];

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-medium text-gray-900">
					Metode Pembayaran
				</h1>
				<Button>
					<Plus className="size-4" /> Tambah Metode
				</Button>
			</div>

			{methods.length > 0 ? (
				<div className="flex flex-col gap-4">
					{methods.map((method) => (
						<MethodCard
							key={method.id}
							{...method}
							onDelete={() => {
								dispatch(removeSavedPayment(method.id));
							}}
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

import CreditCard from "~icons/lucide/credit-card";
import Plus from "~icons/lucide/plus";
import Trash2 from "~icons/lucide/trash-2";
import Wallet from "~icons/lucide/wallet";

const methods = [
	{
		id: 1,
		Icon: CreditCard,
		label: "Kartu Kredit BCA",
		detail: "•••• •••• •••• 4821",
		primary: true,
	},
	{
		id: 2,
		Icon: Wallet,
		label: "GoPay",
		detail: "0812-3456-7890",
		primary: false,
	},
];

/**
 * @param {(typeof methods)[number]} method
 */
function MethodCard({ Icon, label, detail, primary }) {
	return (
		<article className="bg-white border border-black/10 rounded-2xl p-5 flex items-center gap-4">
			<div className="grid place-content-center size-12 shrink-0 rounded-xl bg-blue-50 text-blue-600">
				<Icon className="size-6" />
			</div>
			<div className="flex-1 flex flex-col">
				<div className="flex items-center gap-2">
					<h2 className="font-medium text-gray-900">{label}</h2>
					{primary && (
						<span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
							Utama
						</span>
					)}
				</div>
				<span className="text-sm text-gray-500 tabular-nums">{detail}</span>
			</div>
			<button
				type="button"
				aria-label={`Hapus ${label}`}
				className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
			>
				<Trash2 className="size-5" />
			</button>
		</article>
	);
}

export default function Page() {
	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-medium text-gray-900">
					Metode Pembayaran
				</h1>
				<button
					type="button"
					className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
				>
					<Plus className="size-4" /> Tambah Metode
				</button>
			</div>

			<div className="flex flex-col gap-4">
				{methods.map((method) => (
					<MethodCard
						key={method.id}
						{...method}
					/>
				))}
			</div>
		</>
	);
}

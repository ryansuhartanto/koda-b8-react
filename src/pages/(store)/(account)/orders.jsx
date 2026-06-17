import { Link } from "react-router";
import CircleCheck from "~icons/lucide/circle-check";
import Star from "~icons/lucide/star";
import Truck from "~icons/lucide/truck";

import data from "#/data.json";
import { cn, rupiah } from "#/lib/utils";

const imgOf = (name) => data.products.find((p) => p.name === name)?.img;

const orders = [
	{
		id: "BM98765432",
		date: "20 Mei 2026",
		status: "delivered",
		items: [{ name: "Headphone Wireless Premium", quantity: 1, price: 450000 }],
		total: 450000,
	},
	{
		id: "BM87654321",
		date: "26 Mei 2026",
		status: "shipped",
		items: [
			{ name: "Kaos Polos Premium Cotton", quantity: 2, price: 125000 },
			{ name: "Sneakers Sport Runfast", quantity: 1, price: 550000 },
		],
		total: 800000,
	},
];

const statusConfig = {
	delivered: {
		label: "Terkirim",
		Icon: CircleCheck,
		className: "text-green-600 bg-green-50",
	},
	shipped: {
		label: "Dikirim",
		Icon: Truck,
		className: "text-blue-600 bg-blue-50",
	},
};

const buttonBase =
	"px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer";
const buttonOutline = `${buttonBase} border border-black/10 text-gray-700 hover:bg-gray-50 bg-white`;
const buttonOutlinePrimary = `${buttonBase} border border-blue-600 text-blue-600 hover:bg-blue-50 bg-white`;
const buttonReview = `${buttonBase} flex items-center gap-1.5 bg-orange-500 text-white hover:bg-orange-600`;

/**
 * @param {(typeof orders)[number]} order
 */
function OrderCard({ id, date, status, items, total }) {
	const { label, Icon, className } = statusConfig[status];

	return (
		<article className="bg-white border border-black/10 rounded-2xl p-5 flex flex-col gap-4">
			<header className="flex justify-between items-start">
				<div className="flex flex-col">
					<span className="font-medium text-gray-900">#{id}</span>
					<span className="text-xs text-gray-500">{date}</span>
				</div>
				<span
					className={cn(
						"flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
						className,
					)}
				>
					<Icon className="size-3.5" /> {label}
				</span>
			</header>

			<hr className="border-gray-100" />

			<div className="flex flex-col gap-3">
				{items.map((item) => (
					<div
						key={item.name}
						className="flex gap-4 items-center"
					>
						<div className="size-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
							<img
								src={imgOf(item.name)}
								alt={item.name}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex-1 flex flex-col">
							<span className="text-sm font-medium text-gray-900">
								{item.name}
							</span>
							<span className="text-xs text-gray-500 tabular-nums">
								&times;{item.quantity} &middot; {rupiah(item.price)}
							</span>
						</div>
					</div>
				))}
			</div>

			<hr className="border-gray-100" />

			<footer className="flex justify-between items-center flex-wrap gap-3">
				<span className="text-sm text-gray-600">
					Total:{" "}
					<span className="font-bold text-blue-600 tabular-nums">
						{rupiah(total)}
					</span>
				</span>
				<div className="flex gap-2">
					<Link
						to="/track-order"
						className={buttonOutlinePrimary}
					>
						Lacak
					</Link>
					{status === "delivered" && (
						<button
							type="button"
							className={buttonReview}
						>
							<Star className="size-4" /> Beri Ulasan
						</button>
					)}
					<button
						type="button"
						className={buttonOutline}
					>
						Beli Lagi
					</button>
				</div>
			</footer>
		</article>
	);
}

export default function Page() {
	return (
		<>
			<h1 className="text-2xl font-medium text-gray-900">Pesanan Saya</h1>

			<div className="flex flex-col gap-4">
				{orders.map((order) => (
					<OrderCard
						key={order.id}
						{...order}
					/>
				))}
			</div>
		</>
	);
}

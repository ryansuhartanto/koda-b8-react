import { Link } from "react-router";
import CircleCheck from "~icons/lucide/circle-check";
import Clock from "~icons/lucide/clock";
import Package from "~icons/lucide/package";
import Star from "~icons/lucide/star";
import Truck from "~icons/lucide/truck";
import XCircle from "~icons/lucide/x-circle";

import data from "#/data.json";
import { cn, rupiah } from "#/lib/utils";
import { useAppSelector } from "#/store";
import { selectCurrentUser } from "#/store/reducers/auth";

/** @param {string} name */
const imgOf = (name) => data.products.find((p) => p.name === name)?.img ?? "";

/** @type {Record<import("#/lib/db").OrderStatus, { label: string; Icon: React.ComponentType<{ className?: string }>; className: string }>} */
const statusConfig = {
	pending: {
		label: "Menunggu",
		Icon: Clock,
		className: "text-amber-600 bg-amber-50",
	},
	packed: {
		label: "Dikemas",
		Icon: Package,
		className: "text-indigo-600 bg-indigo-50",
	},
	shipped: {
		label: "Dikirim",
		Icon: Truck,
		className: "text-blue-600 bg-blue-50",
	},
	delivered: {
		label: "Terkirim",
		Icon: CircleCheck,
		className: "text-green-600 bg-green-50",
	},
	cancelled: {
		label: "Dibatalkan",
		Icon: XCircle,
		className: "text-red-600 bg-red-50",
	},
};

const buttonBase =
	"px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer";
const buttonOutline = `${buttonBase} border border-black/10 text-gray-700 hover:bg-gray-50 bg-white`;
const buttonOutlinePrimary = `${buttonBase} border border-blue-600 text-blue-600 hover:bg-blue-50 bg-white`;
const buttonReview = `${buttonBase} flex items-center gap-1.5 bg-orange-500 text-white hover:bg-orange-600`;

/**
 * @param {import("#/lib/db").Order} order
 */
function OrderCard({ id, createdAt, status, items, total }) {
	const { label, Icon, className } = statusConfig[status];
	const date = new Date(createdAt).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

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
						key={item.productName}
						className="flex gap-4 items-center"
					>
						<div className="size-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
							<img
								src={imgOf(item.productName)}
								alt={item.productName}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex-1 flex flex-col">
							<span className="text-sm font-medium text-gray-900">
								{item.productName}
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
					<Link
						to="/browse"
						type="button"
						className={buttonOutline}
					>
						Beli Lagi
					</Link>
				</div>
			</footer>
		</article>
	);
}

export default function Page() {
	const user = useAppSelector(selectCurrentUser);
	const orders = user?.orders ?? [];

	return (
		<>
			<h1 className="text-2xl font-medium text-gray-900">Pesanan Saya</h1>

			{orders.length > 0 ? (
				<div className="flex flex-col gap-4">
					{orders.map((order) => (
						<OrderCard
							key={order.id}
							{...order}
						/>
					))}
				</div>
			) : (
				<div className="bg-white border border-black/10 rounded-2xl p-12 flex flex-col items-center gap-3 text-center">
					<Package className="size-10 text-gray-300" />
					<p className="text-gray-500 text-sm">
						Kamu belum memiliki pesanan. Yuk, mulai belanja!
					</p>
					<Link
						to="/browse"
						className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
					>
						Mulai Belanja
					</Link>
				</div>
			)}
		</>
	);
}

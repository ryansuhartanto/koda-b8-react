import type { JSX, ComponentType } from "react";
import { Link } from "react-router";
import CircleCheck from "~icons/lucide/circle-check";
import Clock from "~icons/lucide/clock";
import Package from "~icons/lucide/package";
import Star from "~icons/lucide/star";
import Truck from "~icons/lucide/truck";
import XCircle from "~icons/lucide/x-circle";

import { Button, buttonVariants } from "#/components/ui/button";
import { cn, rupiah } from "#/lib/utils";
import ordersApi from "#/services/api/orders";
import type { Order, OrderStatus } from "#/services/api/orders";

const statusConfig: Record<
	OrderStatus,
	{
		label: string;
		Icon: ComponentType<{ className?: string }>;
		className: string;
	}
> = {
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
		className: "text-brand-600 bg-brand-50",
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

function OrderCard({ id, created_at, status, items, total_idr }: Order) {
	const { label, Icon, className } = statusConfig[status];
	const date = new Date(created_at).toLocaleDateString("id-ID", {
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
						key={item.id}
						className="flex gap-4 items-center"
					>
						<div className="grid place-content-center size-12 shrink-0 rounded-lg bg-gray-100 text-gray-400">
							<Package className="size-5" />
						</div>
						<div className="flex-1 flex flex-col">
							<span className="text-sm font-medium text-gray-900">
								{item.product_name}
							</span>
							<span className="text-xs text-gray-500 tabular-nums">
								{item.variant_name ? `${item.variant_name} · ` : ""}
								&times;{item.quantity} &middot; {rupiah(item.unit_price_idr)}
							</span>
						</div>
					</div>
				))}
			</div>

			<hr className="border-gray-100" />

			<footer className="flex justify-between items-center flex-wrap gap-3">
				<span className="text-sm text-gray-600">
					Total:{" "}
					<span className="font-bold text-brand-600 tabular-nums">
						{rupiah(total_idr)}
					</span>
				</span>
				<div className="flex gap-2">
					<Link
						to="/track-order"
						className={buttonVariants({ variant: "outline" })}
					>
						Lacak
					</Link>
					{status === "delivered" && (
						<Button
							tone="accent"
							className="gap-1.5 shadow-none"
						>
							<Star className="size-4" /> Beri Ulasan
						</Button>
					)}
					<Link
						to="/browse"
						className={buttonVariants({ variant: "outline", tone: "neutral" })}
					>
						Beli Lagi
					</Link>
				</div>
			</footer>
		</article>
	);
}

export default function Page(): JSX.Element {
	const { data: orders = [] } = ordersApi.useOrdersQuery();

	return (
		<>
			<h1 className="text-h1 font-medium text-gray-900">Pesanan Saya</h1>

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
						className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors"
					>
						Mulai Belanja
					</Link>
				</div>
			)}
		</>
	);
}

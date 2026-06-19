import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import CircleCheck from "~icons/lucide/circle-check";
import Download from "~icons/lucide/download";
import Eye from "~icons/lucide/eye";
import Filter from "~icons/lucide/filter";
import Truck from "~icons/lucide/truck";

import {
	DataTable,
	TableSearch,
	useDataTable,
} from "#/components/admin/DataTable";
import Badge from "#/components/Badge";
import data from "#/data.json";
import { orderStatus, orderStatusTabs } from "#/lib/status";
import { cn, rupiah } from "#/lib/utils";

const orders = data.admin.orders;

/** @param {string} iso */
const fmtDate = (iso) =>
	new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(iso));

/**
 * @typedef {{ no: string; customer: { name: string; email: string }; date: string; items: number; total: number; payment: string; status: string }} Order
 */

const column =
	/** @type {import("@tanstack/react-table").ColumnHelper<Order>} */ (
		createColumnHelper()
	);

const columns = [
	column.accessor("no", {
		header: "No. Pesanan",
		cell: (info) => (
			<button
				type="button"
				className="font-medium text-blue-600 hover:underline cursor-pointer"
			>
				#{info.getValue()}
			</button>
		),
	}),
	column.accessor((o) => `${o.customer.name} ${o.customer.email}`, {
		id: "customer",
		header: "Pelanggan",
		cell: ({ row }) => (
			<div className="flex flex-col">
				<span className="font-medium text-gray-900">
					{row.original.customer.name}
				</span>
				<span className="text-xs text-gray-500">
					{row.original.customer.email}
				</span>
			</div>
		),
	}),
	column.accessor("date", {
		header: "Tanggal",
		enableGlobalFilter: false,
		cell: (info) => (
			<span className="text-gray-600">{fmtDate(info.getValue())}</span>
		),
	}),
	column.accessor("items", {
		header: "Item",
		cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
	}),
	column.accessor("total", {
		header: "Total",
		cell: (info) => (
			<span className="font-medium text-blue-600 tabular-nums">
				{rupiah(info.getValue())}
			</span>
		),
	}),
	column.accessor("payment", {
		header: "Pembayaran",
		cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
	}),
	column.accessor("status", {
		header: "Status",
		enableSorting: false,
		filterFn: "equalsString",
		cell: (info) => (
			<Badge
				color={
					orderStatus[
						/** @type {import("#/lib/status").OrderStatus} */ (info.getValue())
					].color
				}
			>
				{
					orderStatus[
						/** @type {import("#/lib/status").OrderStatus} */ (info.getValue())
					].label
				}
			</Badge>
		),
	}),
	column.display({
		id: "actions",
		header: "Aksi",
		cell: ({ row }) => {
			const status = row.original.status;
			return (
				<div className="flex items-center gap-2 text-gray-400">
					<button
						type="button"
						aria-label="Lihat"
						className="hover:text-blue-600 transition-colors cursor-pointer"
					>
						<Eye className="size-4.5" />
					</button>
					{status === "shipped" && (
						<button
							type="button"
							aria-label="Tandai terkirim"
							className="text-green-500 hover:text-green-600 transition-colors cursor-pointer"
						>
							<CircleCheck className="size-4.5" />
						</button>
					)}
					{status === "packed" && (
						<button
							type="button"
							aria-label="Tandai dikirim"
							className="hover:text-blue-600 transition-colors cursor-pointer"
						>
							<Truck className="size-4.5" />
						</button>
					)}
				</div>
			);
		},
	}),
];

export default function Page() {
	const [tab, setTab] = useState(
		/** @type {import("#/lib/status").OrderStatus | null} */ (null),
	);
	const table = useDataTable({ data: orders, columns });

	/** @param {import("#/lib/status").OrderStatus | null} key */
	const selectTab = (key) => {
		setTab(key);
		table.getColumn("status")?.setFilterValue(key ?? undefined);
	};

	/** @param {import("#/lib/status").OrderStatus | null} key */
	const countFor = (key) =>
		key === null
			? orders.length
			: orders.filter((o) => o.status === key).length;

	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">Manajemen Pesanan</h1>
				<button
					type="button"
					className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
				>
					<Download className="size-4" /> Ekspor
				</button>
			</div>

			<div className="flex gap-2">
				{orderStatusTabs.map((key) => {
					const active = tab === key;
					const label =
						key === null
							? "Semua"
							: orderStatus[
									/** @type {import("#/lib/status").OrderStatus} */ (key)
								].label;
					return (
						<button
							key={key ?? "all"}
							type="button"
							onClick={() => selectTab(key)}
							className={cn(
								"px-4 py-2 rounded-xl text-sm font-medium border transition-colors cursor-pointer",
								active
									? "bg-blue-600 text-white border-blue-600"
									: "bg-white text-gray-600 border-black/10 hover:border-blue-600",
							)}
						>
							{label} ({countFor(key)})
						</button>
					);
				})}
			</div>

			<div className="flex gap-3">
				<TableSearch
					table={table}
					placeholder="Cari nomor pesanan atau nama pelanggan..."
				/>
				<button
					type="button"
					className="flex items-center gap-2 px-4 py-2.5 border border-black/10 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
				>
					<Filter className="size-4" /> Filter
				</button>
			</div>

			<section className="bg-white border border-black/10 rounded-2xl">
				<DataTable table={table} />
			</section>
		</div>
	);
}

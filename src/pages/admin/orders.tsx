import type { JSX } from "react";
import { useState } from "react";

import { createColumnHelper } from "@tanstack/react-table";

import CircleCheck from "~icons/lucide/circle-check";
import Download from "~icons/lucide/download";
import Eye from "~icons/lucide/eye";
import Truck from "~icons/lucide/truck";

import {
	DataTable,
	TableSearch,
	useDataTable,
} from "#/components/admin/DataTable";
import Badge from "#/components/Badge";
import { Button } from "#/components/ui/button";
import { Tab, Tabs, TabsList } from "#/components/ui/tabs";
import data from "#/data.json";
import { orderStatus, orderStatusTabs } from "#/lib/status";
import { rupiah } from "#/lib/utils";
import type { OrderStatus } from "#/services/api/orders";

const { orders } = data.admin;

const fmtDate = (iso: string) =>
	new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(iso));

export type Order = {
	no: string;
	customer: { name: string; email: string };
	date: string;
	items: number;
	total: number;
	payment: string;
	status: string;
};

const column = createColumnHelper<Order>();

const columns = [
	column.accessor("no", {
		header: "No. Pesanan",
		cell: (info) => (
			<Button
				variant="link"
				size="none"
			>
				#{info.getValue()}
			</Button>
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
			<span className="font-medium text-brand-600 tabular-nums">
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
			<Badge color={orderStatus[info.getValue() as OrderStatus].color}>
				{orderStatus[info.getValue() as OrderStatus].label}
			</Badge>
		),
	}),
	column.display({
		id: "actions",
		header: "Aksi",
		cell: ({ row }) => {
			const { status } = row.original;
			return (
				<div className="flex items-center gap-2 text-gray-400">
					<Button
						variant="icon"
						size="none"
						aria-label="Lihat"
					>
						<Eye className="size-4.5" />
					</Button>
					{status === "shipped" && (
						<Button
							variant="icon"
							tone="success"
							size="none"
							aria-label="Tandai terkirim"
						>
							<CircleCheck className="size-4.5" />
						</Button>
					)}
					{status === "packed" && (
						<Button
							variant="icon"
							size="none"
							aria-label="Tandai dikirim"
						>
							<Truck className="size-4.5" />
						</Button>
					)}
				</div>
			);
		},
	}),
];

export default function Page(): JSX.Element {
	const [tab, setTab] = useState<OrderStatus | "all">("all");
	const table = useDataTable({ data: orders, columns });

	const selectTab = (key: OrderStatus | "all") => {
		setTab(key);
		table.getColumn("status")?.setFilterValue(key === "all" ? undefined : key);
	};

	const countFor = (key: OrderStatus | "all") =>
		key === "all"
			? orders.length
			: orders.filter((o) => o.status === key).length;

	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<h1 className="text-h1 font-bold text-gray-900">Manajemen Pesanan</h1>
				<Button>
					<Download className="size-4" /> Ekspor
				</Button>
			</div>

			<Tabs
				value={tab}
				onValueChange={selectTab}
			>
				<TabsList variant="pill">
					{orderStatusTabs.map((key) => {
						const tabKey = key ?? "all";
						const label = key === undefined ? "Semua" : orderStatus[key].label;
						return (
							<Tab
								key={tabKey}
								value={tabKey}
								variant="pill"
							>
								{label} ({countFor(tabKey)})
							</Tab>
						);
					})}
				</TabsList>
			</Tabs>

			<div className="flex gap-3">
				<TableSearch
					table={table}
					placeholder="Cari nomor pesanan atau nama pelanggan..."
				/>
			</div>

			<section className="bg-white border border-black/10 rounded-2xl">
				<DataTable table={table} />
			</section>
		</div>
	);
}

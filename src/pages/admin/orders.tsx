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
import { useToast } from "#/components/ui/toast";
import { orderStatus, orderStatusTabs } from "#/lib/status";
import { rupiah } from "#/lib/utils";
import { message } from "#/services/api";
import catalogApi from "#/services/api/catalog";
import ordersApi from "#/services/api/orders";
import type { Order, OrderStatus } from "#/services/api/orders";

const PAGE = 100;

const fmtDate = (iso: string) =>
	new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(iso));

const column = createColumnHelper<Order>();

// orders_summary carries id_payment but not the method's name, so it is joined here
function useColumns(paymentNames: Record<string, string>) {
	const toast = useToast();
	const [updateStatus, { isLoading }] =
		ordersApi.useUpdateOrderStatusMutation();

	async function advance(id: string, status: OrderStatus) {
		const result = await updateStatus({ id, status });

		if ("error" in result) {
			toast.add({
				title: "Gagal mengubah status",
				description: message(result.error),
			});
		}
	}

	return [
		column.accessor("id", {
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
		column.accessor((o) => `${o.ship_name} ${o.ship_email}`, {
			id: "customer",
			header: "Pelanggan",
			cell: ({ row }) => (
				<div className="flex flex-col">
					<span className="font-medium text-gray-900">
						{row.original.ship_name}
					</span>
					<span className="text-xs text-gray-500">
						{row.original.ship_email}
					</span>
				</div>
			),
		}),
		column.accessor("created_at", {
			header: "Tanggal",
			enableGlobalFilter: false,
			cell: (info) => (
				<span className="text-gray-600">{fmtDate(info.getValue())}</span>
			),
		}),
		column.accessor((o) => o.items.length, {
			id: "items",
			header: "Item",
			cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
		}),
		column.accessor("total_idr", {
			header: "Total",
			cell: (info) => (
				<span className="font-medium text-brand-600 tabular-nums">
					{rupiah(info.getValue())}
				</span>
			),
		}),
		column.accessor((o) => paymentNames[o.id_payment] ?? o.id_payment, {
			id: "payment",
			header: "Pembayaran",
			cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
		}),
		column.accessor("status", {
			header: "Status",
			enableSorting: false,
			filterFn: "equalsString",
			cell: (info) => (
				<Badge color={orderStatus[info.getValue()].color}>
					{orderStatus[info.getValue()].label}
				</Badge>
			),
		}),
		column.display({
			id: "actions",
			header: "Aksi",
			cell: ({ row }) => {
				const { id, status } = row.original;
				return (
					<div className="flex items-center gap-2 text-gray-400">
						<Button
							variant="icon"
							size="none"
							aria-label="Lihat"
						>
							<Eye className="size-4.5" />
						</Button>
						{status === "pending" && (
							<Button
								variant="icon"
								size="none"
								aria-label="Tandai dikemas"
								disabled={isLoading}
								onClick={() => void advance(id, "packed")}
							>
								<Truck className="size-4.5" />
							</Button>
						)}
						{status === "packed" && (
							<Button
								variant="icon"
								size="none"
								aria-label="Tandai dikirim"
								disabled={isLoading}
								onClick={() => void advance(id, "shipped")}
							>
								<Truck className="size-4.5" />
							</Button>
						)}
						{status === "shipped" && (
							<Button
								variant="icon"
								tone="success"
								size="none"
								aria-label="Tandai terkirim"
								disabled={isLoading}
								onClick={() => void advance(id, "delivered")}
							>
								<CircleCheck className="size-4.5" />
							</Button>
						)}
					</div>
				);
			},
		}),
	];
}

export default function Page(): JSX.Element {
	const [tab, setTab] = useState<OrderStatus | "all">("all");
	const { data, isLoading } = ordersApi.useAllOrdersQuery({ limit: PAGE });
	const { data: methods = [] } = catalogApi.usePaymentMethodsQuery();

	const paymentNames = Object.fromEntries(methods.map((m) => [m.id, m.name]));
	const columns = useColumns(paymentNames);
	const orders = data?.items ?? [];
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
				<DataTable
					table={table}
					emptyLabel={isLoading ? "Memuat…" : "Tidak ada pesanan."}
				/>
			</section>
		</div>
	);
}

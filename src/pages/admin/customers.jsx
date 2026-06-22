import { createColumnHelper } from "@tanstack/react-table";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Eye from "~icons/lucide/eye";
import Mail from "~icons/lucide/mail";
import ShoppingBag from "~icons/lucide/shopping-bag";
import Star from "~icons/lucide/star";
import TrendingUp from "~icons/lucide/trending-up";
import Users from "~icons/lucide/users";

import {
	DataTable,
	TableSearch,
	useDataTable,
} from "#/components/admin/DataTable";
import StatCard from "#/components/admin/StatCard";
import Avatar from "#/components/Avatar";
import Badge from "#/components/Badge";
import data from "#/data.json";
import { tierColor } from "#/lib/status";
import { rupiah } from "#/lib/utils";

const { customers, customerStats, customerGrowth } = data.admin;

const icons = {
	"users": Users,
	"trending-up": TrendingUp,
	"shopping-bag": ShoppingBag,
	"star": Star,
};

/** @param {string} name */
const initials = (name) =>
	name
		.split(" ")
		.slice(0, 2)
		.map((w) => w[0])
		.join("")
		.toUpperCase();

/** @param {string} iso */
const fmtJoined = (iso) =>
	new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric" }).format(
		new Date(iso),
	);

/**
 * @typedef {{ name: string; email: string; city: string; joined: string; orders: number; spend: number; tier: string }} Customer
 */

const column =
	/** @type {import("@tanstack/react-table").ColumnHelper<Customer>} */ (
		createColumnHelper()
	);

const columns = [
	column.accessor((c) => `${c.name} ${c.email}`, {
		id: "customer",
		header: "Pelanggan",
		cell: ({ row }) => (
			<div className="flex items-center gap-3">
				<Avatar
					initial={initials(row.original.name)}
					className="size-9 text-xs"
				/>
				<div className="flex flex-col">
					<span className="font-medium text-gray-900">{row.original.name}</span>
					<span className="text-xs text-gray-500">{row.original.email}</span>
				</div>
			</div>
		),
	}),
	column.accessor("city", {
		header: "Kota",
		cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
	}),
	column.accessor("joined", {
		header: "Bergabung",
		enableGlobalFilter: false,
		cell: (info) => (
			<span className="text-gray-600">{fmtJoined(info.getValue())}</span>
		),
	}),
	column.accessor("orders", {
		header: "Total Pesanan",
		cell: (info) => (
			<span className="tabular-nums font-medium text-gray-900">
				{info.getValue()}
			</span>
		),
	}),
	column.accessor("spend", {
		header: "Total Belanja",
		cell: (info) => (
			<span className="font-medium text-blue-600 tabular-nums">
				{rupiah(info.getValue())}
			</span>
		),
	}),
	column.accessor("tier", {
		header: "Tier",
		cell: (info) => (
			<Badge color={tierColor[info.getValue()]}>{info.getValue()}</Badge>
		),
	}),
	column.display({
		id: "actions",
		header: "Aksi",
		cell: () => (
			<div className="flex items-center gap-2 text-gray-400">
				<button
					type="button"
					aria-label="Lihat"
					className="hover:text-blue-600 transition-colors cursor-pointer"
				>
					<Eye className="size-4.5" />
				</button>
				<button
					type="button"
					aria-label="Kirim email"
					className="hover:text-blue-600 transition-colors cursor-pointer"
				>
					<Mail className="size-4.5" />
				</button>
			</div>
		),
	}),
];

export default function Page() {
	const table = useDataTable({ data: customers, columns });

	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-2xl font-bold text-gray-900">Manajemen Pelanggan</h1>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
				{customerStats.map((s) => (
					<StatCard
						key={s.label}
						label={s.label}
						value={s.value}
						icon={icons[/** @type {keyof typeof icons} */ (s.icon)]}
						color={
							/** @type {"blue" | "green" | "orange" | "violet" | "amber"} */ (
								s.color
							)
						}
					/>
				))}
			</div>

			<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-6">
				<h2 className="text-lg font-medium text-gray-900">
					Pertumbuhan Pelanggan Baru (2026)
				</h2>
				<div className="h-72">
					<ResponsiveContainer
						width="100%"
						height="100%"
					>
						<BarChart
							data={customerGrowth}
							accessibilityLayer
							margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
						>
							<CartesianGrid
								vertical={false}
								strokeDasharray="3 3"
								stroke="var(--color-gray-100)"
							/>
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tick={{ fontSize: 12, fill: "var(--color-gray-400)" }}
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								width={40}
								tick={{ fontSize: 12, fill: "var(--color-gray-400)" }}
							/>
							<Tooltip
								cursor={{ fill: "var(--color-gray-100)" }}
								formatter={(v) => [v, "Pelanggan baru"]}
								contentStyle={{
									borderRadius: 12,
									border: "1px solid var(--color-gray-200)",
									fontSize: 13,
								}}
							/>
							<Bar
								dataKey="value"
								fill="var(--color-blue-600)"
								radius={[6, 6, 0, 0]}
								maxBarSize={32}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</section>

			<TableSearch
				table={table}
				placeholder="Cari nama, email, atau kota..."
			/>

			<section className="bg-white border border-black/10 rounded-2xl">
				<DataTable table={table} />
			</section>
		</div>
	);
}

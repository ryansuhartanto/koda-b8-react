import { Link } from "react-router";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import ArrowUpRight from "~icons/lucide/arrow-up-right";
import Package from "~icons/lucide/package";
import ShoppingCart from "~icons/lucide/shopping-cart";
import TrendingUp from "~icons/lucide/trending-up";
import Users from "~icons/lucide/users";

import StatCard from "#/components/admin/StatCard";
import Badge from "#/components/Badge";
import data from "#/data.json";
import { orderStatus } from "#/lib/status";
import { rupiah } from "#/lib/utils";

const { stats, revenue, categorySales, topProducts } = data.admin.dashboard;
const recentOrders = data.admin.orders.slice(0, 5);

const icons = {
	"trending-up": TrendingUp,
	"shopping-cart": ShoppingCart,
	"users": Users,
	"package": Package,
};

const categoryColors = {
	"Elektronik": "var(--color-blue-600)",
	"Fashion": "var(--color-orange-500)",
	"Rumah & Dapur": "var(--color-green-500)",
	"Kecantikan": "var(--color-violet-500)",
	"Lainnya": "var(--color-gray-400)",
};

const dateLabel = new Intl.DateTimeFormat("id-ID", {
	day: "numeric",
	month: "long",
	year: "numeric",
}).format(new Date(data.admin.dashboard.date));

/** @param {{ title: string; action?: import("react").ReactNode; children: import("react").ReactNode }} props */
function Card({ title, action, children }) {
	return (
		<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-6">
			<header className="flex justify-between items-center">
				<h2 className="text-lg font-medium text-gray-900">{title}</h2>
				{action}
			</header>
			{children}
		</section>
	);
}

function RevenueChart() {
	return (
		<div className="h-72">
			<ResponsiveContainer
				width="100%"
				height="100%"
			>
				<AreaChart
					data={revenue}
					accessibilityLayer
					margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
				>
					<defs>
						<linearGradient
							id="revenueFill"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="0%"
								stopColor="var(--color-blue-600)"
								stopOpacity={0.25}
							/>
							<stop
								offset="100%"
								stopColor="var(--color-blue-600)"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
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
						width={48}
						tick={{ fontSize: 12, fill: "var(--color-gray-400)" }}
						tickFormatter={(v) => `${v}jt`}
					/>
					<Tooltip
						formatter={(v) => [`Rp ${v} juta`, "Pendapatan"]}
						contentStyle={{
							borderRadius: 12,
							border: "1px solid var(--color-gray-200)",
							fontSize: 13,
						}}
					/>
					<Area
						type="monotone"
						dataKey="revenue"
						stroke="var(--color-blue-600)"
						strokeWidth={2}
						fill="url(#revenueFill)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

function CategoryDonut() {
	return (
		<div className="flex flex-col gap-6">
			<div className="h-48">
				<ResponsiveContainer
					width="100%"
					height="100%"
				>
					<PieChart>
						<Pie
							data={categorySales}
							dataKey="value"
							nameKey="name"
							innerRadius={55}
							outerRadius={80}
							paddingAngle={2}
							stroke="none"
						>
							{categorySales.map((c) => (
								<Cell
									key={c.name}
									fill={
										categoryColors[
											/** @type {keyof typeof categoryColors} */ (c.name)
										]
									}
								/>
							))}
						</Pie>
						<Tooltip formatter={(v) => `${v}%`} />
					</PieChart>
				</ResponsiveContainer>
			</div>
			<ul className="flex flex-col gap-2 text-sm">
				{categorySales.map((c) => (
					<li
						key={c.name}
						className="flex items-center gap-2"
					>
						<span
							className="size-2.5 rounded-full shrink-0"
							style={{
								backgroundColor:
									categoryColors[
										/** @type {keyof typeof categoryColors} */ (c.name)
									],
							}}
						/>
						<span className="flex-1 text-gray-600">{c.name}</span>
						<span className="font-medium text-gray-900 tabular-nums">
							{c.value}%
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export default function Page() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-between items-start">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
					<p className="text-sm text-gray-500">
						Selamat datang kembali! Ini ringkasan bisnis hari ini.
					</p>
				</div>
				<span className="text-sm text-gray-500">{dateLabel}</span>
			</div>

			<div className="grid grid-cols-4 gap-6">
				{stats.map((s) => (
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
						delta={s.delta}
						dir={/** @type {"up" | "down"} */ (s.dir)}
					/>
				))}
			</div>

			<div className="grid grid-cols-3 gap-6 items-start">
				<div className="col-span-2">
					<Card
						title="Pendapatan & Pesanan (2026)"
						action={
							<span className="px-3 py-1 rounded-lg border border-black/10 text-xs text-gray-500">
								12 Bulan Terakhir
							</span>
						}
					>
						<RevenueChart />
					</Card>
				</div>
				<Card title="Penjualan per Kategori">
					<CategoryDonut />
				</Card>
			</div>

			<div className="grid grid-cols-2 gap-6 items-start">
				<Card
					title="Pesanan Terbaru"
					action={
						<Link
							to="/admin/orders"
							className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
						>
							Lihat Semua <ArrowUpRight className="size-4" />
						</Link>
					}
				>
					<ul className="flex flex-col">
						{recentOrders.map((o, i) => (
							<li
								key={o.no}
								className={`flex justify-between items-start py-3 ${i > 0 ? "border-t border-gray-100" : ""}`}
							>
								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium text-gray-900">
											#{o.no}
										</span>
										<Badge
											color={
												orderStatus[
													/** @type {import("#/lib/status").OrderStatus} */ (
														o.status
													)
												].color
											}
										>
											{
												orderStatus[
													/** @type {import("#/lib/status").OrderStatus} */ (
														o.status
													)
												].label
											}
										</Badge>
									</div>
									<span className="text-xs text-gray-500">
										{o.customer.name} &middot;{" "}
										{new Intl.DateTimeFormat("id-ID", {
											day: "numeric",
											month: "short",
											year: "numeric",
										}).format(new Date(o.date))}
									</span>
								</div>
								<div className="flex flex-col items-end gap-1">
									<span className="text-sm font-semibold text-blue-600 tabular-nums">
										{rupiah(o.total)}
									</span>
									<span className="text-xs text-gray-400">{o.items} item</span>
								</div>
							</li>
						))}
					</ul>
				</Card>

				<Card
					title="Produk Terlaris"
					action={
						<Link
							to="/admin/products"
							className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
						>
							Kelola <ArrowUpRight className="size-4" />
						</Link>
					}
				>
					<ul className="flex flex-col">
						{topProducts.map((p, i) => (
							<li
								key={p.name}
								className={`flex items-center gap-4 py-3 ${i > 0 ? "border-t border-gray-100" : ""}`}
							>
								<span className="grid place-content-center size-7 shrink-0 rounded-full bg-gray-100 text-xs font-medium text-gray-500 tabular-nums">
									{i + 1}
								</span>
								<div className="flex-1 flex flex-col">
									<span className="text-sm font-medium text-gray-900">
										{p.name}
									</span>
									<span className="text-xs text-gray-500 tabular-nums">
										{p.sold} terjual &middot; Stok: {p.stock}
									</span>
								</div>
								<span className="text-sm font-semibold text-blue-600 tabular-nums">
									{rupiah(p.revenue)}
								</span>
							</li>
						))}
					</ul>
				</Card>
			</div>
		</div>
	);
}

import { Link, NavLink, Outlet } from "react-router";
import Bell from "~icons/lucide/bell";
import ExternalLink from "~icons/lucide/external-link";
import LayoutGrid from "~icons/lucide/layout-grid";
import Package from "~icons/lucide/package";
import Settings from "~icons/lucide/settings";
import ShoppingCart from "~icons/lucide/shopping-cart";
import Users from "~icons/lucide/users";
import X from "~icons/lucide/x";

import { cn } from "#/lib/utils";

const nav = [
	{ to: "/admin", label: "Dashboard", Icon: LayoutGrid, end: true },
	{ to: "/admin/products", label: "Produk", Icon: Package },
	{ to: "/admin/orders", label: "Pesanan", Icon: ShoppingCart },
	{ to: "/admin/customers", label: "Pelanggan", Icon: Users },
	{ to: "/admin/settings", label: "Pengaturan", Icon: Settings },
];

function Sidebar() {
	return (
		<aside className="flex flex-col w-64 shrink-0 bg-gray-900 text-gray-400">
			<div className="flex items-center gap-3 h-16 px-6 border-b border-white/10">
				<span className="grid place-content-center size-8 rounded-lg bg-blue-600 text-white text-sm font-bold">
					B
				</span>
				<span className="text-white font-semibold">BeliMudah Admin</span>
			</div>

			<nav
				aria-label="Admin navigation"
				className="flex-1 flex flex-col gap-1 p-4 text-sm"
			>
				{nav.map(({ to, label, Icon, end }) => (
					<NavLink
						key={to}
						to={to}
						end={end}
						className={({ isActive }) =>
							cn(
								"flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors",
								isActive
									? "bg-blue-600 text-white font-medium"
									: "hover:bg-white/5 hover:text-white",
							)
						}
					>
						<Icon className="size-5 shrink-0" />
						{label}
					</NavLink>
				))}
			</nav>

			<Link
				to="/"
				className="flex items-center gap-2 px-6 h-14 border-t border-white/10 text-sm hover:text-white transition-colors"
			>
				<ExternalLink className="size-4" /> Kembali ke Toko
			</Link>
		</aside>
	);
}

function Topbar() {
	return (
		<header className="flex items-center justify-between h-16 px-6 bg-white border-b border-black/10 shrink-0">
			<div className="flex items-center gap-3 text-gray-500">
				<button
					type="button"
					aria-label="Toggle menu"
					className="hover:text-gray-900 transition-colors cursor-pointer"
				>
					<X className="size-5" />
				</button>
				<span className="text-sm">Admin</span>
			</div>

			<div className="flex items-center gap-5">
				<button
					type="button"
					aria-label="Notifications"
					className="relative text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
				>
					<Bell className="size-5" />
					<span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-red-500" />
				</button>
				<div className="flex items-center gap-2">
					<span className="grid place-content-center size-8 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
						A
					</span>
					<span className="text-sm font-medium text-gray-900">Admin</span>
				</div>
			</div>
		</header>
	);
}

export default function Layout() {
	return (
		<div className="flex min-h-dvh bg-gray-50">
			<Sidebar />
			<div className="flex-1 flex flex-col min-w-0">
				<Topbar />
				<main className="flex-1 p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

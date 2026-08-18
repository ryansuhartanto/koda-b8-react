import type { JSX } from "react";
import { useState } from "react";
import { Link, Navigate, NavLink, Outlet } from "react-router";

import Bell from "~icons/lucide/bell";
import ExternalLink from "~icons/lucide/external-link";
import LayoutGrid from "~icons/lucide/layout-grid";
import Menu from "~icons/lucide/menu";
import Package from "~icons/lucide/package";
import Settings from "~icons/lucide/settings";
import ShoppingCart from "~icons/lucide/shopping-cart";
import Users from "~icons/lucide/users";
import X from "~icons/lucide/x";

import Avatar from "#/components/Avatar";
import { Button } from "#/components/ui/button";
import { Drawer } from "#/components/ui/drawer";
import { selectIsAuthenticated } from "#/features/auth";
import { cn } from "#/lib/utils";
import meApi from "#/services/api/me";
import { useAppSelector } from "#/store";

const nav = [
	{ to: "/admin", label: "Dashboard", Icon: LayoutGrid, end: true },
	{ to: "/admin/products", label: "Produk", Icon: Package },
	{ to: "/admin/orders", label: "Pesanan", Icon: ShoppingCart },
	{ to: "/admin/customers", label: "Pelanggan", Icon: Users },
	{ to: "/admin/settings", label: "Pengaturan", Icon: Settings },
];

function Sidebar({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const onClose = () => {
		onOpenChange(false);
	};

	const content = (
		<>
			<div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
				<div className="flex items-center gap-3">
					<span className="grid place-content-center size-8 rounded-lg bg-brand-600 text-white text-sm font-bold">
						B
					</span>
					<span className="text-white font-semibold">BeliMudah Admin</span>
				</div>
				<Button
					variant="icon"
					tone="neutral"
					size="square"
					className="md:hidden bg-white/10 text-gray-400 hover:text-white"
					aria-label="Close sidebar"
					onClick={onClose}
				>
					<X />
				</Button>
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
						onClick={onClose}
						className={({ isActive }) =>
							cn(
								"flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors",
								isActive
									? "bg-brand-600 text-white font-medium"
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
		</>
	);

	return (
		<>
			<aside className="hidden md:flex flex-col w-64 shrink-0 bg-gray-900 text-gray-400">
				{content}
			</aside>

			<Drawer
				open={open}
				onOpenChange={onOpenChange}
				side="left"
				title="Admin navigation"
				hideTitle
				mobileOnly
				className="w-64 bg-gray-900 text-gray-400 border-white/10 shadow-2xl"
			>
				<div className="flex flex-col h-full">{content}</div>
			</Drawer>
		</>
	);
}

function Topbar({ onMenuOpen }: { onMenuOpen: () => void }) {
	return (
		<header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-black/10 shrink-0">
			<div className="flex items-center gap-3 text-gray-500">
				<Button
					variant="icon"
					tone="neutral"
					size="none"
					className="text-inherit md:hidden"
					aria-label="Toggle menu"
					onClick={onMenuOpen}
				>
					<Menu className="size-5" />
				</Button>
				<span className="text-sm">Admin</span>
			</div>

			<div className="flex items-center gap-5">
				<Button
					variant="icon"
					tone="neutral"
					size="none"
					className="relative text-gray-500"
					aria-label="Notifications"
				>
					<Bell className="size-5" />
					<span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-red-500" />
				</Button>
				<div className="flex items-center gap-2">
					<Avatar
						initial="A"
						className="size-8 text-sm"
					/>
					<span className="hidden sm:block text-sm font-medium text-gray-900">
						Admin
					</span>
				</div>
			</div>
		</header>
	);
}

export default function Layout(): JSX.Element {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const { data: user, isLoading } = meApi.useMeQuery(undefined, {
		skip: !isAuthenticated,
	});

	if (!isAuthenticated) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	// the roles only arrive with /me, so redirecting early would bounce a real admin
	if (isLoading) {
		return <div className="min-h-dvh bg-gray-50" />;
	}

	if (user?.roles.includes("admin") !== true) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return (
		<div className="flex min-h-dvh bg-gray-50">
			<Sidebar
				open={sidebarOpen}
				onOpenChange={setSidebarOpen}
			/>
			<div className="flex-1 flex flex-col min-w-0">
				<Topbar onMenuOpen={() => setSidebarOpen((o) => !o)} />
				<main className="flex-1 p-4 md:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

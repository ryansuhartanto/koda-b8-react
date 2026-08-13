import type { JSX } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router";
import ChevronRight from "~icons/lucide/chevron-right";
import ClipboardList from "~icons/lucide/clipboard-list";
import CreditCard from "~icons/lucide/credit-card";
import Heart from "~icons/lucide/heart";
import LogOut from "~icons/lucide/log-out";
import MapPin from "~icons/lucide/map-pin";
import Settings from "~icons/lucide/settings";

import Avatar from "#/components/Avatar";
import { Button } from "#/components/ui/button";
import { selectIsAuthenticated, unset } from "#/features/auth";
import { selectWishlist } from "#/features/wishlist";
import { cn } from "#/lib/utils";
import api from "#/services/api";
import meApi from "#/services/api/me";
import ordersApi from "#/services/api/orders";
import { useAppDispatch, useAppSelector } from "#/store";

const menu = [
	{ to: "/orders", label: "Pesanan Saya", Icon: ClipboardList },
	{ to: "/wishlist", label: "Wishlist", Icon: Heart },
	{ to: "/addresses", label: "Alamat Saya", Icon: MapPin },
	{ to: "/payment-methods", label: "Metode Pembayaran", Icon: CreditCard },
	{ to: "/profile", label: "Pengaturan Profil", Icon: Settings },
];

function ProfileCard() {
	const { data: user } = meApi.useMeQuery();
	const { data: orders = [] } = ordersApi.useOrdersQuery();
	const wishlist = useAppSelector(selectWishlist);
	return (
		<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
			<Avatar className="size-16 text-xl" />
			<div className="flex flex-col">
				<span className="font-bold text-gray-900">{user?.name}</span>
				<span className="text-sm text-gray-500">{user?.email}</span>
			</div>
			<hr className="w-full border-gray-100" />
			<dl className="grid grid-cols-2 w-full">
				<div className="flex flex-col">
					<dd className="font-bold text-gray-900 tabular-nums">
						{orders.length}
					</dd>
					<dt className="text-xs text-gray-500">Pesanan</dt>
				</div>
				<div className="flex flex-col">
					<dd className="font-bold text-gray-900 tabular-nums">
						{wishlist.length}
					</dd>
					<dt className="text-xs text-gray-500">Wishlist</dt>
				</div>
			</dl>
		</section>
	);
}

function AccountNav() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function handleLogout() {
		dispatch(unset());
		// the cache is scoped to the token that fetched it
		dispatch(api.util.resetApiState());
		void navigate("/login");
	}

	return (
		<nav
			aria-label="Account navigation"
			className="bg-white border border-black/10 rounded-2xl p-2 flex flex-col text-sm"
		>
			{menu.map(({ to, label, Icon }) => (
				<NavLink
					key={to}
					to={to}
					className={({ isActive }) =>
						cn(
							"flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
							isActive
								? "bg-brand-50 text-brand-600 font-medium"
								: "text-gray-600 hover:bg-gray-50",
						)
					}
				>
					<Icon className="size-5 shrink-0" />
					<span className="flex-1 text-left">{label}</span>
					<ChevronRight className="size-4 text-gray-300" />
				</NavLink>
			))}

			<hr className="my-2 border-gray-100" />

			<Button
				variant="link"
				tone="danger"
				size="none"
				className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-600 no-underline"
				onClick={handleLogout}
			>
				<LogOut className="size-5 shrink-0" />
				<span>Keluar</span>
			</Button>
		</nav>
	);
}

export default function Layout(): JSX.Element {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	if (!isAuthenticated) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return (
		<main className="pt-6 pb-16 bg-gray-50 min-h-[60vh]">
			<div className="wrapper grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 items-start">
				<aside className="flex flex-col gap-4">
					<ProfileCard />
					<AccountNav />
				</aside>

				<div className="flex flex-col gap-6">
					<Outlet />
				</div>
			</div>
		</main>
	);
}

import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import ChevronRight from "~icons/lucide/chevron-right";
import ClipboardList from "~icons/lucide/clipboard-list";
import CreditCard from "~icons/lucide/credit-card";
import Heart from "~icons/lucide/heart";
import LogOut from "~icons/lucide/log-out";
import MapPin from "~icons/lucide/map-pin";
import Settings from "~icons/lucide/settings";

import Avatar from "#/components/Avatar";
import { useAuth } from "#/context/auth";
import { cn } from "#/lib/utils";

const menu = [
	{ to: "/orders", label: "Pesanan Saya", Icon: ClipboardList },
	{ to: "/wishlist", label: "Wishlist", Icon: Heart },
	{ to: "/addresses", label: "Alamat Saya", Icon: MapPin },
	{ to: "/payment-methods", label: "Metode Pembayaran", Icon: CreditCard },
	{ to: "/profile", label: "Pengaturan Profil", Icon: Settings },
];

function ProfileCard() {
	const { user } = useAuth();
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
						{user?.orders.length ?? 0}
					</dd>
					<dt className="text-xs text-gray-500">Pesanan</dt>
				</div>
				<div className="flex flex-col">
					<dd className="font-bold text-gray-900 tabular-nums">
						{user?.wishlist.length ?? 0}
					</dd>
					<dt className="text-xs text-gray-500">Wishlist</dt>
				</div>
			</dl>
		</section>
	);
}

function AccountNav() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	function handleLogout() {
		logout();
		navigate("/login");
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
								? "bg-blue-50 text-blue-600 font-medium"
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

			<button
				type="button"
				onClick={handleLogout}
				className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
			>
				<LogOut className="size-5 shrink-0" />
				<span>Keluar</span>
			</button>
		</nav>
	);
}

export default function Layout() {
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login");
		}
	}, [isLoggedIn, navigate]);

	if (!isLoggedIn) {
		return null;
	}

	return (
		<main className="pt-6 pb-16 bg-gray-50 min-h-[60vh]">
			<div className="wrapper grid grid-cols-[18rem_1fr] gap-6 items-start">
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

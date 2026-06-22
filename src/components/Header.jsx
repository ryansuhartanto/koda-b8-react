import { useEffect, useState } from "react";
import { Link } from "react-router";
import Bell from "~icons/lucide/bell";
import ChevronDown from "~icons/lucide/chevron-down";
import Heart from "~icons/lucide/heart";
import MapPin from "~icons/lucide/map-pin";
import Menu from "~icons/lucide/menu";
import Search from "~icons/lucide/search";
import ShoppingCart from "~icons/lucide/shopping-cart";
import User from "~icons/lucide/user";
import X from "~icons/lucide/x";

import { useAuth } from "#/context/auth";
import { cn } from "#/lib/utils";

export function HeaderUtility() {
	return (
		<section
			aria-label="Utility bar"
			className="hidden md:block bg-blue-600 text-white text-xs"
		>
			<div className="wrapper flex justify-between items-center py-1.5">
				<div className="flex gap-4">
					<span className="*:align-middle">
						<MapPin /> <span>Kirim ke: Jakarta Selatan</span>
					</span>
				</div>
				<div className="flex gap-4">
					<span>
						📞 <a href="tel:0800-1234-5678">0800&#8209;1234&#8209;5678</a>{" "}
						(Gratis)
					</span>
					<span>🚀 Gratis ongkir di atas Rp 100.000</span>
				</div>
			</div>
		</section>
	);
}

/**
 * @param {{ onMenuOpen: () => void }} props
 */
export function HeaderMain({ onMenuOpen }) {
	const { user } = useAuth();
	const cartCount = user?.cart.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
	const firstName = user?.name.split(" ")[0];

	return (
		<section
			aria-label="Main header"
			className="py-2 shadow-sm"
		>
			<div className="wrapper flex gap-3 items-center">
				<Link
					className="brand shrink-0"
					to="/"
				>
					BeliMudah
				</Link>

				{/* Desktop */}
				<form className="hidden md:flex flex-1 items-center gap-2 h-10 border border-black/10 rounded-xl bg-gray-100 overflow-hidden focus-within:border-black/50 transition-colors duration-200 *:px-4 *:h-full *:transition-colors *:duration-200">
					<input
						className="flex-1 min-w-0 text-sm bg-transparent focus:outline-none"
						type="text"
						name="q"
						autoComplete="off"
						placeholder="Cari produk, merek, kategori..."
					/>
					<button
						className="shrink-0 text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-900 focus:outline-none"
						type="submit"
						aria-label="Search"
					>
						<Search className="text-base" />
					</button>
				</form>

				<div className="hidden md:flex items-center mx-2 gap-6 text-xl **:transition-colors **:duration-200 *:flex *:items-center *:gap-2">
					<Link
						className="group"
						aria-label="Notifications"
						to="/notifications"
					>
						<Bell className="text-gray-500 group-hover:text-black" />
					</Link>

					<Link
						className="group"
						aria-label="User"
						to={user ? "/profile" : "/login"}
					>
						<User className="text-gray-500 group-hover:text-black" />
						<span className="text-sm">{firstName ?? "Masuk"}</span>
					</Link>

					<Link
						className="group"
						aria-label="Favorite"
						to="/wishlist"
					>
						<Heart className="text-gray-500 group-hover:text-black" />
					</Link>

					<Link
						className="group relative"
						aria-label="Cart"
						to="/cart"
					>
						<ShoppingCart className="text-gray-500 group-hover:text-black" />
						{cartCount > 0 && (
							<span className="absolute -top-2 -right-2 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
								{cartCount > 99 ? "99+" : cartCount}
							</span>
						)}
					</Link>
				</div>

				{/* Mobile */}
				<div className="flex md:hidden items-center gap-4 ml-auto text-xl">
					<Link
						className="relative"
						aria-label="Cart"
						to="/cart"
					>
						<ShoppingCart className="text-gray-500" />
						{cartCount > 0 && (
							<span className="absolute -top-2 -right-2 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
								{cartCount > 99 ? "99+" : cartCount}
							</span>
						)}
					</Link>
					<button
						type="button"
						aria-label="Open menu"
						onClick={onMenuOpen}
						className="text-gray-700 cursor-pointer"
					>
						<Menu />
					</button>
				</div>
			</div>
		</section>
	);
}

/**
 * @param {{ open: boolean, onClose: () => void, navigations: Array<{href: string, text: string}> }} props
 */
function MobileDrawer({ open, onClose, navigations }) {
	const { user } = useAuth();
	const firstName = user?.name.split(" ")[0];

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<>
			<div
				className={cn(
					"fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 backdrop-blur-sm",
					open ? "opacity-100" : "opacity-0 pointer-events-none",
				)}
				onClick={onClose}
				aria-hidden="true"
			/>

			<aside
				aria-label="Mobile navigation"
				className={cn(
					"fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white flex flex-col md:hidden shadow-2xl transition-transform duration-300 ease-out",
					open ? "translate-x-0" : "-translate-x-full",
				)}
			>
				{/* Header */}
				<div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
					<Link
						className="brand"
						to="/"
						onClick={onClose}
					>
						BeliMudah
					</Link>
					<button
						type="button"
						aria-label="Close menu"
						onClick={onClose}
						className="grid place-content-center size-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
					>
						<X />
					</button>
				</div>

				<div className="px-4 py-3 bg-gray-50 border-b border-black/10">
					<form className="flex items-center h-10 border border-black/10 rounded-xl bg-white overflow-hidden focus-within:border-blue-400 transition-colors *:h-full">
						<input
							className="flex-1 px-4 text-sm bg-transparent focus:outline-none"
							type="text"
							name="q"
							autoComplete="off"
							placeholder="Cari produk..."
						/>
						<button
							className="shrink-0 px-4 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
							type="submit"
							aria-label="Search"
						>
							<Search className="text-base" />
						</button>
					</form>
				</div>

				<Link
					to={user ? "/profile" : "/login"}
					onClick={onClose}
					className="flex items-center gap-3 px-5 py-4 border-b border-black/10 hover:bg-blue-50 transition-colors group"
				>
					<div className="grid place-content-center size-10 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0 group-hover:bg-blue-200 transition-colors">
						{firstName?.[0] ? (
							firstName[0].toUpperCase()
						) : (
							<User className="size-5" />
						)}
					</div>
					<div className="flex flex-col min-w-0">
						<span className="font-semibold text-gray-900 text-sm truncate">
							{user?.name ?? "Masuk / Daftar"}
						</span>
						{user ? (
							<span className="text-xs text-gray-500 truncate">
								{user.email}
							</span>
						) : (
							<span className="text-xs text-blue-600">Tap untuk masuk →</span>
						)}
					</div>
				</Link>

				{/* Promo banner */}
				<div className="mx-4 mt-3 px-3 py-2 rounded-xl bg-blue-600 text-white text-xs flex items-center gap-2">
					<span>🚀</span>
					<span>Gratis ongkir di atas Rp 100.000</span>
				</div>

				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-0.5 text-sm">
					<p className="px-3 pt-1 pb-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
						Kategori
					</p>
					{navigations.map(({ href, text }) => (
						<Link
							key={href}
							to={href}
							onClick={onClose}
							className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
						>
							{text}
						</Link>
					))}
					<Link
						to="/browse?tag=promo"
						onClick={onClose}
						className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
					>
						🔥 Promo
					</Link>
				</nav>

				{/* Bottom utility tabs */}
				<div className="flex border-t border-black/10 divide-x divide-black/10 text-xs text-gray-500 *:flex *:flex-1 *:flex-col *:items-center *:gap-1 *:py-3 *:transition-colors *:hover:bg-gray-50 *:cursor-pointer">
					<Link
						to="/wishlist"
						onClick={onClose}
						aria-label="Wishlist"
					>
						<Heart className="text-lg text-gray-400" />
						<span>Wishlist</span>
					</Link>
					<Link
						to="/notifications"
						onClick={onClose}
						aria-label="Notifications"
					>
						<Bell className="text-lg text-gray-400" />
						<span>Notifikasi</span>
					</Link>
					<Link
						to="/browse"
						onClick={onClose}
						aria-label="Browse all"
					>
						<Menu className="text-lg text-gray-400" />
						<span>Semua</span>
					</Link>
				</div>
			</aside>
		</>
	);
}

/**
 * @typedef HeaderNavItem
 * @prop {string} href
 * @prop {string} text
 */

/**
 * @typedef HeaderNavProps
 * @prop {HeaderNavItem[]} [navigations]
 */

/**
 * @param {HeaderNavProps} props
 */
export function HeaderNav({ navigations = [] }) {
	return (
		<nav
			aria-label="Main navigations"
			className="hidden md:block py-2.5 text-sm shadow-sm"
		>
			<div className="wrapper flex overflow-x-auto *:px-4 *:whitespace-nowrap *:transition-colors *:duration-200">
				<Link
					className="flex items-center gap-1 text-black"
					to="/browse"
				>
					<Menu />
					Semua Kategori
					<ChevronDown />
				</Link>
				{navigations.map(({ href, text }) => (
					<Link
						key={href}
						to={href}
						className="text-gray-500 hover:text-black"
					>
						{text}
					</Link>
				))}
				<Link
					to="/browse?tag=promo"
					className="text-red-600 hover:text-red-900"
				>
					🔥 Promo
				</Link>
			</div>
		</nav>
	);
}

/**
 * @typedef HeaderProps
 * @prop {HeaderNavItem[]} navigations
 */

/**
 * @param {HeaderProps} props
 */
export default function Header({ navigations }) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 bg-white">
			<HeaderUtility />
			<HeaderMain onMenuOpen={() => setMenuOpen(true)} />
			<HeaderNav navigations={navigations} />
			<MobileDrawer
				open={menuOpen}
				onClose={() => setMenuOpen(false)}
				navigations={navigations}
			/>
		</header>
	);
}

import { Link } from "react-router";
import Bell from "~icons/lucide/bell";
import ChevronDown from "~icons/lucide/chevron-down";
import Heart from "~icons/lucide/heart";
import MapPin from "~icons/lucide/map-pin";
import Menu from "~icons/lucide/menu";
import Search from "~icons/lucide/search";
import ShoppingCart from "~icons/lucide/shopping-cart";
import User from "~icons/lucide/user";

const iconLinks = [
	{ Icon: Bell, label: "Notifications", to: "/notifications" },
	{ Icon: User, label: "User", to: "/profile", text: "Budi" },
	{ Icon: Heart, label: "Favorite", to: "/wishlist" },
	{ Icon: ShoppingCart, label: "Cart", to: "/cart" },
];

export function HeaderUtility() {
	return (
		<section
			aria-label="Utility bar"
			className="bg-blue-600 text-white text-xs"
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

export function HeaderMain() {
	return (
		<section
			aria-label="Main header"
			className="py-2 shadow-sm"
		>
			<div className="wrapper flex gap-4 items-center">
				<Link
					className="brand"
					to="/"
				>
					BeliMudah
				</Link>

				<form className="flex items-center gap-2 h-10 border border-black/10 rounded-xl bg-gray-100 overflow-hidden focus-within:border-black/50 transition-colors duration-200 *:px-4 *:h-full *:transition-colors *:duration-200">
					<input
						className="flex-1 min-w-lg text-sm bg-transparent focus:outline-none"
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

				<div className="flex items-center mx-2 gap-6 text-xl **:transition-colors **:duration-200 *:flex *:items-center *:gap-2">
					{iconLinks.map(({ Icon, label, to, text }) => (
						<Link
							key={label}
							className="group"
							aria-label={label}
							to={to}
						>
							<Icon className="text-gray-500 group-hover:text-black" />
							{text && <span className="text-sm">{text}</span>}
						</Link>
					))}
				</div>
			</div>
		</section>
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
			className="py-2.5 text-sm shadow-sm"
		>
			<div className="wrapper flex *:px-4 *:whitespace-nowrap *:transition-colors *:duration-200">
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
	return (
		<header className="sticky top-0 z-50 bg-white">
			<HeaderUtility />

			<HeaderMain />

			<HeaderNav navigations={navigations} />
		</header>
	);
}

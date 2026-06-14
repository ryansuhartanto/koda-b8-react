import * as Lucide from "lucide-react";

export function HeaderUtility() {
	return (
		<section
			aria-label="Utility bar"
			className="bg-blue-600 text-white text-xs"
		>
			<div className="wrapper flex justify-between items-center py-1.5">
				<div className="flex gap-4">
					<span className="*:align-middle">
						<Lucide.MapPin /> <span>Kirim ke: Jakarta Selatan</span>
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
				<a
					className="brand"
					href="index.html"
				>
					BeliMudah
				</a>

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
						<Lucide.Search className="text-base" />
					</button>
				</form>

				<div className="flex items-center mx-2 gap-6 text-xl **:transition-colors **:duration-200 *:flex *:items-center *:gap-2">
					<a
						className="group"
						aria-label="Notifications"
						href=""
					>
						<Lucide.Bell className="text-gray-500 group-hover:text-black" />
					</a>
					<a
						className="group"
						aria-label="User"
						href=""
					>
						<Lucide.User className="text-gray-500 group-hover:text-black" />
						<span className="text-sm">Budi</span>
					</a>
					<a
						className="group"
						aria-label="Favorite"
						href=""
					>
						<Lucide.Heart className="text-gray-500 group-hover:text-black" />
					</a>
					<a
						className="group"
						aria-label="Cart"
						href=""
					>
						<Lucide.ShoppingCart className="text-gray-500 group-hover:text-black" />
					</a>
				</div>
			</div>
		</section>
	);
}

export function HeaderNav({ navigations = [] }) {
	return (
		<nav
			aria-label="Main navigations"
			className="py-2.5 text-sm shadow-sm"
		>
			<div className="wrapper flex *:px-4 *:whitespace-nowrap *:transition-colors *:duration-200">
				<a
					className="flex items-center gap-1 text-black"
					href=""
				>
					<Lucide.Menu />
					Semua Kategori
					<Lucide.ChevronDown />
				</a>
				{navigations.map(({ href, text }) => (
					<a
						href={href}
						className="text-gray-500 hover:text-black"
					>
						{text}
					</a>
				))}
				<a
					href=""
					className="text-red-600 hover:text-red-900"
				>
					🔥 Promo
				</a>
			</div>
		</nav>
	);
}

export default function Header({ navigations }) {
	return (
		<header className="sticky top-0 z-50 bg-white">
			<HeaderUtility />

			<HeaderMain />

			<HeaderNav navigations={navigations} />
		</header>
	);
}

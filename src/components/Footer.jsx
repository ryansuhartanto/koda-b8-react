import { Link } from "react-router";
import Headset from "~icons/lucide/headset";
import Mail from "~icons/lucide/mail";
import MapPin from "~icons/lucide/map-pin";
import MessageCircle from "~icons/lucide/message-circle";
import Phone from "~icons/lucide/phone";
import RefreshCcw from "~icons/lucide/refresh-ccw";
import Shield from "~icons/lucide/shield";
import Truck from "~icons/lucide/truck";
import SiFacebook from "~icons/simple-icons/facebook";
import SiInstagram from "~icons/simple-icons/instagram";
import SiX from "~icons/simple-icons/x";
import SiYoutube from "~icons/simple-icons/youtube";

const promotions = [
	{
		Icon: Truck,
		title: "Gratis Ongkir",
		sub: "Pembelian diatas Rp 100.000",
	},
	{
		Icon: Shield,
		title: "Pembayaran Aman",
		sub: "SSL terenkripsi 256-bit",
	},
	{
		Icon: RefreshCcw,
		title: "Pengembalian Mudah",
		sub: "30 hari pengembalian gratis",
	},
	{
		Icon: Headset,
		title: "Dukungan 24/7",
		sub: "Bantuan kapan saja",
	},
];

const socialLinks = [
	{
		Icon: SiFacebook,
		label: "Facebook",
		href: "https://facebook.com/belimudah",
	},
	{
		Icon: SiInstagram,
		label: "Instagram",
		href: "https://instagram.com/belimudah",
	},
	{ Icon: SiX, label: "X", href: "https://x.com/belimudah" },
	{
		Icon: SiYoutube,
		label: "YouTube",
		href: "https://youtube.com/@belimudah",
	},
];

export function FloatingContact() {
	return (
		<Link
			className="fixed inset-be-4 inset-e-4 grid place-content-center w-14 h-14 text-2xl rounded-full bg-blue-600 text-white shadow-md"
			aria-label="Contact us"
			to="/contact"
		>
			<MessageCircle />
		</Link>
	);
}

export function FooterPromotions() {
	return (
		<section
			aria-label="Promotions"
			className="py-8"
		>
			<div className="wrapper grid grid-cols-4 gap-8">
				{promotions.map(({ Icon, title, sub }) => (
					<div
						key={title}
						className="flex gap-4"
					>
						<div className="grid place-content-center shrink-0 size-10 rounded-full bg-blue-600/20 text-blue-600">
							<Icon className="text-lg" />
						</div>
						<div className="flex flex-col justify-center">
							<h6 className="text-white text-sm font-medium">{title}</h6>
							<span className="text-xs">{sub}</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export function FooterNav() {
	return (
		<nav
			aria-label="Main footer"
			className="py-8"
		>
			<div className="wrapper grid grid-cols-4 gap-8">
				<div className="flex flex-col gap-4">
					<Link
						className="brand text-white text-lg"
						to="/"
					>
						BeliMudah
					</Link>
					<p className="text-gray-400 leading-relaxed">
						Platform belanja online terpercaya dengan ribuan produk pilihan.
						Belanja mudah, aman, dan menyenangkan.
					</p>
					<div className="flex gap-2 *:grid *:place-content-center *:size-8 *:rounded-full *:overflow-hidden *:bg-gray-700">
						{socialLinks.map(({ Icon, label, href }) => (
							<a
								key={label}
								aria-label={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon className="size-[1em]" />
							</a>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<h5 className="text-white text-base font-medium">Layanan</h5>
					<ul className="flex flex-col gap-4 list-none">
						<li>
							<Link to="/about">Tentang Kami</Link>
						</li>
						<li>
							<Link to="/careers">Karir</Link>
						</li>
						<li>
							<Link to="/blog">Blog</Link>
						</li>
						<li>
							<Link to="/affiliate">Program Afiliasi</Link>
						</li>
						<li>
							<Link to="/sell">Jual di BeliMudah</Link>
						</li>
					</ul>
				</div>

				<div className="flex flex-col gap-4">
					<h5 className="text-white text-base font-medium">Bantuan</h5>
					<ul className="flex flex-col gap-4 list-none">
						<li>
							<Link to="/how-to-shop">Cara Belanja</Link>
						</li>
						<li>
							<Link to="/return-policy">Kebijakan Pengembalian</Link>
						</li>
						<li>
							<Link to="/track-order">Lacak Pesanan</Link>
						</li>
						<li>
							<Link to="/faq">FAQ</Link>
						</li>
						<li>
							<Link to="/contact">Hubungi Kami</Link>
						</li>
					</ul>
				</div>

				<div className="flex flex-col gap-4">
					<h5 className="text-white text-base font-medium">Kontak</h5>
					<ul className="flex flex-col gap-4 list-none *:ps-6 *:relative [&_svg]:absolute [&_svg]:left-0 [&_svg]:text-base">
						<li>
							<a
								href="https://maps.google.com/?q=Jl.+Sudirman+No.+1+Jakarta+Selatan"
								target="_blank"
								rel="noopener noreferrer"
							>
								<MapPin />
								Jl. Sudirman No. 1, Jakarta Selatan, DKI Jakarta 12190
							</a>
						</li>
						<li>
							<a href="tel:0800-1234-5678">
								<Phone />
								0800&#8209;1234&#8209;5678&nbsp;(Gratis)
							</a>
						</li>
						<li>
							<a href="mailto:bantuan@belimudah.id">
								<Mail />
								bantuan@belimudah.id
							</a>
						</li>
					</ul>
					<div className="bg-gray-800 border border-white/10 rounded-lg text-xs">
						<form className="p-3 flex flex-col gap-2">
							<label
								className="text-white font-medium"
								htmlFor="newsletter"
							>
								Newsletter
							</label>
							<div className="flex gap-2">
								<input
									className="w-full flex-1 px-3 py-2.5 rounded-md bg-gray-700 border border-white/10"
									id="newsletter"
									name="newsletter"
									type="email"
									placeholder="Email kamu"
								/>
								<button
									className="px-3 py-2.5 rounded-md bg-blue-600 text-white cursor-pointer"
									type="submit"
								>
									Langganan
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</nav>
	);
}

export function FooterCopyright() {
	return (
		<section
			aria-label="Copyright"
			className="py-4 text-xs text-gray-500"
		>
			<div className="wrapper flex justify-between">
				<small>&copy; 2026 BeliMudah. Seluruh hak cipta dilindungi.</small>
				<small className="flex gap-4">
					<Link to="/privacy">Kebijakan Privasi</Link>
					<Link to="/terms">Syarat &amp; Ketentuan</Link>
					<Link to="/admin">Admin</Link>
				</small>
			</div>
		</section>
	);
}

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-400 text-sm [&_a]:transition-colors [&_a]:hover:text-white">
			<FloatingContact />

			<FooterPromotions />

			<hr className="border-gray-700" />

			<FooterNav />

			<hr className="border-gray-700" />

			<FooterCopyright />
		</footer>
	);
}

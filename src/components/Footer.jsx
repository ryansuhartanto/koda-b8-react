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

export function FloatingContact() {
	return (
		<a
			className="fixed inset-be-4 inset-e-4 grid place-content-center w-14 h-14 text-2xl rounded-full bg-blue-600 text-white shadow-md"
			aria-label="Contact us"
			href=""
		>
			<MessageCircle />
		</a>
	);
}

export function FooterPromotions() {
	return (
		<section
			aria-label="Promotions"
			className="py-8"
		>
			<div className="wrapper grid grid-cols-4 gap-8">
				<div className="flex gap-4">
					<div className="grid place-content-center shrink-0 size-10 rounded-full bg-blue-600/20 text-blue-600">
						<Truck className="text-lg" />
					</div>
					<div className="flex flex-col justify-center">
						<h6 className="text-white text-sm font-medium">Gratis Ongkir</h6>
						<span className="text-xs">Pembelian diatas Rp 100.000</span>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="grid place-content-center shrink-0 size-10 rounded-full bg-blue-600/20 text-blue-600">
						<Shield className="text-lg" />
					</div>
					<div className="flex flex-col justify-center">
						<h6 className="text-white text-sm font-medium">Pembayaran Aman</h6>
						<span className="text-xs">SSL terenkripsi 256-bit</span>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="grid place-content-center shrink-0 size-10 rounded-full bg-blue-600/20 text-blue-600">
						<RefreshCcw className="text-lg" />
					</div>
					<div className="flex flex-col justify-center">
						<h6 className="text-white text-sm font-medium">
							Pengembalian Mudah
						</h6>
						<span className="text-xs">30 hari pengembalian gratis</span>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="grid place-content-center shrink-0 size-10 rounded-full bg-blue-600/20 text-blue-600">
						<Headset className="text-lg" />
					</div>
					<div className="flex flex-col justify-center">
						<h6 className="text-white text-sm font-medium">Dukungan 24/7</h6>
						<span className="text-xs">Bantuan kapan saja</span>
					</div>
				</div>
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
					<a
						className="brand text-white text-lg"
						href=""
					>
						BeliMudah
					</a>
					<p className="text-gray-400 leading-relaxed">
						Platform belanja online terpercaya dengan ribuan produk pilihan.
						Belanja mudah, aman, dan menyenangkan.
					</p>
					<div className="flex gap-2 *:grid *:place-content-center *:size-8 *:rounded-full *:overflow-hidden *:bg-gray-700">
						<a
							aria-label="Facebook"
							href=""
						>
							<SiFacebook className="size-[1em]" />
						</a>
						<a
							aria-label="Instagram"
							href=""
						>
							<SiInstagram className="size-[1em]" />
						</a>
						<a
							aria-label="X"
							href=""
						>
							<SiX className="size-[1em]" />
						</a>
						<a
							aria-label="YouTube"
							href=""
						>
							<SiYoutube className="size-[1em]" />
						</a>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<h5 className="text-white text-base font-medium">Layanan</h5>
					<ul className="flex flex-col gap-4 list-none">
						<li>
							<a href="">Tentang Kami</a>
						</li>
						<li>
							<a href="">Karir</a>
						</li>
						<li>
							<a href="">Blog</a>
						</li>
						<li>
							<a href="">Program Afiliasi</a>
						</li>
						<li>
							<a href="">Jual di BeliMudah</a>
						</li>
					</ul>
				</div>

				<div className="flex flex-col gap-4">
					<h5 className="text-white text-base font-medium">Bantuan</h5>
					<ul className="flex flex-col gap-4 list-none">
						<li>
							<a href="">Cara Belanja</a>
						</li>
						<li>
							<a href="">Kebijakan Pengembalian</a>
						</li>
						<li>
							<a href="">Lacak Pesanan</a>
						</li>
						<li>
							<a href="">FAQ</a>
						</li>
						<li>
							<a href="">Hubungi Kami</a>
						</li>
					</ul>
				</div>

				<div className="flex flex-col gap-4">
					<h5 className="text-white text-base font-medium">Kontak</h5>
					<ul className="flex flex-col gap-4 list-none *:ps-6 *:relative [&_svg]:absolute [&_svg]:left-0 [&_svg]:text-base">
						<li>
							<a href="">
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
					<a href="">Kebijakan Privasi</a>
					<a href="">Syarat &amp; Ketentuan</a>
					<a href="">Admin</a>
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

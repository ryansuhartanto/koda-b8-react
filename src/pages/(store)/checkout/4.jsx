import { Link } from "react-router";
import Check from "~icons/lucide/check";
import CheckCircle2 from "~icons/lucide/check-circle-2";
import MapPin from "~icons/lucide/map-pin";
import Package from "~icons/lucide/package";
import Truck from "~icons/lucide/truck";

const timeline = [
	{
		Icon: Check,
		label: "Pesanan Diterima",
		sub: "Baru saja",
		done: true,
	},
	{ Icon: Package, label: "Sedang Dikemas", sub: "Estimasi 1-2 jam" },
	{ Icon: Truck, label: "Dalam Pengiriman", sub: "3-5 hari kerja" },
	{ Icon: MapPin, label: "Terkirim", sub: "14-16 Juni 2026" },
];

export default function Page() {
	return (
		<main className="pt-12 pb-24 bg-gray-50">
			<div className="wrapper flex flex-col items-center gap-8 max-w-2xl text-center mx-auto">
				<div className="flex flex-col items-center gap-4">
					<div className="size-20 rounded-full bg-green-100 text-green-500 flex items-center justify-center outline-8 outline-green-50">
						<CheckCircle2 className="size-10" />
					</div>
					<h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
						Pesanan Berhasil! 🎉
					</h1>
					<p className="text-sm text-gray-600">
						Terima kasih telah berbelanja di BeliMudah. Pesananmu sedang
						diproses.
					</p>
				</div>

				<div className="w-full flex flex-col gap-6 text-left">
					<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-6">
						<div className="flex justify-between items-start">
							<div className="flex flex-col gap-1">
								<span className="text-xs text-gray-500">Nomor Pesanan</span>
								<span className="text-sm font-bold text-blue-600">
									#BM28371132
								</span>
							</div>
							<div className="flex flex-col gap-1 text-right">
								<span className="text-xs text-gray-500">Total Pembayaran</span>
								<span className="text-sm font-bold text-gray-900">
									Rp 450.000
								</span>
							</div>
						</div>
						<hr className="border-gray-100" />
						<div className="flex flex-col gap-4">
							<div className="flex gap-3 items-start">
								<Truck className="text-gray-400 size-5 shrink-0" />
								<div className="flex flex-col gap-1">
									<span className="text-sm font-medium text-gray-900">
										JNE Reguler
									</span>
									<span className="text-xs text-gray-500">
										Estimasi tiba: 14-16 Juni 2026
									</span>
								</div>
							</div>
							<div className="flex gap-3 items-start">
								<MapPin className="text-blue-500 size-5 shrink-0" />
								<div className="flex flex-col gap-1">
									<span className="text-sm font-medium text-gray-900">
										Alamat Pengiriman
									</span>
									<span className="text-xs text-gray-500 leading-relaxed">
										Jl. Kebon Jeruk No. 15, Jakarta Barat, DKI Jakarta 11530
									</span>
								</div>
							</div>
						</div>
					</section>

					<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-6">
						<h2 className="font-medium text-gray-900">Status Pesanan</h2>
						<div className="flex flex-col gap-6 pl-2 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-gray-100">
							{timeline.map(({ Icon, label, sub, done }) => (
								<div
									key={label}
									className="flex gap-4 relative z-10 items-start"
								>
									<div
										className={`size-5 shrink-0 rounded-full flex items-center justify-center outline-4 outline-white ${done ? "bg-green-100 text-green-500" : "bg-gray-200 text-gray-500"}`}
									>
										<Icon className="size-3" />
									</div>
									<div className="flex-1 flex justify-between items-start">
										<div className="flex flex-col gap-1">
											<span
												className={`text-sm ${done ? "font-medium text-gray-900" : "text-gray-900"}`}
											>
												{label}
											</span>
											<span className="text-xs text-gray-500">{sub}</span>
										</div>
										{done && <Check className="size-4 text-green-500" />}
									</div>
								</div>
							))}
						</div>
					</section>

					<div className="flex justify-center items-center gap-4">
						<Link
							to="/track-order"
							className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium cursor-pointer hover:bg-blue-700 transition-colors flex items-center gap-2"
						>
							Lacak Pesanan
						</Link>
						<Link
							to="/orders"
							className="px-6 py-3 border border-black/10 rounded-xl text-gray-600 font-medium hover:bg-gray-50 cursor-pointer transition-colors"
						>
							Lihat Riwayat Pesanan
						</Link>
						<Link
							to="/"
							className="text-blue-600 font-medium hover:text-blue-800 transition-colors ml-4 text-sm"
						>
							Lanjut Belanja &rarr;
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

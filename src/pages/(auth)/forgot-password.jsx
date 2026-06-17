import { Link } from "react-router";
import ArrowLeft from "~icons/lucide/arrow-left";
import Mail from "~icons/lucide/mail";
import Send from "~icons/lucide/send";

import AuthLayout from "#/components/AuthLayout";
import FormField from "#/components/FormField";

const tips = [
	"Pastikan kamu memeriksa folder spam/junk email",
	"Tautan reset hanya berlaku selama 30 menit",
	"Jangan bagikan tautan reset kepada siapapun",
];

function SecurityTips() {
	return (
		<ul className="flex flex-col gap-2 text-sm">
			{[
				"Enkripsi SSL 256-bit",
				"Perlindungan data pribadi",
				"Verifikasi dua langkah",
			].map((f) => (
				<li key={f}>🔐 {f}</li>
			))}
		</ul>
	);
}

export default function Page() {
	return (
		<AuthLayout
			variant="forgot-password"
			badge={<div className="text-5xl">🔒</div>}
			heading="Akun kamu aman bersama kami"
			description="Kami menggunakan enkripsi tingkat militer untuk menjaga keamanan data dan transaksimu."
			banner={<SecurityTips />}
		>
			<Link
				to="/login"
				className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors w-fit"
			>
				<ArrowLeft className="size-4" /> Kembali ke Login
			</Link>

			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold text-gray-900">Lupa Kata Sandi?</h1>
				<p className="text-sm text-gray-500 leading-relaxed">
					Tidak perlu khawatir. Masukkan email yang terdaftar dan kami akan
					mengirimkan tautan untuk membuat kata sandi baru.
				</p>
			</div>

			<form className="flex flex-col gap-4">
				<FormField
					label="Alamat Email"
					type="email"
					name="email"
					autoComplete="email"
					placeholder="email@contoh.com"
					icon={Mail}
				/>

				<button
					type="submit"
					className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors cursor-pointer"
				>
					<Send /> Kirim Tautan Reset
				</button>
			</form>

			<div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-2">
				<span className="text-sm font-medium text-gray-900">
					💡 Tips keamanan:
				</span>
				<ul className="flex flex-col gap-1 text-xs text-gray-600 list-disc list-inside">
					{tips.map((tip) => (
						<li key={tip}>{tip}</li>
					))}
				</ul>
			</div>

			<p className="text-center text-sm text-gray-500">
				Ingat kata sandi kamu?{" "}
				<Link
					className="text-blue-600 hover:underline font-medium"
					to="/login"
				>
					Masuk sekarang
				</Link>
			</p>
		</AuthLayout>
	);
}

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import ArrowRight from "~icons/lucide/arrow-right";
import CheckCircle from "~icons/lucide/check-circle";
import Eye from "~icons/lucide/eye";
import EyeOff from "~icons/lucide/eye-off";
import Lock from "~icons/lucide/lock";
import Mail from "~icons/lucide/mail";
import User from "~icons/lucide/user";
import SiFacebook from "~icons/simple-icons/facebook";
import SiGoogle from "~icons/simple-icons/google";

import AuthLayout from "#/components/AuthLayout";
import FormField from "#/components/FormField";
import { useAuth } from "#/context/auth";

const perks = [
	"Akses ribuan produk dengan harga terbaik",
	"Lacak pesanan secara real-time",
	"Simpan wishlist & alamat favorit",
	"Dapatkan notifikasi promo eksklusif",
];

function Perks() {
	return (
		<ul className="flex flex-col gap-3">
			{perks.map((perk) => (
				<li
					key={perk}
					className="flex items-center gap-2 text-sm"
				>
					<CheckCircle className="shrink-0 text-white/70" />
					{perk}
				</li>
			))}
		</ul>
	);
}

export default function Page() {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [error, setError] = useState("");

	/** @param {React.FormEvent<HTMLFormElement>} e */
	function handleSubmit(e) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const password = String(form.get("password"));
		const confirm = String(form.get("confirm"));
		if (password !== confirm) {
			setError("Kata sandi tidak cocok");
			return;
		}
		try {
			register({
				name: String(form.get("name")),
				email: String(form.get("email")),
				password,
			});
			navigate("/");
		} catch (error) {
			setError(error instanceof Error ? error.message : "Pendaftaran gagal");
		}
	}

	return (
		<AuthLayout
			variant="register"
			heading="Bergabung dengan 500.000+ pelanggan puas"
			banner={<Perks />}
		>
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-bold text-gray-900">Buat Akun Baru</h1>
				<p className="text-sm text-gray-500">
					Sudah punya akun?{" "}
					<Link
						className="text-blue-600 hover:underline"
						to="/login"
					>
						Masuk di sini
					</Link>
				</p>
			</div>

			<div className="grid grid-cols-2 gap-3">
				{[
					{ Icon: SiGoogle, label: "Daftar via Google" },
					{ Icon: SiFacebook, label: "Daftar via Facebook" },
				].map(({ Icon, label }) => (
					<button
						key={label}
						type="button"
						className="flex items-center justify-center gap-2 py-2.5 px-4 border border-black/10 rounded-xl text-sm text-gray-700 font-medium hover:bg-gray-100 transition-colors cursor-pointer bg-white"
					>
						<Icon className="size-4" /> {label}
					</button>
				))}
			</div>

			<div className="flex items-center gap-3 text-xs text-gray-400">
				<hr className="flex-1 border-black/10" />
				atau daftar dengan email
				<hr className="flex-1 border-black/10" />
			</div>

			<form
				className="flex flex-col gap-4"
				onSubmit={handleSubmit}
			>
				{error && (
					<p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
						{error}
					</p>
				)}
				<FormField
					label="Nama Lengkap"
					name="name"
					autoComplete="name"
					placeholder="Nama lengkap kamu"
					icon={User}
				/>
				<FormField
					label="Email"
					type="email"
					name="email"
					autoComplete="email"
					placeholder="email@contoh.com"
					icon={Mail}
				/>
				<FormField
					label="Kata Sandi"
					type={showPassword ? "text" : "password"}
					name="password"
					autoComplete="new-password"
					placeholder="Minimal 6 karakter"
					icon={Lock}
					trailing={
						<button
							type="button"
							onClick={() => setShowPassword((v) => !v)}
							className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors shrink-0"
							aria-label={showPassword ? "Sembunyikan" : "Tampilkan"}
						>
							{showPassword ? <EyeOff /> : <Eye />}
						</button>
					}
				/>
				<FormField
					label="Konfirmasi Kata Sandi"
					type={showConfirm ? "text" : "password"}
					name="confirm"
					autoComplete="new-password"
					placeholder="Ulangi kata sandi"
					icon={Lock}
					trailing={
						<button
							type="button"
							onClick={() => setShowConfirm((v) => !v)}
							className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors shrink-0"
							aria-label={showConfirm ? "Sembunyikan" : "Tampilkan"}
						>
							{showConfirm ? <EyeOff /> : <Eye />}
						</button>
					}
				/>

				<label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
					<input
						type="checkbox"
						name="terms"
						required
						className="accent-blue-600 size-4 mt-0.5 shrink-0"
					/>
					<span>
						Saya menyetujui{" "}
						<Link
							className="text-blue-600 hover:underline"
							to="/terms"
						>
							Syarat &amp; Ketentuan
						</Link>{" "}
						dan{" "}
						<Link
							className="text-blue-600 hover:underline"
							to="/privacy"
						>
							Kebijakan Privasi
						</Link>{" "}
						BeliMudah
					</span>
				</label>

				<button
					type="submit"
					className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors cursor-pointer"
				>
					Daftar Sekarang <ArrowRight />
				</button>

				<p className="text-center text-xs text-gray-400">
					🔒 Data kamu aman dan terenkripsi
				</p>
			</form>
		</AuthLayout>
	);
}

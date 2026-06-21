import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Eye from "~icons/lucide/eye";
import EyeOff from "~icons/lucide/eye-off";
import Lock from "~icons/lucide/lock";
import LogIn from "~icons/lucide/log-in";
import Mail from "~icons/lucide/mail";
import SiFacebook from "~icons/simple-icons/facebook";
import SiGoogle from "~icons/simple-icons/google";

import AuthLayout from "#/components/AuthLayout";
import FormField from "#/components/FormField";
import { useAuth } from "#/context/auth";

function Stats() {
	return (
		<div className="flex gap-8">
			{[
				{ value: "10rb+", label: "Produk" },
				{ value: "500rb+", label: "Pelanggan" },
				{ value: "4.8★", label: "Rating" },
			].map(({ value, label }) => (
				<div
					key={label}
					className="flex flex-col gap-1"
				>
					<span className="text-white font-bold text-xl">{value}</span>
					<span className="text-xs">{label}</span>
				</div>
			))}
		</div>
	);
}

export default function Page() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");

	/** @param {React.FormEvent<HTMLFormElement>} e */
	function handleSubmit(e) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		try {
			login(
				String(form.get("email")),
				String(form.get("password")),
				form.get("remember") === "on",
			);
			navigate("/");
		} catch (error) {
			setError(error instanceof Error ? error.message : "Login gagal");
		}
	}

	return (
		<AuthLayout
			variant="login"
			heading="Belanja lebih mudah, hidup lebih praktis"
			description="Ribuan produk pilihan dengan harga terbaik, pengiriman cepat, dan pembayaran yang aman."
			banner={<Stats />}
		>
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-bold text-gray-900">Masuk ke Akun</h1>
				<p className="text-sm text-gray-500">
					Belum punya akun?{" "}
					<Link
						className="text-blue-600 hover:underline"
						to="/register"
					>
						Daftar gratis
					</Link>
				</p>
			</div>

			<div className="grid grid-cols-2 gap-3">
				{[
					{ Icon: SiGoogle, label: "Google" },
					{ Icon: SiFacebook, label: "Facebook" },
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
				atau masuk dengan email
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
					autoComplete="current-password"
					placeholder="Masukkan kata sandi"
					icon={Lock}
					aside={
						<Link
							className="text-blue-600 hover:underline text-xs font-normal"
							to="/forgot-password"
						>
							Lupa kata sandi?
						</Link>
					}
					trailing={
						<button
							type="button"
							onClick={() => setShowPassword((v) => !v)}
							className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors shrink-0"
							aria-label={
								showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
							}
						>
							{showPassword ? <EyeOff /> : <Eye />}
						</button>
					}
				/>

				<label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
					<input
						type="checkbox"
						name="remember"
						className="accent-blue-600 size-4"
					/>
					Ingat saya selama 30 hari
				</label>

				<button
					type="submit"
					className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors cursor-pointer"
				>
					<LogIn /> Masuk
				</button>

				<p className="text-center text-xs text-gray-400">
					🔒 Login aman dengan enkripsi SSL 256-bit
				</p>
			</form>

			<p className="text-center text-xs text-gray-400">
				Dengan masuk, kamu menyetujui{" "}
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
				kami.
			</p>
		</AuthLayout>
	);
}

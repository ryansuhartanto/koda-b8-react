import { yupResolver } from "@hookform/resolvers/yup";
import type { JSX } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";
import Eye from "~icons/lucide/eye";
import EyeOff from "~icons/lucide/eye-off";
import Lock from "~icons/lucide/lock";
import LogIn from "~icons/lucide/log-in";
import Mail from "~icons/lucide/mail";
import SiFacebook from "~icons/simple-icons/facebook";
import SiGoogle from "~icons/simple-icons/google";

import AuthLayout from "#/components/AuthLayout";
import FormField from "#/components/FormField";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { message, status } from "#/services/api";
import authApi from "#/services/api/auth";

const schema = yup.object({
	email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
	password: yup.string().required("Kata sandi wajib diisi"),
	remember: yup.boolean().default(false),
});

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

export default function Page(): JSX.Element {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [login] = authApi.useLoginMutation();

	const {
		register,
		handleSubmit,
		setError,
		control,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(schema) });

	async function onSubmit(data: yup.InferType<typeof schema>) {
		try {
			await login({ email: data.email, password: data.password }).unwrap();
			void navigate("/");
		} catch (error) {
			if (status(error) === 401) {
				setError("password", { message: "Email atau kata sandi salah" });
			} else {
				setError("root", { message: message(error) ?? "Login gagal" });
			}
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
				<h1 className="text-h1 font-bold text-gray-900">Masuk ke Akun</h1>
				<p className="text-sm text-gray-500">
					Belum punya akun?{" "}
					<Link
						className="text-brand-600 hover:underline"
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
					<Button
						variant="outline"
						tone="neutral"
						key={label}
					>
						<Icon className="size-4" /> {label}
					</Button>
				))}
			</div>

			<div className="flex items-center gap-3 text-xs text-gray-400">
				<hr className="flex-1 border-black/10" />
				atau masuk dengan email
				<hr className="flex-1 border-black/10" />
			</div>

			<form
				className="flex flex-col gap-4"
				onSubmit={(e) => void handleSubmit(onSubmit)(e)}
			>
				{errors.root && (
					<p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
						{errors.root.message}
					</p>
				)}
				<FormField
					label="Email"
					type="email"
					autoComplete="email"
					placeholder="email@contoh.com"
					icon={Mail}
					error={errors.email?.message}
					{...register("email")}
				/>
				<FormField
					label="Kata Sandi"
					type={showPassword ? "text" : "password"}
					autoComplete="current-password"
					placeholder="Masukkan kata sandi"
					icon={Lock}
					error={errors.password?.message}
					aside={
						<Link
							className="text-brand-600 hover:underline text-xs font-normal"
							to="/forgot-password"
						>
							Lupa kata sandi?
						</Link>
					}
					trailing={
						<Button
							variant="icon"
							tone="neutral"
							size="none"
							className="text-gray-400 hover:text-gray-600 shrink-0"
							onClick={() => setShowPassword((v) => !v)}
							aria-label={
								showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
							}
						>
							{showPassword ? <EyeOff /> : <Eye />}
						</Button>
					}
					{...register("password")}
				/>

				<Controller
					name="remember"
					control={control}
					render={({ field: { value, onChange, ref } }) => (
						<Checkbox
							checked={value ?? false}
							onCheckedChange={onChange}
							inputRef={ref}
						>
							Ingat saya selama 30 hari
						</Checkbox>
					)}
				/>

				<Button
					size="lg"
					block
					type="submit"
					disabled={isSubmitting}
				>
					<LogIn /> Masuk
				</Button>

				<p className="text-center text-xs text-gray-400">
					🔒 Login aman dengan enkripsi SSL 256-bit
				</p>
			</form>

			<p className="text-center text-xs text-gray-400">
				Dengan masuk, kamu menyetujui{" "}
				<Link
					className="text-brand-600 hover:underline"
					to="/terms"
				>
					Syarat &amp; Ketentuan
				</Link>{" "}
				dan{" "}
				<Link
					className="text-brand-600 hover:underline"
					to="/privacy"
				>
					Kebijakan Privasi
				</Link>{" "}
				kami.
			</p>
		</AuthLayout>
	);
}

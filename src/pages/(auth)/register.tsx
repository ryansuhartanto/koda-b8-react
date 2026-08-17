import type { JSX } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ArrowRight from "~icons/lucide/arrow-right";
import CheckCircle from "~icons/lucide/check-circle";
import Eye from "~icons/lucide/eye";
import EyeOff from "~icons/lucide/eye-off";
import Lock from "~icons/lucide/lock";
import Mail from "~icons/lucide/mail";
import UserIcon from "~icons/lucide/user";
import SiFacebook from "~icons/simple-icons/facebook";
import SiGoogle from "~icons/simple-icons/google";

import AuthLayout from "#/components/AuthLayout";
import FormField from "#/components/FormField";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { message, status } from "#/services/api";
import authApi from "#/services/api/auth";

const schema = yup.object({
	name: yup.string().trim().required("Nama wajib diisi"),
	email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
	password: yup
		.string()
		.min(8, "Minimal 8 karakter")
		.required("Kata sandi wajib diisi"),
	confirm: yup
		.string()
		.oneOf([yup.ref("password")], "Kata sandi tidak cocok")
		.required("Konfirmasi kata sandi wajib diisi"),
	terms: yup
		.boolean()
		.oneOf([true], "Kamu harus menyetujui syarat & ketentuan")
		.required(),
});

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

export default function Page(): JSX.Element {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [registerUser] = authApi.useRegisterMutation();

	const {
		register,
		handleSubmit,
		setError,
		control,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(schema) });

	async function onSubmit(data: yup.InferType<typeof schema>) {
		try {
			await registerUser({
				name: data.name,
				email: data.email,
				password: data.password,
			}).unwrap();
			void navigate("/");
		} catch (error) {
			if (status(error) === 409) {
				setError("email", { message: "Email sudah terdaftar, coba masuk" });
			} else {
				setError("root", { message: message(error) ?? "Pendaftaran gagal" });
			}
		}
	}

	return (
		<AuthLayout
			variant="register"
			heading="Bergabung dengan 500.000+ pelanggan puas"
			banner={<Perks />}
		>
			<div className="flex flex-col gap-1">
				<h1 className="text-h1 font-bold text-gray-900">Buat Akun Baru</h1>
				<p className="text-sm text-gray-500">
					Sudah punya akun?{" "}
					<Link
						className="text-brand-600 hover:underline"
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
				atau daftar dengan email
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
					label="Nama Lengkap"
					autoComplete="name"
					placeholder="Nama lengkap kamu"
					icon={UserIcon}
					error={errors.name?.message}
					{...register("name")}
				/>
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
					autoComplete="new-password"
					placeholder="Minimal 6 karakter"
					icon={Lock}
					error={errors.password?.message}
					trailing={
						<Button
							variant="icon"
							tone="neutral"
							size="none"
							className="text-gray-400 hover:text-gray-600 shrink-0"
							onClick={() => setShowPassword((v) => !v)}
							aria-label={showPassword ? "Sembunyikan" : "Tampilkan"}
						>
							{showPassword ? <EyeOff /> : <Eye />}
						</Button>
					}
					{...register("password")}
				/>
				<FormField
					label="Konfirmasi Kata Sandi"
					type={showConfirm ? "text" : "password"}
					autoComplete="new-password"
					placeholder="Ulangi kata sandi"
					icon={Lock}
					error={errors.confirm?.message}
					trailing={
						<Button
							variant="icon"
							tone="neutral"
							size="none"
							className="text-gray-400 hover:text-gray-600 shrink-0"
							onClick={() => setShowConfirm((v) => !v)}
							aria-label={showConfirm ? "Sembunyikan" : "Tampilkan"}
						>
							{showConfirm ? <EyeOff /> : <Eye />}
						</Button>
					}
					{...register("confirm")}
				/>

				<div className="flex flex-col gap-1">
					<Controller
						name="terms"
						control={control}
						render={({ field: { value, onChange, ref } }) => (
							<Checkbox
								checked={value ?? false}
								onCheckedChange={onChange}
								inputRef={ref}
								className="items-start [&>button]:mt-0.5"
							>
								<span>
									Saya menyetujui{" "}
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
									BeliMudah
								</span>
							</Checkbox>
						)}
					/>
					{errors.terms && (
						<span className="text-xs text-red-500 ml-6">
							{errors.terms.message}
						</span>
					)}
				</div>

				<Button
					tone="accent"
					size="lg"
					block
					className="shadow-none"
					type="submit"
					disabled={isSubmitting}
				>
					Daftar Sekarang <ArrowRight />
				</Button>

				<p className="text-center text-xs text-gray-400">
					🔒 Data kamu aman dan terenkripsi
				</p>
			</form>
		</AuthLayout>
	);
}

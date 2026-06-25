import { useState } from "react";
import SquarePen from "~icons/lucide/square-pen";

import Avatar from "#/components/Avatar";
import FormField from "#/components/FormField";
import { useAppDispatch, useAppSelector } from "#/store";
import { selectCurrentUser, updateProfile } from "#/store/reducers/auth";

export default function Page() {
	const user = useAppSelector(selectCurrentUser);
	const dispatch = useAppDispatch();
	const [saved, setSaved] = useState(false);

	/** @param {React.FormEvent<HTMLFormElement>} e */
	function handleSubmit(e) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		dispatch(
			updateProfile({
				name: form.get("name")?.toString() ?? undefined,
				phone: form.get("phone")?.toString() ?? undefined,
				birthdate: form.get("birthdate")?.toString() ?? undefined,
				gender: /** @type {"M" | "F" | "X" | undefined} */ (
					form.get("gender")?.toString() ?? undefined
				),
			}),
		);
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	}

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-medium text-gray-900">
					Pengaturan Profil
				</h1>
				<button
					type="submit"
					form="profile-form"
					className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors cursor-pointer bg-white"
				>
					<SquarePen className="size-4" />
					{saved ? "Tersimpan!" : "Simpan"}
				</button>
			</div>

			<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-6">
				<div className="flex items-center gap-4">
					<Avatar className="size-16 text-xl" />
					<button
						type="button"
						className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
					>
						Ganti Foto Profil
					</button>
				</div>

				<form
					id="profile-form"
					className="flex flex-col gap-5"
					onSubmit={handleSubmit}
				>
					<FormField
						label="Nama Lengkap"
						name="name"
						autoComplete="name"
						defaultValue={user?.name ?? ""}
					/>
					<FormField
						label="Email"
						type="email"
						name="email"
						autoComplete="email"
						defaultValue={user?.email ?? ""}
						readOnly
					/>
					<FormField
						label="Nomor Telepon"
						type="tel"
						name="phone"
						autoComplete="tel"
						defaultValue={user?.phone ?? ""}
					/>
					<FormField
						label="Tanggal Lahir"
						type="date"
						name="birthdate"
						defaultValue={user?.birthdate ?? ""}
					/>

					<label className="flex flex-col gap-2 text-sm text-gray-600">
						<span>Jenis Kelamin</span>
						<div className="flex items-center gap-2 border border-black/10 rounded-xl px-4 py-2.5 focus-within:border-blue-600 transition-colors bg-gray-50 focus-within:bg-white text-gray-900">
							<select
								name="gender"
								defaultValue={user?.gender ?? ""}
								className="flex-1 w-full outline-none bg-transparent text-sm cursor-pointer"
							>
								<option value="">Pilih jenis kelamin</option>
								<option value="M">Laki-laki</option>
								<option value="F">Perempuan</option>
								<option value="X">Lainnya</option>
							</select>
						</div>
					</label>
				</form>
			</section>

			<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-4">
				<h2 className="text-lg font-medium text-gray-900">Keamanan Akun</h2>
				<div className="flex flex-col gap-3 text-sm">
					<a
						href="/account/password"
						className="text-blue-600 hover:underline w-fit"
					>
						Ubah Kata Sandi
					</a>
					<a
						href="/account/two-factor"
						className="text-blue-600 hover:underline w-fit"
					>
						Aktifkan Verifikasi 2 Langkah
					</a>
				</div>
			</section>
		</>
	);
}

import type { JSX } from "react";

import Avatar from "#/components/Avatar";
import FormField from "#/components/FormField";
import meApi from "#/services/api/me";

const genders: Record<string, string> = {
	M: "Laki-laki",
	F: "Perempuan",
	X: "Lainnya",
};

export default function Page(): JSX.Element {
	const { data: user } = meApi.useMeQuery();

	return (
		<>
			<h1 className="text-h1 font-medium text-gray-900">Pengaturan Profil</h1>

			<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-6">
				<div className="flex items-center gap-4">
					<Avatar className="size-16 text-xl" />
					<span className="text-sm text-gray-500">
						{/* the API exposes no way to write a profile back yet */}
						Profil hanya bisa dilihat untuk sekarang.
					</span>
				</div>

				<div className="flex flex-col gap-5">
					<FormField
						label="Nama Lengkap"
						name="name"
						value={user?.name ?? ""}
						readOnly
					/>
					<FormField
						label="Email"
						type="email"
						name="email"
						value={user?.email ?? ""}
						readOnly
					/>
					<FormField
						label="Nomor Telepon"
						type="tel"
						name="phone"
						value={user?.phone ?? "-"}
						readOnly
					/>
					<FormField
						label="Tanggal Lahir"
						name="birthdate"
						value={user?.birthdate ?? "-"}
						readOnly
					/>
					<FormField
						label="Jenis Kelamin"
						name="gender"
						value={user?.gender ? (genders[user.gender] ?? user.gender) : "-"}
						readOnly
					/>
				</div>
			</section>

			<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-4">
				<h2 className="text-h2 font-medium text-gray-900">Keamanan Akun</h2>
				<div className="flex flex-col gap-3 text-sm">
					<a
						href="/account/password"
						className="text-brand-600 hover:underline w-fit"
					>
						Ubah Kata Sandi
					</a>
					<a
						href="/account/two-factor"
						className="text-brand-600 hover:underline w-fit"
					>
						Aktifkan Verifikasi 2 Langkah
					</a>
				</div>
			</section>
		</>
	);
}

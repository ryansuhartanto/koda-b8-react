import type { JSX, SubmitEvent } from "react";
import SquarePen from "~icons/lucide/square-pen";

import Avatar from "#/components/Avatar";
import FormField from "#/components/FormField";
import { Button } from "#/components/ui/button";
import { Select } from "#/components/ui/select";
import { useToast } from "#/components/ui/toast";
import { field } from "#/lib/utils";
import { useAppDispatch, useAppSelector } from "#/store";
import { selectCurrentUser, updateProfile } from "#/store/reducers/auth";

const genders = [
	{ value: "M", label: "Laki-laki" },
	{ value: "F", label: "Perempuan" },
	{ value: "X", label: "Lainnya" },
];

export default function Page(): JSX.Element {
	const user = useAppSelector(selectCurrentUser);
	const dispatch = useAppDispatch();
	const toast = useToast();

	function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		dispatch(
			updateProfile({
				name: field(form, "name"),
				phone: field(form, "phone"),
				birthdate: field(form, "birthdate"),
				gender: field(form, "gender") as "M" | "F" | "X" | undefined,
			}),
		);
		toast.add({
			title: "Profil tersimpan",
			description: "Perubahan kamu sudah disimpan.",
		});
	}

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-medium text-gray-900">
					Pengaturan Profil
				</h1>
				<Button
					variant="outline"
					className="py-2"
					type="submit"
					form="profile-form"
				>
					<SquarePen className="size-4" />
					Simpan
				</Button>
			</div>

			<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-6">
				<div className="flex items-center gap-4">
					<Avatar className="size-16 text-xl" />
					<Button
						variant="link"
						size="none"
						className="text-sm"
					>
						Ganti Foto Profil
					</Button>
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

					<Select
						items={genders}
						defaultValue={user?.gender}
						name="gender"
						label="Jenis Kelamin"
						placeholder="Pilih jenis kelamin"
					/>
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

import type { JSX, SubmitEvent } from "react";
import { useState } from "react";

import Plus from "~icons/lucide/plus";
import X from "~icons/lucide/x";

import FormField from "#/components/FormField";
import { Button } from "#/components/ui/button";
import { field } from "#/lib/utils";
import { message } from "#/services/api";
import addressesApi from "#/services/api/addresses";
import type { Address } from "#/services/api/addresses";

function AddressCard({
	label,
	is_default,
	name,
	phone,
	address,
	city,
	province,
	postal_code,
}: Address) {
	return (
		<article className="bg-white border border-black/10 rounded-2xl p-5 flex flex-col gap-3">
			<div className="flex items-center gap-2">
				<h2 className="text-h3 font-medium text-gray-900">{label}</h2>
				{is_default && (
					<span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-600 text-white">
						Utama
					</span>
				)}
			</div>

			<div className="flex flex-col gap-1 text-sm text-gray-600">
				<p className="text-gray-900">
					{name} &middot; {phone}
				</p>
				<p>{address}</p>
				<p>
					{city}, {province} {postal_code}
				</p>
			</div>
		</article>
	);
}

function AddressForm({ onDone }: { onDone: () => void }) {
	const [createAddress, { error, isLoading }] =
		addressesApi.useCreateAddressMutation();

	async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);

		// a rejected save keeps the form open; the banner reads the error below
		const result = await createAddress({
			label: field(form, "label") ?? "",
			name: field(form, "name") ?? "",
			phone: field(form, "phone") ?? "",
			address: field(form, "address") ?? "",
			city: field(form, "city") ?? "",
			province: field(form, "province") ?? "",
			postal_code: field(form, "postal_code") ?? "",
		});

		if ("data" in result) {
			onDone();
		}
	}

	return (
		<form
			className="bg-white border border-black/10 rounded-2xl p-5 flex flex-col gap-4"
			onSubmit={(e) => void handleSubmit(e)}
		>
			{message(error) && (
				<p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
					{message(error)}
				</p>
			)}
			<FormField
				label="Label"
				name="label"
				placeholder="Rumah"
				required
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<FormField
					label="Nama Penerima"
					name="name"
					autoComplete="name"
					required
				/>
				<FormField
					label="Nomor Telepon"
					type="tel"
					name="phone"
					autoComplete="tel"
					required
				/>
			</div>
			<FormField
				label="Alamat Lengkap"
				name="address"
				required
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<FormField
					label="Kota"
					name="city"
					required
				/>
				<FormField
					label="Provinsi"
					name="province"
					required
				/>
			</div>
			<FormField
				label="Kode Pos"
				name="postal_code"
				inputMode="numeric"
				required
			/>
			<Button
				type="submit"
				disabled={isLoading}
			>
				Simpan Alamat
			</Button>
		</form>
	);
}

export default function Page(): JSX.Element {
	const { data: addresses = [] } = addressesApi.useAddressesQuery();
	const [adding, setAdding] = useState(false);

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-h1 font-medium text-gray-900">Alamat Saya</h1>
				<Button onClick={() => setAdding((v) => !v)}>
					{adding ? (
						<>
							<X className="size-4" /> Batal
						</>
					) : (
						<>
							<Plus className="size-4" /> Tambah Alamat
						</>
					)}
				</Button>
			</div>

			{adding && <AddressForm onDone={() => setAdding(false)} />}

			{addresses.length > 0 ? (
				<div className="flex flex-col gap-4">
					{addresses.map((addr) => (
						<AddressCard
							key={addr.id}
							{...addr}
						/>
					))}
				</div>
			) : (
				<div className="bg-white border border-black/10 rounded-2xl p-12 flex flex-col items-center gap-3 text-center text-gray-500 text-sm">
					Belum ada alamat tersimpan.
				</div>
			)}
		</>
	);
}

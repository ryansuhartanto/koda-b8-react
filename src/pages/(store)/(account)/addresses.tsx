import type { JSX } from "react";
import Plus from "~icons/lucide/plus";
import SquarePen from "~icons/lucide/square-pen";
import Trash2 from "~icons/lucide/trash-2";

import { Button } from "#/components/ui/button";
import type { Address } from "#/lib/db";
import { useAppDispatch, useAppSelector } from "#/store";
import {
	removeAddress,
	selectCurrentUser,
	updateAddress,
} from "#/store/reducers/auth";

function AddressCard({
	label,
	isDefault,
	name,
	phone,
	address,
	city,
	province,
	postalCode,
	onDelete,
	onSetDefault,
}: Address & { onDelete: () => void; onSetDefault: () => void }) {
	return (
		<article className="bg-white border border-black/10 rounded-2xl p-5 flex flex-col gap-3">
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-2">
					<h2 className="font-medium text-gray-900">
						{label}
						{isDefault ? " (Utama)" : ""}
					</h2>
					{isDefault && (
						<span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
							Utama
						</span>
					)}
				</div>
				<div className="flex items-center gap-2 text-gray-400">
					<Button
						variant="icon"
						size="none"
						aria-label={`Ubah alamat ${label}`}
					>
						<SquarePen className="size-5" />
					</Button>
					<Button
						variant="icon"
						tone="danger"
						size="none"
						aria-label={`Hapus alamat ${label}`}
						onClick={onDelete}
					>
						<Trash2 className="size-5" />
					</Button>
				</div>
			</div>

			<div className="flex flex-col gap-1 text-sm text-gray-600">
				<p className="text-gray-900">
					{name} &middot; {phone}
				</p>
				<p>{address}</p>
				<p>
					{city}, {province} {postalCode}
				</p>
			</div>

			{!isDefault && (
				<Button
					variant="link"
					size="none"
					className="text-sm w-fit"
					onClick={onSetDefault}
				>
					Jadikan Alamat Utama
				</Button>
			)}
		</article>
	);
}

export default function Page(): JSX.Element {
	const user = useAppSelector(selectCurrentUser);
	const dispatch = useAppDispatch();
	const addresses = user?.addresses ?? [];

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-medium text-gray-900">Alamat Saya</h1>
				<Button>
					<Plus className="size-4" /> Tambah Alamat
				</Button>
			</div>

			{addresses.length > 0 ? (
				<div className="flex flex-col gap-4">
					{addresses.map((addr) => (
						<AddressCard
							key={addr.id}
							{...addr}
							onDelete={() => {
								dispatch(removeAddress(addr.id));
							}}
							onSetDefault={() => {
								dispatch(updateAddress(addr.id, { isDefault: true }));
							}}
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

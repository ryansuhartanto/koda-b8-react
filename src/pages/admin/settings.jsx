import FormField from "#/components/FormField";

export default function Page() {
	return (
		<div className="flex flex-col gap-6 max-w-2xl">
			<h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>

			<section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-5">
				<h2 className="text-lg font-medium text-gray-900">Informasi Toko</h2>
				<FormField
					label="Nama Toko"
					name="storeName"
					defaultValue="BeliMudah"
				/>
				<FormField
					label="Email Dukungan"
					type="email"
					name="supportEmail"
					defaultValue="bantuan@belimudah.id"
				/>
				<FormField
					label="Nomor Telepon"
					type="tel"
					name="phone"
					defaultValue="0800-1234-5678"
				/>
				<button
					type="submit"
					className="self-start px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
				>
					Simpan Perubahan
				</button>
			</section>

			<p className="text-sm text-gray-400">
				Halaman ini belum ada di mockup, jadi ini placeholder yang konsisten
				dengan pola admin lainnya.
			</p>
		</div>
	);
}

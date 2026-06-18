import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import Eye from "~icons/lucide/eye";
import Filter from "~icons/lucide/filter";
import Plus from "~icons/lucide/plus";
import Pencil from "~icons/lucide/square-pen";
import Star from "~icons/lucide/star";
import Trash2 from "~icons/lucide/trash-2";
import X from "~icons/lucide/x";

import {
	DataTable,
	TableSearch,
	useDataTable,
} from "#/components/admin/DataTable";
import StatCard from "#/components/admin/StatCard";
import Badge from "#/components/Badge";
import FormField from "#/components/FormField";
import data from "#/data.json";
import { productTag } from "#/lib/status";
import { cn, rupiah } from "#/lib/utils";

const products = data.products;

const productStats = [
	{ label: "Total Produk", value: products.length },
	{
		label: "Produk Baru",
		value: products.filter((p) => p.tags.includes("baru")).length,
	},
	{ label: "Stok Rendah", value: products.filter((p) => p.stock < 10).length },
	{
		label: "Produk Promo",
		value: products.filter((p) => p.tags.includes("promo")).length,
	},
];

const column = createColumnHelper();

const columns = [
	column.accessor((p) => `${p.name} ${p.brand}`, {
		id: "product",
		header: "Produk",
		cell: ({ row }) => {
			const p = row.original;
			return (
				<div className="flex items-center gap-3">
					<img
						src={p.img}
						alt={p.name}
						className="size-10 shrink-0 rounded-lg object-cover bg-gray-100"
					/>
					<div className="flex flex-col">
						<span className="font-medium text-gray-900">{p.name}</span>
						<span className="text-xs text-gray-500">{p.brand}</span>
					</div>
				</div>
			);
		},
	}),
	column.accessor("category", {
		id: "category",
		header: "Kategori",
		filterFn: "equalsString",
		cell: (info) => <Badge color="blue">{info.getValue()}</Badge>,
	}),
	column.accessor("price", {
		header: "Harga",
		cell: ({ row }) => {
			const { price, originalPrice } = row.original;
			return (
				<div className="flex flex-col tabular-nums">
					<span className="font-medium text-blue-600">{rupiah(price)}</span>
					{originalPrice && (
						<span className="text-xs text-gray-400 line-through">
							{rupiah(originalPrice)}
						</span>
					)}
				</div>
			);
		},
	}),
	column.accessor("stock", {
		header: "Stok",
		cell: (info) => {
			const stock = info.getValue();
			return (
				<span
					className={cn(
						"tabular-nums font-medium",
						stock < 20 ? "text-amber-600" : "text-gray-900",
					)}
				>
					{stock}
				</span>
			);
		},
	}),
	column.accessor("rating", {
		header: "Rating",
		cell: ({ row }) => (
			<span className="flex items-center gap-1 tabular-nums text-gray-900">
				<Star className="size-4 text-amber-400 [&_path]:fill-current" />
				{row.original.rating}{" "}
				<span className="text-gray-400">({row.original.ratingCount})</span>
			</span>
		),
	}),
	column.accessor((p) => p.tags, {
		id: "status",
		header: "Status",
		enableSorting: false,
		enableGlobalFilter: false,
		cell: ({ row }) => (
			<div className="flex flex-wrap gap-1">
				{row.original.tags.map((tag) => (
					<Badge
						key={tag}
						color={productTag[tag]?.color}
					>
						{productTag[tag]?.label ?? tag}
					</Badge>
				))}
			</div>
		),
	}),
	column.display({
		id: "actions",
		header: "Aksi",
		cell: () => (
			<div className="flex items-center gap-2 text-gray-400">
				<button
					type="button"
					aria-label="Lihat"
					className="hover:text-blue-600 transition-colors cursor-pointer"
				>
					<Eye className="size-4.5" />
				</button>
				<button
					type="button"
					aria-label="Ubah"
					className="hover:text-blue-600 transition-colors cursor-pointer"
				>
					<Pencil className="size-4.5" />
				</button>
				<button
					type="button"
					aria-label="Hapus"
					className="hover:text-red-500 transition-colors cursor-pointer"
				>
					<Trash2 className="size-4.5" />
				</button>
			</div>
		),
	}),
];

function AddProductModal({ onClose }) {
	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center p-6 overflow-y-auto bg-black/40">
			<div className="bg-white rounded-2xl w-full max-w-2xl my-12 shadow-xl">
				<header className="flex justify-between items-center p-6 border-b border-black/10">
					<h2 className="text-lg font-medium text-gray-900">
						Tambah Produk Baru
					</h2>
					<button
						type="button"
						aria-label="Tutup"
						onClick={onClose}
						className="text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
					>
						<X className="size-5" />
					</button>
				</header>

				<form className="p-6 flex flex-col gap-5">
					<div className="grid grid-cols-2 gap-4">
						<FormField
							label="Nama Produk"
							name="name"
						/>
						<FormField
							label="Merek"
							name="brand"
						/>
						<FormField
							label="Harga (IDR)"
							type="number"
							name="price"
						/>
						<FormField
							label="Harga Asli (IDR)"
							type="number"
							name="originalPrice"
						/>
						<FormField
							label="Stok"
							type="number"
							name="stock"
						/>
						<label className="flex flex-col gap-2 text-sm text-gray-600">
							<span>Kategori</span>
							<div className="flex items-center border border-black/10 rounded-xl px-4 py-2.5 focus-within:border-blue-600 transition-colors bg-gray-50 focus-within:bg-white text-gray-900">
								<select
									name="category"
									className="flex-1 w-full outline-none bg-transparent text-sm cursor-pointer"
								>
									{data.categories.map((c) => (
										<option key={c.name}>{c.name}</option>
									))}
								</select>
							</div>
						</label>
					</div>

					<label className="flex flex-col gap-2 text-sm text-gray-600">
						<span>Deskripsi</span>
						<textarea
							name="description"
							rows={3}
							className="border border-black/10 rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white text-gray-900 text-sm resize-y"
						/>
					</label>

					<div className="flex gap-6 text-sm text-gray-700">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								name="unggulan"
								className="accent-blue-600 size-4"
							/>
							Produk Unggulan
						</label>
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								name="baru"
								className="accent-blue-600 size-4"
							/>
							Produk Baru
						</label>
					</div>

					<div className="flex gap-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 py-3 border border-black/10 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
						>
							Batal
						</button>
						<button
							type="submit"
							className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors cursor-pointer"
						>
							Tambah Produk
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default function Page() {
	const [modalOpen, setModalOpen] = useState(false);
	const table = useDataTable({ data: products, columns });
	const categoryFilter = table.getColumn("category").getFilterValue() ?? "";

	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
				<button
					type="button"
					onClick={() => setModalOpen(true)}
					className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors cursor-pointer"
				>
					<Plus className="size-4" /> Tambah Produk
				</button>
			</div>

			<div className="flex gap-3">
				<TableSearch
					table={table}
					placeholder="Cari produk atau merek..."
				/>
				<label className="flex items-center border border-black/10 rounded-xl px-4 bg-white text-sm text-gray-700">
					<select
						value={categoryFilter}
						onChange={(e) =>
							table
								.getColumn("category")
								.setFilterValue(e.target.value || undefined)
						}
						className="outline-none bg-transparent cursor-pointer py-2.5"
					>
						<option value="">Semua Kategori</option>
						{data.categories.map((c) => (
							<option key={c.name}>{c.name}</option>
						))}
					</select>
				</label>
				<button
					type="button"
					className="flex items-center gap-2 px-4 py-2.5 border border-black/10 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
				>
					<Filter className="size-4" /> Filter
				</button>
			</div>

			<div className="grid grid-cols-4 gap-6">
				{productStats.map((s) => (
					<StatCard
						key={s.label}
						label={s.label}
						value={s.value}
						center
					/>
				))}
			</div>

			<section className="bg-white border border-black/10 rounded-2xl">
				<header className="px-4 py-3 text-sm text-gray-500 border-b border-black/10">
					{table.getRowModel().rows.length} produk
				</header>
				<DataTable table={table} />
			</section>

			{modalOpen && <AddProductModal onClose={() => setModalOpen(false)} />}
		</div>
	);
}

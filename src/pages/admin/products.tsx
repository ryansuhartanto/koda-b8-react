import { createColumnHelper } from "@tanstack/react-table";
import type { JSX } from "react";
import { useState } from "react";
import Eye from "~icons/lucide/eye";
import Plus from "~icons/lucide/plus";
import Pencil from "~icons/lucide/square-pen";
import Star from "~icons/lucide/star";
import Trash2 from "~icons/lucide/trash-2";

import {
	DataTable,
	TableSearch,
	useDataTable,
} from "#/components/admin/DataTable";
import StatCard from "#/components/admin/StatCard";
import Badge from "#/components/Badge";
import FormField from "#/components/FormField";
import { Button, buttonVariants } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Dialog, DialogClose } from "#/components/ui/dialog";
import { Select } from "#/components/ui/select";
import data from "#/data.json";
import { productTag } from "#/lib/status";
import { cn, rupiah } from "#/lib/utils";

const { products } = data;

const ALL = "all";

const categoryOptions = data.categories.map((c) => ({
	value: c.name,
	label: c.name,
}));

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

export type Product = {
	name: string;
	brand: string;
	category: string;
	img: string;
	price: number;
	originalPrice?: number;
	stock: number;
	rating: number;
	ratingCount: number;
	tags: string[];
};

const column = createColumnHelper<Product>();

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
					<span className="font-medium text-brand-600">{rupiah(price)}</span>
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
				<Button
					variant="icon"
					size="none"
					aria-label="Lihat"
				>
					<Eye className="size-4.5" />
				</Button>
				<Button
					variant="icon"
					size="none"
					aria-label="Ubah"
				>
					<Pencil className="size-4.5" />
				</Button>
				<Button
					variant="icon"
					tone="danger"
					size="none"
					aria-label="Hapus"
				>
					<Trash2 className="size-4.5" />
				</Button>
			</div>
		),
	}),
];

function AddProductModal({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
			title="Tambah Produk Baru"
			className="max-w-2xl"
		>
			<form className="p-6 pt-2 flex flex-col gap-5">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
					<Select
						items={categoryOptions}
						defaultValue={categoryOptions[0]?.value}
						name="category"
						label="Kategori"
					/>
				</div>

				<label className="flex flex-col gap-2 text-sm text-gray-600">
					<span>Deskripsi</span>
					<textarea
						name="description"
						rows={3}
						className="border border-black/10 rounded-xl px-4 py-2.5 outline-none focus:border-brand-600 transition-colors bg-gray-50 focus:bg-white text-gray-900 text-sm resize-y"
					/>
				</label>

				<div className="flex gap-6 text-sm text-gray-700">
					<Checkbox name="unggulan">Produk Unggulan</Checkbox>
					<Checkbox name="baru">Produk Baru</Checkbox>
				</div>

				<div className="flex gap-4">
					<DialogClose
						className={cn(
							buttonVariants({
								variant: "outline",
								tone: "neutral",
								size: "lg",
							}),
							"flex-1",
						)}
					>
						Batal
					</DialogClose>
					<Button
						size="lg"
						className="flex-1"
						type="submit"
					>
						Tambah Produk
					</Button>
				</div>
			</form>
		</Dialog>
	);
}

export default function Page(): JSX.Element {
	const [modalOpen, setModalOpen] = useState(false);
	const table = useDataTable({ data: products, columns });
	const categoryFilter =
		(table.getColumn("category")?.getFilterValue() as string | undefined) ??
		ALL;

	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<h1 className="text-h1 font-bold text-gray-900">Manajemen Produk</h1>
				<Button
					tone="accent"
					className="shadow-none"
					onClick={() => setModalOpen(true)}
				>
					<Plus className="size-4" /> Tambah Produk
				</Button>
			</div>

			<div className="flex gap-3">
				<TableSearch
					table={table}
					placeholder="Cari produk atau merek..."
				/>
				<Select
					items={[{ value: ALL, label: "Semua Kategori" }, ...categoryOptions]}
					value={categoryFilter}
					onValueChange={(value) => {
						table
							.getColumn("category")
							?.setFilterValue(value === ALL ? undefined : value);
					}}
					triggerClassName="w-auto bg-white"
				/>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

			<AddProductModal
				open={modalOpen}
				onOpenChange={setModalOpen}
			/>
		</div>
	);
}

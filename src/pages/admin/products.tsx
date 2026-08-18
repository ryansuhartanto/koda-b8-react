import type { JSX, SubmitEvent } from "react";
import { useState } from "react";

import { createColumnHelper } from "@tanstack/react-table";

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
import { Dialog, DialogClose } from "#/components/ui/dialog";
import { Select } from "#/components/ui/select";
import { useToast } from "#/components/ui/toast";
import { productTag } from "#/lib/status";
import { cn, rupiah } from "#/lib/utils";
import { message } from "#/services/api";
import catalogApi from "#/services/api/catalog";
import productsApi from "#/services/api/products";
import type { Product } from "#/services/api/products";

const ALL = "all";
const LOW_STOCK = 10;
const NEW_DAYS = 30;
const PAGE = 100;

// the API carries no tags, so they are read back off the columns that imply them
function tagsOf(product: Product): string[] {
	const tags: string[] = [];

	if (
		product.original_price_idr !== undefined &&
		product.price_idr !== undefined &&
		product.original_price_idr > product.price_idr
	) {
		tags.push("promo");
	}

	const age = Date.now() - new Date(product.created_at).getTime();

	if (age < NEW_DAYS * 24 * 60 * 60 * 1000) {
		tags.push("baru");
	}

	return tags;
}

const column = createColumnHelper<Product>();

const columns = [
	column.accessor((p) => `${p.name} ${p.brand ?? ""}`, {
		id: "product",
		header: "Produk",
		cell: ({ row }) => {
			const p = row.original;
			return (
				<div className="flex items-center gap-3">
					<img
						src={p.urls?.[0]}
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
	column.accessor((p) => p.category ?? "", {
		id: "category",
		header: "Kategori",
		filterFn: "equalsString",
		cell: (info) => <Badge color="blue">{info.getValue()}</Badge>,
	}),
	column.accessor((p) => p.price_idr ?? 0, {
		id: "price",
		header: "Harga",
		cell: ({ row }) => {
			const { price_idr, original_price_idr } = row.original;
			return (
				<div className="flex flex-col tabular-nums">
					<span className="font-medium text-brand-600">
						{rupiah(price_idr ?? 0)}
					</span>
					{original_price_idr !== undefined &&
						original_price_idr !== price_idr && (
							<span className="text-xs text-gray-400 line-through">
								{rupiah(original_price_idr)}
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
	column.accessor((p) => p.rating ?? 0, {
		id: "rating",
		header: "Rating",
		cell: ({ row }) => (
			<span className="flex items-center gap-1 tabular-nums text-gray-900">
				<Star className="size-4 text-amber-400 [&_path]:fill-current" />
				{row.original.rating ?? "-"}{" "}
				<span className="text-gray-400">({row.original.rating_count})</span>
			</span>
		),
	}),
	column.display({
		id: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="flex flex-wrap gap-1">
				{tagsOf(row.original).map((tag) => (
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

function number(form: FormData, key: string): number | undefined {
	const raw = form.get(key);

	return typeof raw === "string" && raw !== "" ? Number(raw) : undefined;
}

function text(form: FormData, key: string): string | undefined {
	const raw = form.get(key);

	return typeof raw === "string" && raw !== "" ? raw : undefined;
}

function AddProductModal({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const toast = useToast();
	const { data: categories = [] } = catalogApi.useCategoriesQuery();
	const { data: brands = [] } = catalogApi.useBrandsQuery();
	const [createProduct, { isLoading }] = productsApi.useCreateProductMutation();

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = new FormData(event.currentTarget);
		const url = text(form, "url");
		const original = number(form, "original_price_idr");

		if (original === undefined) {
			return;
		}

		const result = await createProduct({
			name: form.get("name") as string,
			description: text(form, "description"),
			id_category: text(form, "id_category"),
			id_brand: text(form, "id_brand"),
			sku: text(form, "sku"),
			stock: number(form, "stock") ?? 0,
			original_price_idr: original,
			discount_price_idr: number(form, "discount_price_idr"),
			urls: url === undefined ? undefined : [url],
		});

		if ("error" in result) {
			toast.add({
				title: "Gagal menambah produk",
				description: message(result.error),
			});
			return;
		}

		onOpenChange(false);
	}

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
			title="Tambah Produk Baru"
			className="max-w-2xl"
		>
			<form
				onSubmit={(event) => void handleSubmit(event)}
				className="p-6 pt-2 flex flex-col gap-5"
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<FormField
						label="Nama Produk"
						name="name"
						required
					/>
					<FormField
						label="SKU"
						name="sku"
					/>
					<FormField
						label="Harga Asli (IDR)"
						type="number"
						min={1}
						name="original_price_idr"
						required
					/>
					<FormField
						label="Harga Promo (IDR)"
						type="number"
						min={0}
						name="discount_price_idr"
						description="Kosongkan jika tidak ada promo"
					/>
					<FormField
						label="Stok"
						type="number"
						min={0}
						name="stock"
						defaultValue={0}
					/>
					<FormField
						label="URL Gambar"
						type="url"
						name="url"
					/>
					<Select
						items={categories.map((c) => ({ value: c.id, label: c.name }))}
						name="id_category"
						label="Kategori"
					/>
					<Select
						items={brands.map((b) => ({ value: b.id, label: b.name }))}
						name="id_brand"
						label="Merek"
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
						disabled={isLoading}
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
	const { data, isLoading } = productsApi.useProductsQuery({ limit: PAGE });
	const { data: categories = [] } = catalogApi.useCategoriesQuery();

	const products = data?.items ?? [];
	const table = useDataTable({ data: products, columns });
	const categoryFilter =
		(table.getColumn("category")?.getFilterValue() as string | undefined) ??
		ALL;

	const categoryOptions = categories.map((c) => ({
		value: c.name,
		label: c.name,
	}));

	const stats = [
		{ label: "Total Produk", value: data?.total ?? 0 },
		{
			label: "Produk Baru",
			value: products.filter((p) => tagsOf(p).includes("baru")).length,
		},
		{
			label: "Stok Rendah",
			value: products.filter((p) => p.stock < LOW_STOCK).length,
		},
		{
			label: "Produk Promo",
			value: products.filter((p) => tagsOf(p).includes("promo")).length,
		},
	];

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
				{stats.map((s) => (
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
				<DataTable
					table={table}
					emptyLabel={isLoading ? "Memuat…" : "Tidak ada produk."}
				/>
			</section>

			<AddProductModal
				open={modalOpen}
				onOpenChange={setModalOpen}
			/>
		</div>
	);
}

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import ChevronDown from "~icons/lucide/chevron-down";
import ChevronUp from "~icons/lucide/chevron-up";
import ChevronsUpDown from "~icons/lucide/chevrons-up-down";
import Search from "~icons/lucide/search";

import { cn } from "#/lib/utils";

/**
 * Thin wrapper over useReactTable that owns sorting + filter state and
 * pre-wires the core/sorted/filtered row models. Pass any extra useReactTable
 * options through; they override the defaults.
 *
 * @param {object} config
 * @param {unknown[]} config.data
 * @param {import("@tanstack/react-table").ColumnDef<any, any>[]} config.columns
 */
export function useDataTable({ data, columns, ...options }) {
	const [sorting, setSorting] = useState(
		/** @type {import("@tanstack/react-table").SortingState} */ ([]),
	);
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnFilters, setColumnFilters] = useState(
		/** @type {import("@tanstack/react-table").ColumnFiltersState} */ ([]),
	);

	return useReactTable({
		data,
		columns,
		state: { sorting, globalFilter, columnFilters },
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		...options,
	});
}

/**
 * @param {object} props
 * @param {false | "asc" | "desc"} props.state
 */
function SortIcon({ state }) {
	if (state === "asc") {
		return <ChevronUp className="size-3.5 text-gray-700" />;
	}
	if (state === "desc") {
		return <ChevronDown className="size-3.5 text-gray-700" />;
	}
	return (
		<ChevronsUpDown className="size-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
	);
}

/**
 * Controlled search input bound to the table's global filter.
 *
 * @param {object} props
 * @param {import("@tanstack/react-table").Table<any>} props.table
 * @param {string} [props.placeholder]
 * @param {string} [props.className]
 */
export function TableSearch({ table, placeholder = "Cari...", className }) {
	return (
		<label
			className={cn(
				"flex items-center gap-2 flex-1 border border-black/10 rounded-xl px-4 py-2.5 bg-gray-50 focus-within:bg-white focus-within:border-blue-600 transition-colors",
				className,
			)}
		>
			<Search className="size-5 text-gray-400 shrink-0" />
			<input
				type="search"
				value={table.getState().globalFilter ?? ""}
				onChange={(e) => table.setGlobalFilter(e.target.value)}
				placeholder={placeholder}
				className="flex-1 w-full outline-none bg-transparent text-sm text-gray-900"
			/>
		</label>
	);
}

/**
 * Presentational renderer for a fully-built table instance. All per-column
 * markup lives in the column `cell`/`header` definitions, so this stays generic.
 *
 * @param {object} props
 * @param {import("@tanstack/react-table").Table<any>} props.table
 * @param {string} [props.emptyLabel]
 */
export function DataTable({ table, emptyLabel = "Tidak ada data." }) {
	const { rows } = table.getRowModel();
	const columnCount = table.getVisibleFlatColumns().length;

	return (
		<div className="overflow-x-auto">
			<table className="w-full text-sm border-collapse">
				<thead>
					{table.getHeaderGroups().map((group) => (
						<tr
							key={group.id}
							className="text-left text-gray-500 border-b border-black/10"
						>
							{group.headers.map((header) => {
								const canSort = header.column.getCanSort();
								const content = header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext(),
										);

								return (
									<th
										key={header.id}
										className="font-medium px-4 py-3 whitespace-nowrap"
									>
										{canSort ? (
											<button
												type="button"
												onClick={header.column.getToggleSortingHandler()}
												className="group flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors"
											>
												{content}
												<SortIcon state={header.column.getIsSorted()} />
											</button>
										) : (
											content
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{rows.length > 0 ? (
						rows.map((row) => (
							<tr
								key={row.id}
								className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="px-4 py-3 align-middle"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={columnCount}
								className="px-4 py-12 text-center text-gray-400"
							>
								{emptyLabel}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

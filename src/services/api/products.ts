import { parseLinks } from "#/lib/api";
import type { Pagination } from "#/lib/api";

import api from ".";

export type VariantOption = {
	option: string;
	value: string;
};

export type ProductVariant = {
	id: string;
	sku?: string;
	stock: number;
	price_idr: number;
	original_price_idr: number;
	options: VariantOption[];
};

export type Product = {
	id: string;
	created_at: string;
	updated_at: string;
	name: string;
	description?: string;
	brand?: string;
	category?: string;
	urls?: string[];
	price_idr?: number;
	original_price_idr?: number;
	stock: number;
	rating?: number;
	rating_count: number;
	variants?: ProductVariant[];
};

export type ProductSort = "newest" | "price_asc" | "price_desc" | "rating";

export type RequestProducts = {
	search?: string;
	category?: string;
	brand?: string;
	sort?: ProductSort;
	limit?: number;
	offset?: number;
};

export type ResponseProducts = Pagination & {
	items: Product[];
};

const productsApi = api.injectEndpoints({
	endpoints: (build) => ({
		products: build.query<ResponseProducts, RequestProducts>({
			query: (params) => ({ url: "/products", params }),
			// pagination rides in the `Link` and `X-Total-Count` headers, not the body
			transformResponse: (items: Product[], meta) => ({
				items,
				total: Number(
					meta?.response?.headers.get("X-Total-Count") ?? items.length,
				),
				links: parseLinks(meta?.response?.headers.get("Link") ?? undefined),
			}),
			providesTags: ["products"],
		}),
		product: build.query<Product, string>({
			query: (id) => `/products/${id}`,
			providesTags: ["products"],
		}),
	}),
	overrideExisting: "throw",
});

export default productsApi;

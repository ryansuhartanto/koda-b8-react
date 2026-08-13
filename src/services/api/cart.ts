import type { VariantOption } from "#/services/api/products";

import api from ".";

export type CartItem = {
	id_variant: string;
	id_product: string;
	name: string;
	variant_options?: VariantOption[];
	sku?: string;
	urls?: string[];
	price_idr: number;
	original_price_idr: number;
	inventory: number;
	quantity: number;
	created_at: string;
};

export type Cart = {
	subtotal_idr: number;
	items: CartItem[];
};

export type RequestCart = {
	id_variant: string;
	quantity: number;
};

const cartApi = api.injectEndpoints({
	endpoints: (build) => ({
		cart: build.query<Cart, void>({
			query: () => "/me/cart",
			providesTags: ["cart"],
		}),
		setCartItem: build.mutation<void, RequestCart>({
			query: (body) => ({ url: "/me/cart", method: "POST", body }),
			invalidatesTags: ["cart"],
		}),
		removeCartItem: build.mutation<void, string>({
			query: (id) => ({ url: `/me/cart/${id}`, method: "DELETE" }),
			invalidatesTags: ["cart"],
		}),
	}),
	overrideExisting: "throw",
});

export default cartApi;

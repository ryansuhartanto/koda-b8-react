import { parseLinks } from "#/lib/api";
import type { Pagination } from "#/lib/api";

import api from ".";

export type OrderStatus =
	| "pending"
	| "packed"
	| "shipped"
	| "delivered"
	| "cancelled";

export type OrderItem = {
	id: string;
	id_variant?: string;
	product_name: string;
	variant_name?: string;
	unit_price_idr: number;
	quantity: number;
};

export type Order = {
	id: string;
	created_at: string;
	status: OrderStatus;
	id_payment: string;
	promo_code?: string;
	discount_idr: number;
	subtotal_idr: number;
	ship_cost_idr: number;
	total_idr: number;
	ship_name: string;
	ship_phone: string;
	ship_email: string;
	ship_address: string;
	ship_method: string;
	ship_note?: string;
	items: OrderItem[];
};

export type RequestOrder = {
	id_address: string;
	id_payment: string;
	ship_method: string;
	promo_code?: string;
	ship_note?: string;
};

export type RequestAllOrders = {
	status?: OrderStatus;
	limit?: number;
	offset?: number;
};

export type ResponseAllOrders = Pagination & {
	items: Order[];
};

export type RequestOrderStatus = {
	id: string;
	status: OrderStatus;
};

const ordersApi = api.injectEndpoints({
	endpoints: (build) => ({
		orders: build.query<Order[], void>({
			query: () => "/me/orders",
			providesTags: ["orders"],
		}),
		createOrder: build.mutation<Order, RequestOrder>({
			query: (body) => ({ url: "/me/orders", method: "POST", body }),
			// checkout empties the cart and draws down variant stock
			invalidatesTags: ["orders", "cart", "products"],
		}),
		allOrders: build.query<ResponseAllOrders, RequestAllOrders>({
			query: (params) => ({ url: "/orders", params }),
			// pagination rides in the `Link` and `X-Total-Count` headers, not the body
			transformResponse: (items: Order[], meta) => ({
				items,
				total: Number(
					meta?.response?.headers.get("X-Total-Count") ?? items.length,
				),
				links: parseLinks(meta?.response?.headers.get("Link") ?? undefined),
			}),
			providesTags: ["orders"],
		}),
		updateOrderStatus: build.mutation<Order, RequestOrderStatus>({
			query: ({ id, status }) => ({
				url: `/orders/${id}`,
				method: "PATCH",
				body: { status },
			}),
			invalidatesTags: ["orders"],
		}),
	}),
	overrideExisting: "throw",
});

export default ordersApi;

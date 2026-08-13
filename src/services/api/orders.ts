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
	}),
	overrideExisting: "throw",
});

export default ordersApi;

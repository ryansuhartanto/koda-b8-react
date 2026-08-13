import api from ".";

export type Category = {
	id: string;
	name: string;
	icon?: string;
	img?: string;
	product_count: number;
};

export type Brand = {
	id: string;
	name: string;
	product_count: number;
};

export type ShippingMethod = {
	id: string;
	name: string;
	cost_idr: number;
};

export type PaymentMethod = {
	id: string;
	name: string;
	metadata: Record<string, unknown>;
};

const catalogApi = api.injectEndpoints({
	endpoints: (build) => ({
		categories: build.query<Category[], void>({
			query: () => "/categories",
		}),
		brands: build.query<Brand[], void>({
			query: () => "/brands",
		}),
		shippingMethods: build.query<ShippingMethod[], void>({
			query: () => "/shipping-methods",
		}),
		paymentMethods: build.query<PaymentMethod[], void>({
			query: () => "/payment-methods",
		}),
	}),
	overrideExisting: "throw",
});

export default catalogApi;

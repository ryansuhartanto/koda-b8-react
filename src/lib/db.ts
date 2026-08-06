export type OrderStatus =
	| "pending"
	| "packed"
	| "shipped"
	| "delivered"
	| "cancelled";

export type CartItem = {
	productName: string;
	quantity: number;
};

export type OrderItem = {
	productName: string;
	quantity: number;
	price: number;
};

export type ShippingInfo = {
	name: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	province: string;
	postalCode: string;
	note: string;
	method: string;
	cost: number;
};

export type Order = {
	id: string;
	createdAt: string;
	status: OrderStatus;
	items: OrderItem[];
	shipping: ShippingInfo;
	paymentMethod: string;
	promoCode?: string;
	discount: number;
	subtotal: number;
	total: number;
};

export type Address = {
	id: string;
	label: string;
	name: string;
	phone: string;
	address: string;
	city: string;
	province: string;
	postalCode: string;
	isDefault: boolean;
};

export type SavedPayment = {
	id: string;
	type: string;
	isDefault: boolean;
};

export type User = {
	id: string;
	name: string;
	email: string;
	passwordHash: string;
	phone?: string;
	birthdate?: string;
	gender?: "M" | "F" | "X";
	avatar?: string;
	createdAt: string;
	cart: CartItem[];
	wishlist: string[];
	addresses: Address[];
	savedPayments: SavedPayment[];
};

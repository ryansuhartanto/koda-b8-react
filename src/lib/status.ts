/**
 * Single source of truth for order status, product tags, and customer tiers.
 * `color` keys map to the palette in #/components/Badge.
 */

import type { OrderStatus } from "#/lib/db";

export type OrderColor =
	| "blue"
	| "orange"
	| "green"
	| "violet"
	| "amber"
	| "red"
	| "indigo"
	| "gray";

export type OrderLabel = {
	label: string;
	color: OrderColor;
};

export const orderStatus: Record<OrderStatus, OrderLabel> = {
	pending: { label: "Pending", color: "amber" },
	packed: { label: "Dikemas", color: "indigo" },
	shipped: { label: "Dikirim", color: "indigo" },
	delivered: { label: "Terkirim", color: "green" },
	cancelled: { label: "Dibatalkan", color: "red" },
};

/** Order of tabs shown on the order management page. `undefined` = "Semua". */
export const orderStatusTabs: Array<OrderStatus | undefined> = [
	undefined,
	"pending",
	"packed",
	"shipped",
	"delivered",
];

export const productTag: Record<string, OrderLabel> = {
	baru: { label: "Baru", color: "blue" },
	unggulan: { label: "Unggulan", color: "amber" },
	promo: { label: "Promo", color: "red" },
};

export const tierColor: Record<string, OrderColor> = {
	Platinum: "indigo",
	Gold: "amber",
	Silver: "gray",
	Bronze: "orange",
};

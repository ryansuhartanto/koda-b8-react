/**
 * Single source of truth for order status, product tags, and customer tiers.
 * `color` keys map to the palette in #/components/Badge.
 */

/**
 * @typedef {"pending" | "packed" | "shipped" | "delivered" | "cancelled"} OrderStatus
 */

/** @type {Record<OrderStatus, { label: string, color: string }>} */
export const orderStatus = {
	pending: { label: "Pending", color: "amber" },
	packed: { label: "Dikemas", color: "indigo" },
	shipped: { label: "Dikirim", color: "indigo" },
	delivered: { label: "Terkirim", color: "green" },
	cancelled: { label: "Dibatalkan", color: "red" },
};

/** Order of tabs shown on the order management page. `null` = "Semua". */
export const orderStatusTabs = [
	null,
	"pending",
	"packed",
	"shipped",
	"delivered",
];

/** @type {Record<string, { label: string, color: string }>} */
export const productTag = {
	baru: { label: "Baru", color: "blue" },
	unggulan: { label: "Unggulan", color: "amber" },
	promo: { label: "Promo", color: "red" },
};

/** @type {Record<string, string>} */
export const tierColor = {
	Platinum: "indigo",
	Gold: "amber",
	Silver: "gray",
	Bronze: "orange",
};

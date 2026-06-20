/**
 * Single source of truth for order status, product tags, and customer tiers.
 * `color` keys map to the palette in #/components/Badge.
 */

/**
 * @typedef {"pending" | "packed" | "shipped" | "delivered" | "cancelled"} OrderStatus
 */

/**
 * @typedef {"blue" | "orange" | "green" | "violet" | "amber" | "red" | "indigo" | "gray"} OrderColor
 */

/**
 * @typedef OrderLabel
 * @prop {string} label
 * @prop {OrderColor} color
 */

/** @type {Record<OrderStatus, OrderLabel>} */
export const orderStatus = {
	pending: { label: "Pending", color: "amber" },
	packed: { label: "Dikemas", color: "indigo" },
	shipped: { label: "Dikirim", color: "indigo" },
	delivered: { label: "Terkirim", color: "green" },
	cancelled: { label: "Dibatalkan", color: "red" },
};

/** @type {Array<OrderStatus | null>} Order of tabs shown on the order management page. `null` = "Semua". */
export const orderStatusTabs = [
	null,
	"pending",
	"packed",
	"shipped",
	"delivered",
];

/** @type {Record<string, OrderLabel>} */
export const productTag = {
	baru: { label: "Baru", color: "blue" },
	unggulan: { label: "Unggulan", color: "amber" },
	promo: { label: "Promo", color: "red" },
};

/** @type {Record<string, OrderColor>} */
export const tierColor = {
	Platinum: "indigo",
	Gold: "amber",
	Silver: "gray",
	Bronze: "orange",
};

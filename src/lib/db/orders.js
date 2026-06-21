/**
 * @typedef {import("./types").User} User
 * @typedef {import("./types").Order} Order
 */

import { getUsers, saveUsers } from "./storage";
import { getUserById } from "./user";

/**
 * @param {User["id"]} userId
 * @param {Omit<Order, "id" | "createdAt" | "status">} orderData
 * @returns {{ user: User; order: Order }}
 */
export function placeOrder(userId, orderData) {
	const users = getUsers();
	const user = getUserById(users, userId);
	/** @type {Order} */
	const order = {
		id: `BM${Date.now().toString().slice(-8)}`,
		createdAt: new Date().toISOString(),
		status: "pending",
		...orderData,
	};
	user.orders.unshift(order);
	user.cart = [];
	saveUsers(users);
	return { user, order };
}

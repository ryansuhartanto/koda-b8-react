/**
 * @typedef {import("./types").User} User
 */

import { getUsers, saveUsers } from "./storage";
import { getUserById, updateUser } from "./user";

/**
 * @param {User["id"]} userId
 * @param {string} productName
 * @param {number} [quantity]
 * @returns {User}
 */
export function addToCart(userId, productName, quantity = 1) {
	const users = getUsers();
	const user = getUserById(users, userId);
	const existing = user.cart.find((i) => i.productName === productName);
	if (existing) {
		existing.quantity += quantity;
	} else {
		user.cart.push({ productName, quantity });
	}
	saveUsers(users);
	return user;
}

/**
 * @param {User["id"]} userId
 * @param {string} productName
 * @returns {User}
 */
export function removeFromCart(userId, productName) {
	const users = getUsers();
	const user = getUserById(users, userId);
	user.cart = user.cart.filter((i) => i.productName !== productName);
	saveUsers(users);
	return user;
}

/**
 * @param {User["id"]} userId
 * @param {string} productName
 * @param {number} quantity
 * @returns {User}
 */
export function updateCartQty(userId, productName, quantity) {
	if (quantity < 1) {
		return removeFromCart(userId, productName);
	}
	const users = getUsers();
	const user = getUserById(users, userId);
	const item = user.cart.find((i) => i.productName === productName);
	if (item) {
		item.quantity = quantity;
	}
	saveUsers(users);
	return user;
}

/**
 * @param {User["id"]} userId
 * @returns {User}
 */
export function clearCart(userId) {
	return updateUser(userId, { cart: [] });
}

/**
 * @typedef {import("./types").User} User
 */

import { getUsers, saveUsers } from "./storage";
import { getUserById } from "./user";

/**
 * @param {User["id"]} userId
 * @param {string} productName
 * @returns {User}
 */
export function toggleWishlist(userId, productName) {
	const users = getUsers();
	const user = getUserById(users, userId);
	const idx = user.wishlist.indexOf(productName);
	if (idx === -1) {
		user.wishlist.push(productName);
	} else {
		user.wishlist.splice(idx, 1);
	}
	saveUsers(users);
	return user;
}

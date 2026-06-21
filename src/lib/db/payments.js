/**
 * @typedef {import("./types").User} User
 * @typedef {import("./types").SavedPayment} SavedPayment
 */

import { getUsers, saveUsers } from "./storage";
import { getUserById } from "./user";

/**
 * @param {User["id"]} userId
 * @param {Omit<SavedPayment, "id">} payment
 * @returns {User}
 */
export function addSavedPayment(userId, payment) {
	const users = getUsers();
	const user = getUserById(users, userId);
	if (payment.isDefault) {
		for (const p of user.savedPayments) {
			p.isDefault = false;
		}
	}
	user.savedPayments.push({
		id: `pm_${Math.random().toString(36).slice(2, 8)}`,
		...payment,
	});
	saveUsers(users);
	return user;
}

/**
 * @param {User["id"]} userId
 * @param {string} pmId
 * @returns {User}
 */
export function removeSavedPayment(userId, pmId) {
	const users = getUsers();
	const user = getUserById(users, userId);
	user.savedPayments = user.savedPayments.filter((p) => p.id !== pmId);
	saveUsers(users);
	return user;
}

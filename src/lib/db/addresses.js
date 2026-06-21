/**
 * @typedef {import("./types").User} User
 * @typedef {import("./types").Address} Address
 */

import { getUsers, saveUsers } from "./storage";
import { getUserById } from "./user";

/**
 * @param {User["id"]} userId
 * @param {Omit<Address, "id">} address
 * @returns {User}
 */
export function addAddress(userId, address) {
	const users = getUsers();
	const user = getUserById(users, userId);
	if (address.isDefault) {
		for (const a of user.addresses) {
			a.isDefault = false;
		}
	}
	user.addresses.push({
		id: `addr_${Math.random().toString(36).slice(2, 8)}`,
		...address,
	});
	saveUsers(users);
	return user;
}

/**
 * @param {User["id"]} userId
 * @param {string} addrId
 * @param {Partial<Address>} patch
 * @returns {User}
 */
export function updateAddress(userId, addrId, patch) {
	const users = getUsers();
	const user = getUserById(users, userId);
	if (patch.isDefault) {
		for (const a of user.addresses) {
			a.isDefault = false;
		}
	}
	const i = user.addresses.findIndex((a) => a.id === addrId);
	if (i !== -1) {
		user.addresses[i] = /** @type {Address} */ ({
			...user.addresses[i],
			...patch,
		});
	}
	saveUsers(users);
	return user;
}

/**
 * @param {User["id"]} userId
 * @param {string} addrId
 * @returns {User}
 */
export function removeAddress(userId, addrId) {
	const users = getUsers();
	const user = getUserById(users, userId);
	user.addresses = user.addresses.filter((a) => a.id !== addrId);
	saveUsers(users);
	return user;
}

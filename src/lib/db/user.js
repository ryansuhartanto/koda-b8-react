/**
 * @typedef {import("./types").User} User
 */

import { getUsers, saveUsers } from "./storage";

/**
 * @param {User[]} users
 * @param {User["id"]} userId
 * @returns {User}
 */
export function getUserById(users, userId) {
	const user = users.find((u) => u.id === userId);
	if (!user) {
		throw new Error("User tidak ditemukan");
	}
	return user;
}

/**
 * @param {User["id"]} userId
 * @param {Partial<User>} patch
 * @returns {User}
 */
export function updateUser(userId, patch) {
	const users = getUsers();
	const i = users.findIndex((u) => u.id === userId);
	if (i === -1) {
		throw new Error("User tidak ditemukan");
	}
	users[i] = /** @type {User} */ ({ ...users[i], ...patch });
	saveUsers(users);
	return users[i];
}

/**
 * @param {User["id"]} userId
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {User}
 */
export function changePassword(userId, currentPassword, newPassword) {
	const users = getUsers();
	const user = getUserById(users, userId);
	if (user.passwordHash !== btoa(currentPassword)) {
		throw new Error("Kata sandi saat ini salah");
	}
	return updateUser(userId, { passwordHash: btoa(newPassword) });
}

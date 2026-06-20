/**
 * @typedef {import("./types").User} User
 */

import { getUsers, saveUsers, getSession, saveSession } from "./storage";

/** @returns {User | undefined} */
export function getCurrentUser() {
	const session = getSession();
	if (!session) {
		return;
	}
	if (new Date(session.expiresAt) < new Date()) {
		logout();
		return;
	}
	return getUsers().find((u) => u.id === session.userId);
}

/**
 * @param {object} params
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} params.password
 * @returns {User}
 */
export function register({ name, email, password }) {
	const users = getUsers();
	if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
		throw new Error("Email sudah terdaftar");
	}
	/** @type {User} */
	const user = {
		id: `user_${Math.random().toString(36).slice(2, 10)}`,
		name,
		email,
		passwordHash: btoa(password),

		createdAt: new Date().toISOString(),
		cart: [],
		wishlist: [],
		orders: [],
		addresses: [],
		savedPayments: [],
	};
	saveUsers([...users, user]);
	_createSession(user.id, false);
	return user;
}

/**
 * @param {string} email
 * @param {string} password
 * @param {boolean} [remember]
 * @returns {User}
 */
export function login(email, password, remember = false) {
	const user = getUsers().find(
		(u) => u.email.toLowerCase() === email.toLowerCase(),
	);
	if (!user || user.passwordHash !== btoa(password)) {
		throw new Error("Email atau kata sandi salah");
	}
	_createSession(user.id, remember);
	return user;
}

export function logout() {
	saveSession();
}

/**
 * @param {User["id"]} userId
 * @param {boolean} remember
 */
function _createSession(userId, remember) {
	const days = remember ? 30 : 1;
	saveSession({
		userId,
		expiresAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
	});
}

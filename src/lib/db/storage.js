/**
 * @typedef {import("./types").User} User
 */

/**
 * @typedef Session
 * @prop {User["id"]} userId
 * @prop {string} expiresAt
 */

const KEY_USERS = "bm:users";
const KEY_SESSION = "bm:session";

const { localStorage } = globalThis.window;

/** @returns {User[]} */
export function getUsers() {
	try {
		return JSON.parse(localStorage.getItem(KEY_USERS) ?? "");
	} catch {
		return [];
	}
}

/** @param {User[]} users */
export function saveUsers(users = []) {
	localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

/** @returns {Session | undefined} */
export function getSession() {
	try {
		return JSON.parse(localStorage.getItem(KEY_SESSION) ?? "");
	} catch {
		/* oxlint-disable-next-line eslint/no-useless-return */
		return;
	}
}

/** @param {Session} [session] */
export function saveSession(session) {
	if (session) {
		localStorage.setItem(KEY_SESSION, JSON.stringify(session));
	} else {
		localStorage.removeItem(KEY_SESSION);
	}
}

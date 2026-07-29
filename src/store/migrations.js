/**
 * redux-persist migrations, keyed by the `version` they upgrade *to*.
 * @type {Record<number, (state: any) => any>}
 */
export const migrations = {
	/** Orders moved off the user object into their own slice, keyed by user id. */
	2(state) {
		/** @type {Record<string, unknown[]>} */
		const byUser = {};
		const users = state.auth.users.map(({ orders, ...user }) => {
			if (orders?.length) {
				byUser[user.id] = orders;
			}
			return user;
		});
		return {
			...state,
			auth: { ...state.auth, users },
			orders: { byUser },
		};
	},
};

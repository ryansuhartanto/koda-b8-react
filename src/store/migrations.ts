import type { MigrationManifest, PersistedState } from "redux-persist";

import type { Order, User } from "#/lib/db";

type PersistedV1 = {
	auth: { users: Array<User & { orders?: Order[] }> };
};

/**
 * redux-persist migrations, keyed by the `version` they upgrade *to*.
 * `PersistedState` carries only `_persist`, so each migration casts to the
 * shape it actually upgrades from.
 */
export const migrations: MigrationManifest = {
	/** Orders moved off the user object into their own slice, keyed by user id. */
	2(persisted) {
		const state = persisted as PersistedState & PersistedV1;
		const byUser: Record<string, Order[]> = {};
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

import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {import("#/lib/db").User} User
 * @typedef {import("#/lib/db").Address} Address
 * @typedef {import("#/lib/db").SavedPayment} SavedPayment
 */

/**
 * @typedef Session
 * @prop {User["id"]} userId
 * @prop {string} expiresAt
 */

/**
 * @typedef AuthState
 * @prop {User[]} users
 * @prop {Session} [session]
 */

/** @typedef {{ auth: AuthState }} RootState */

/** @type {AuthState} */
const initialState = { users: [], session: undefined };

/**
 * The user the current session points at, as a mutable draft.
 * @param {AuthState} state
 * @returns {User | undefined}
 */
function currentUser(state) {
	if (!state.session) {
		return;
	}
	return state.users.find((u) => u.id === state.session?.userId);
}

/**
 * @param {AuthState} state
 * @param {{ payload: Session }} action
 */
function sessionCreatedReducer(state, { payload }) {
	state.session = payload;
}

/**
 * @param {User["id"]} userId
 * @param {boolean} [remember]
 */
function prepareSession(userId, remember = false) {
	const days = remember ? 30 : 1;
	return {
		payload: {
			userId,
			expiresAt: new Date(
				Date.now() + days * 24 * 60 * 60 * 1000,
			).toISOString(),
		},
	};
}

/**
 * @param {AuthState} state
 * @param {{ payload: User }} action
 */
function userRegisteredReducer(state, { payload }) {
	state.users.push(payload);
}

/** @param {AuthState} state */
function logoutReducer(state) {
	state.session = undefined;
}

/**
 * @param {AuthState} state
 * @param {{ payload: Partial<User> }} action
 */
function updateProfileReducer(state, { payload }) {
	const user = currentUser(state);
	if (user) {
		Object.assign(user, payload);
	}
}

/**
 * @param {AuthState} state
 * @param {{ payload: string }} action
 */
function passwordChangedReducer(state, { payload }) {
	const user = currentUser(state);
	if (user) {
		user.passwordHash = payload;
	}
}

/**
 * @param {AuthState} state
 * @param {{ payload: { productName: string; quantity: number } }} action
 */
function addToCartReducer(state, { payload }) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	const existing = user.cart.find((i) => i.productName === payload.productName);
	if (existing) {
		existing.quantity += payload.quantity;
	} else {
		user.cart.push({ ...payload });
	}
}

/**
 * @param {string} productName
 * @param {number} [quantity]
 */
function prepareCartItem(productName, quantity = 1) {
	return { payload: { productName, quantity } };
}

/**
 * @param {AuthState} state
 * @param {{ payload: string }} action
 */
function removeFromCartReducer(state, { payload }) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	user.cart = user.cart.filter((i) => i.productName !== payload);
}

/**
 * @param {AuthState} state
 * @param {{ payload: { productName: string; quantity: number } }} action
 */
function updateCartQtyReducer(state, { payload }) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	if (payload.quantity < 1) {
		user.cart = user.cart.filter((i) => i.productName !== payload.productName);
		return;
	}
	const item = user.cart.find((i) => i.productName === payload.productName);
	if (item) {
		item.quantity = payload.quantity;
	}
}

/**
 * @param {string} productName
 * @param {number} quantity
 */
function prepareCartQty(productName, quantity) {
	return { payload: { productName, quantity } };
}

/** @param {AuthState} state */
function clearCartReducer(state) {
	const user = currentUser(state);
	if (user) {
		user.cart = [];
	}
}

/**
 * @param {AuthState} state
 * @param {{ payload: string }} action
 */
function toggleWishlistReducer(state, { payload }) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	const idx = user.wishlist.indexOf(payload);
	if (idx === -1) {
		user.wishlist.push(payload);
	} else {
		user.wishlist.splice(idx, 1);
	}
}

/**
 * @param {AuthState} state
 * @param {{ payload: Address }} action
 */
function addAddressReducer(state, { payload }) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	if (payload.isDefault) {
		for (const a of user.addresses) {
			a.isDefault = false;
		}
	}
	user.addresses.push(payload);
}

/** @param {Omit<Address, "id">} address */
function prepareAddress(address) {
	return {
		payload: {
			id: `addr_${Math.random().toString(36).slice(2, 8)}`,
			...address,
		},
	};
}

/**
 * @param {AuthState} state
 * @param {{ payload: { addrId: string; patch: Partial<Address> } }} action
 */
function updateAddressReducer(state, { payload }) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	if (payload.patch.isDefault) {
		for (const a of user.addresses) {
			a.isDefault = false;
		}
	}
	const addr = user.addresses.find((a) => a.id === payload.addrId);
	if (addr) {
		Object.assign(addr, payload.patch);
	}
}

/**
 * @param {string} addrId
 * @param {Partial<Address>} patch
 */
function prepareAddressPatch(addrId, patch) {
	return { payload: { addrId, patch } };
}

/**
 * @param {AuthState} state
 * @param {{ payload: string }} action
 */
function removeAddressReducer(state, { payload }) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	user.addresses = user.addresses.filter((a) => a.id !== payload);
}

/**
 * @param {AuthState} state
 * @param {{ payload: SavedPayment }} action
 */
function addSavedPaymentReducer(state, { payload }) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	if (payload.isDefault) {
		for (const p of user.savedPayments) {
			p.isDefault = false;
		}
	}
	user.savedPayments.push(payload);
}

/** @param {Omit<SavedPayment, "id">} payment */
function prepareSavedPayment(payment) {
	return {
		payload: {
			id: `pm_${Math.random().toString(36).slice(2, 8)}`,
			...payment,
		},
	};
}

/**
 * @param {AuthState} state
 * @param {{ payload: string }} action
 */
function removeSavedPaymentReducer(state, { payload }) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	user.savedPayments = user.savedPayments.filter((p) => p.id !== payload);
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		sessionCreated: {
			reducer: sessionCreatedReducer,
			prepare: prepareSession,
		},
		userRegistered: userRegisteredReducer,
		logout: logoutReducer,
		updateProfile: updateProfileReducer,
		passwordChanged: passwordChangedReducer,
		addToCart: { reducer: addToCartReducer, prepare: prepareCartItem },
		removeFromCart: removeFromCartReducer,
		updateCartQty: { reducer: updateCartQtyReducer, prepare: prepareCartQty },
		clearCart: clearCartReducer,
		toggleWishlist: toggleWishlistReducer,
		addAddress: { reducer: addAddressReducer, prepare: prepareAddress },
		updateAddress: {
			reducer: updateAddressReducer,
			prepare: prepareAddressPatch,
		},
		removeAddress: removeAddressReducer,
		addSavedPayment: {
			reducer: addSavedPaymentReducer,
			prepare: prepareSavedPayment,
		},
		removeSavedPayment: removeSavedPaymentReducer,
	},
});

export const {
	logout,
	updateProfile,
	addToCart,
	removeFromCart,
	updateCartQty,
	clearCart,
	toggleWishlist,
	addAddress,
	updateAddress,
	removeAddress,
	addSavedPayment,
	removeSavedPayment,
} = authSlice.actions;

const { sessionCreated, userRegistered, passwordChanged } = authSlice.actions;

/**
 * @template T
 * @typedef {import("@reduxjs/toolkit").ThunkAction<T, RootState, unknown, import("@reduxjs/toolkit").UnknownAction>} Thunk
 */

/**
 * @param {string} email
 * @param {string} password
 * @param {boolean} [remember]
 * @returns {Thunk<User>}
 */
export function login(email, password, remember = false) {
	return (dispatch, getState) => {
		const user = getState().auth.users.find(
			(u) => u.email.toLowerCase() === email.toLowerCase(),
		);
		if (!user) {
			throw new Error("EMAIL_NOT_FOUND");
		}
		if (user.passwordHash !== btoa(password)) {
			throw new Error("WRONG_PASSWORD");
		}
		dispatch(sessionCreated(user.id, remember));
		return user;
	};
}

/**
 * @param {{ name: string; email: string; password: string }} params
 * @returns {Thunk<User>}
 */
export function register({ name, email, password }) {
	return (dispatch, getState) => {
		const taken = getState().auth.users.some(
			(u) => u.email.toLowerCase() === email.toLowerCase(),
		);
		if (taken) {
			throw new Error("EMAIL_TAKEN");
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
			addresses: [],
			savedPayments: [],
		};
		dispatch(userRegistered(user));
		dispatch(sessionCreated(user.id, false));
		return user;
	};
}

/**
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {Thunk<User | undefined>}
 */
export function changePassword(currentPassword, newPassword) {
	return (dispatch, getState) => {
		const user = selectCurrentUser(getState());
		if (!user) {
			return;
		}
		if (user.passwordHash !== btoa(currentPassword)) {
			throw new Error("Kata sandi saat ini salah");
		}
		dispatch(passwordChanged(btoa(newPassword)));
		return selectCurrentUser(getState());
	};
}

/**
 * @param {RootState} state
 * @returns {User | undefined}
 */
export function selectCurrentUser(state) {
	const { users, session } = state.auth;
	if (!session) {
		return;
	}
	if (new Date(session.expiresAt) < new Date()) {
		return;
	}
	return users.find((u) => u.id === session.userId);
}

/** @param {RootState} state */
export function selectIsLoggedIn(state) {
	return Boolean(selectCurrentUser(state));
}

export default authSlice.reducer;

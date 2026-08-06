import { createSlice } from "@reduxjs/toolkit";
import type {
	PayloadAction,
	ThunkAction,
	UnknownAction,
} from "@reduxjs/toolkit";

import type { Address, SavedPayment, User } from "#/lib/db";

export type Session = {
	userId: User["id"];
	expiresAt: string;
};

export type AuthState = {
	users: User[];
	session?: Session;
};

export type RootState = {
	auth: AuthState;
};

const initialState: AuthState = { users: [], session: undefined };

function currentUser(state: AuthState): User | undefined {
	if (!state.session) {
		return;
	}
	return state.users.find((u) => u.id === state.session?.userId);
}

function sessionCreatedReducer(
	state: AuthState,
	{ payload }: PayloadAction<Session>,
) {
	state.session = payload;
}

function prepareSession(userId: User["id"], remember = false) {
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

function userRegisteredReducer(
	state: AuthState,
	{ payload }: PayloadAction<User>,
) {
	state.users.push(payload);
}

function logoutReducer(state: AuthState) {
	state.session = undefined;
}

function updateProfileReducer(
	state: AuthState,
	{ payload }: PayloadAction<Partial<User>>,
) {
	const user = currentUser(state);
	if (user) {
		Object.assign(user, payload);
	}
}

function passwordChangedReducer(
	state: AuthState,
	{ payload }: PayloadAction<string>,
) {
	const user = currentUser(state);
	if (user) {
		user.passwordHash = payload;
	}
}

function addToCartReducer(
	state: AuthState,
	{ payload }: PayloadAction<{ productName: string; quantity: number }>,
) {
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

function prepareCartItem(productName: string, quantity = 1) {
	return { payload: { productName, quantity } };
}

function removeFromCartReducer(
	state: AuthState,
	{ payload }: PayloadAction<string>,
) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	user.cart = user.cart.filter((i) => i.productName !== payload);
}

function updateCartQtyReducer(
	state: AuthState,
	{ payload }: PayloadAction<{ productName: string; quantity: number }>,
) {
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

function prepareCartQty(productName: string, quantity: number) {
	return { payload: { productName, quantity } };
}

function clearCartReducer(state: AuthState) {
	const user = currentUser(state);
	if (user) {
		user.cart = [];
	}
}

function toggleWishlistReducer(
	state: AuthState,
	{ payload }: PayloadAction<string>,
) {
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

function addAddressReducer(
	state: AuthState,
	{ payload }: PayloadAction<Address>,
) {
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

function prepareAddress(address: Omit<Address, "id">) {
	return {
		payload: {
			id: `addr_${Math.random().toString(36).slice(2, 8)}`,
			...address,
		},
	};
}

function updateAddressReducer(
	state: AuthState,
	{ payload }: PayloadAction<{ addrId: string; patch: Partial<Address> }>,
) {
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

function prepareAddressPatch(addrId: string, patch: Partial<Address>) {
	return { payload: { addrId, patch } };
}

function removeAddressReducer(
	state: AuthState,
	{ payload }: PayloadAction<string>,
) {
	const user = currentUser(state);
	if (!user) {
		return;
	}
	user.addresses = user.addresses.filter((a) => a.id !== payload);
}

function addSavedPaymentReducer(
	state: AuthState,
	{ payload }: PayloadAction<SavedPayment>,
) {
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

function prepareSavedPayment(payment: Omit<SavedPayment, "id">) {
	return {
		payload: {
			id: `pm_${Math.random().toString(36).slice(2, 8)}`,
			...payment,
		},
	};
}

function removeSavedPaymentReducer(
	state: AuthState,
	{ payload }: PayloadAction<string>,
) {
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

type Thunk<T> = ThunkAction<T, RootState, unknown, UnknownAction>;

export function login(
	email: string,
	password: string,
	remember = false,
): Thunk<User> {
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

export function register({
	name,
	email,
	password,
}: {
	name: string;
	email: string;
	password: string;
}): Thunk<User> {
	return (dispatch, getState) => {
		const taken = getState().auth.users.some(
			(u) => u.email.toLowerCase() === email.toLowerCase(),
		);
		if (taken) {
			throw new Error("EMAIL_TAKEN");
		}
		const user: User = {
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

export function changePassword(
	currentPassword: string,
	newPassword: string,
): Thunk<User | undefined> {
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

export function selectCurrentUser(state: RootState): User | undefined {
	const { users, session } = state.auth;
	if (!session) {
		return;
	}
	if (new Date(session.expiresAt) < new Date()) {
		return;
	}
	return users.find((u) => u.id === session.userId);
}

export function selectIsLoggedIn(state: RootState): boolean {
	return Boolean(selectCurrentUser(state));
}

export default authSlice.reducer;

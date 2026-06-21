import { createContext, useCallback, useContext, useReducer } from "react";

import * as db from "#/lib/db";

/**
 * @typedef {import("#/lib/db").User} User
 * @typedef {import("#/lib/db").Address} Address
 * @typedef {import("#/lib/db").Order} Order
 * @typedef {import("#/lib/db").SavedPayment} SavedPayment
 */

/**
 * @typedef AuthState
 * @property {User} [user]
 */

/**
 * @param {AuthState} state
 * @param {object} action
 * @param {string} action.type
 * @param {User} [action.user]
 * @returns {AuthState}
 */
function reducer(state, { type, user }) {
	switch (type) {
		case "SET_USER":
			return { ...state, user };
		default:
			return state;
	}
}

function useAuthValue() {
	const [state, dispatch] = useReducer(reducer, {
		user: db.getCurrentUser(),
	});

	/** @param {User} [user] */
	const setUser = (user) => dispatch({ type: "SET_USER", user });

	/** @type {(email: string, password: string, remember?: boolean) => User} */
	const login = useCallback((email, password, remember = false) => {
		const user = db.login(email, password, remember);
		setUser(user);
		return user;
	}, []);

	/** @type {() => void} */
	const logout = useCallback(() => {
		db.logout();
		setUser();
	}, []);

	/** @type {(params: { name: string; email: string; password: string }) => User} */
	const register = useCallback((params) => {
		const user = db.register(params);
		setUser(user);
		return user;
	}, []);

	/** @type {(patch: Partial<User>) => User | undefined} */
	const updateProfile = useCallback(
		(patch) => {
			if (!state.user) {
				return;
			}
			const user = db.updateUser(state.user.id, patch);
			setUser(user);
			return user;
		},
		[state.user],
	);

	/** @type {(current: string, next: string) => User | undefined} */
	const changePassword = useCallback(
		(current, next) => {
			if (!state.user) {
				return;
			}
			const user = db.changePassword(state.user.id, current, next);
			setUser(user);
			return user;
		},
		[state.user],
	);

	/** @type {(productName: string, quantity?: number) => void} */
	const addToCart = useCallback(
		(productName, quantity = 1) => {
			if (!state.user) {
				return;
			}
			setUser(db.addToCart(state.user.id, productName, quantity));
		},
		[state.user],
	);

	/** @type {(productName: string) => void} */
	const removeFromCart = useCallback(
		(productName) => {
			if (!state.user) {
				return;
			}
			setUser(db.removeFromCart(state.user.id, productName));
		},
		[state.user],
	);

	/** @type {(productName: string, quantity: number) => void} */
	const updateCartQty = useCallback(
		(productName, quantity) => {
			if (!state.user) {
				return;
			}
			setUser(db.updateCartQty(state.user.id, productName, quantity));
		},
		[state.user],
	);

	/** @type {() => void} */
	const clearCart = useCallback(() => {
		if (!state.user) {
			return;
		}
		setUser(db.clearCart(state.user.id));
	}, [state.user]);

	/** @type {(productName: string) => void} */
	const toggleWishlist = useCallback(
		(productName) => {
			if (!state.user) {
				return;
			}
			setUser(db.toggleWishlist(state.user.id, productName));
		},
		[state.user],
	);

	/** @type {(orderData: Omit<Order, "id" | "createdAt" | "status">) => Order | undefined} */
	const placeOrder = useCallback(
		(orderData) => {
			if (!state.user) {
				return;
			}
			const { user, order } = db.placeOrder(state.user.id, orderData);
			setUser(user);
			return order;
		},
		[state.user],
	);

	/** @type {(address: Omit<Address, "id">) => void} */
	const addAddress = useCallback(
		(address) => {
			if (!state.user) {
				return;
			}
			setUser(db.addAddress(state.user.id, address));
		},
		[state.user],
	);

	/** @type {(addrId: string, patch: Partial<Address>) => void} */
	const updateAddress = useCallback(
		(addrId, patch) => {
			if (!state.user) {
				return;
			}
			setUser(db.updateAddress(state.user.id, addrId, patch));
		},
		[state.user],
	);

	/** @type {(addrId: string) => void} */
	const removeAddress = useCallback(
		(addrId) => {
			if (!state.user) {
				return;
			}
			setUser(db.removeAddress(state.user.id, addrId));
		},
		[state.user],
	);

	/** @type {(payment: Omit<SavedPayment, "id">) => void} */
	const addSavedPayment = useCallback(
		(payment) => {
			if (!state.user) {
				return;
			}
			setUser(db.addSavedPayment(state.user.id, payment));
		},
		[state.user],
	);

	/** @type {(pmId: string) => void} */
	const removeSavedPayment = useCallback(
		(pmId) => {
			if (!state.user) {
				return;
			}
			setUser(db.removeSavedPayment(state.user.id, pmId));
		},
		[state.user],
	);

	return {
		user: state.user,
		isLoggedIn: Boolean(state.user),
		login,
		logout,
		register,
		updateProfile,
		changePassword,
		addToCart,
		removeFromCart,
		updateCartQty,
		clearCart,
		toggleWishlist,
		placeOrder,
		addAddress,
		updateAddress,
		removeAddress,
		addSavedPayment,
		removeSavedPayment,
	};
}

const AuthContext =
	/** @type {React.Context<ReturnType<typeof useAuthValue> | undefined>} */ (
		createContext(undefined)
	);

/** @param {React.PropsWithChildren} props */
export function AuthProvider({ children }) {
	return (
		<AuthContext.Provider value={useAuthValue()}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within <AuthProvider>");
	}
	return ctx;
}

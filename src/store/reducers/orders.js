import { createSlice } from "@reduxjs/toolkit";

import { clearCart, selectCurrentUser } from "./auth";

/**
 * @typedef {import("#/lib/db").User} User
 * @typedef {import("#/lib/db").Order} Order
 */

/**
 * @typedef OrdersState
 * @prop {Record<User["id"], Order[]>} byUser
 */

/** @typedef {import("./auth").RootState & { orders: OrdersState }} RootState */

/** @type {OrdersState} */
const initialState = { byUser: {} };

/** Stable identity so selectors don't churn renders for users with no orders. */
const noOrders = /** @type {Order[]} */ (Object.freeze([]));

/**
 * @param {OrdersState} state
 * @param {{ payload: { userId: User["id"]; order: Order } }} action
 */
function orderPlacedReducer(state, { payload }) {
	state.byUser[payload.userId] ??= [];
	state.byUser[payload.userId].unshift(payload.order);
}

/**
 * @param {User["id"]} userId
 * @param {Order} order
 */
function prepareOrder(userId, order) {
	return { payload: { userId, order } };
}

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		orderPlaced: { reducer: orderPlacedReducer, prepare: prepareOrder },
	},
});

const { orderPlaced } = ordersSlice.actions;

/**
 * @template T
 * @typedef {import("@reduxjs/toolkit").ThunkAction<T, RootState, unknown, import("@reduxjs/toolkit").UnknownAction>} Thunk
 */

/**
 * @param {Omit<Order, "id" | "createdAt" | "status">} orderData
 * @returns {Thunk<Order>}
 */
export function placeOrder(orderData) {
	return (dispatch, getState) => {
		/** @type {Order} */
		const order = {
			id: `BM${Date.now().toString().slice(-8)}`,
			createdAt: new Date().toISOString(),
			status: "pending",
			...orderData,
		};
		const user = selectCurrentUser(getState());
		if (user) {
			dispatch(orderPlaced(user.id, order));
			dispatch(clearCart());
		}
		return order;
	};
}

/**
 * @param {RootState} state
 * @returns {Order[]}
 */
export function selectOrders(state) {
	const user = selectCurrentUser(state);
	if (!user) {
		return noOrders;
	}
	return state.orders.byUser[user.id] ?? noOrders;
}

export default ordersSlice.reducer;

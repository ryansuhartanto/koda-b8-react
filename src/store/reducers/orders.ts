import { createSlice } from "@reduxjs/toolkit";
import type {
	PayloadAction,
	ThunkAction,
	UnknownAction,
} from "@reduxjs/toolkit";

import type { Order, User } from "#/lib/db";

import { clearCart, selectCurrentUser } from "./auth";
import type { RootState as AuthRootState } from "./auth";

export type OrdersState = {
	byUser: Record<User["id"], Order[]>;
};

export type RootState = AuthRootState & { orders: OrdersState };

const initialState: OrdersState = { byUser: {} };

const noOrders: ReadonlyArray<Order> = Object.freeze([]);

function orderPlacedReducer(
	state: OrdersState,
	{ payload }: PayloadAction<{ userId: User["id"]; order: Order }>,
) {
	const orders = (state.byUser[payload.userId] ??= []);
	orders.unshift(payload.order);
}

function prepareOrder(userId: User["id"], order: Order) {
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

type Thunk<T> = ThunkAction<T, RootState, unknown, UnknownAction>;

export function placeOrder(
	orderData: Omit<Order, "id" | "createdAt" | "status">,
): Thunk<Order> {
	return (dispatch, getState) => {
		const order: Order = {
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

export function selectOrders(state: RootState): ReadonlyArray<Order> {
	const user = selectCurrentUser(state);
	if (!user) {
		return noOrders;
	}
	return state.orders.byUser[user.id] ?? noOrders;
}

export default ordersSlice.reducer;

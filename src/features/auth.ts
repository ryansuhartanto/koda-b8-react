import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import authApi from "#/services/api/auth";

export type AuthState = {
	token?: string;
};

const initialState: AuthState = {
	token: undefined,
};

export const authSlice = createSlice({
	name: "auth",

	initialState,
	reducers: {
		set: (state, { payload }: PayloadAction<{ token: string }>) => {
			state.token = payload.token;
		},
		unset: () => initialState,
	},
	selectors: {
		selectIsAuthenticated: (state) => state.token !== undefined,
		selectToken: (state) => state.token,
	},

	extraReducers: (builder) => {
		builder
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, { payload }) => {
					state.token = payload.token;
				},
			)
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, { payload }) => {
					state.token = payload.token;
				},
			);
	},
});

export default authSlice.reducer;
export const { set, unset } = authSlice.actions;
export const { selectIsAuthenticated, selectToken } = authSlice.selectors;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type WishlistState = {
	ids: string[];
};

const initialState: WishlistState = { ids: [] };

// the API has no wishlist resource, so this one stays on the device
export const wishlistSlice = createSlice({
	name: "wishlist",

	initialState,
	reducers: {
		toggle: (state, { payload }: PayloadAction<string>) => {
			state.ids = state.ids.includes(payload)
				? state.ids.filter((id) => id !== payload)
				: [...state.ids, payload];
		},
	},
	selectors: {
		selectWishlist: (state) => state.ids,
	},
});

export default wishlistSlice.reducer;
export const { toggle } = wishlistSlice.actions;
export const { selectWishlist } = wishlistSlice.selectors;

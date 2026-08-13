import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
	createMigrate,
	FLUSH,
	PAUSE,
	PERSIST,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import storage from "redux-persist/es/storage";

import authReducer from "#/features/auth";
import wishlistReducer from "#/features/wishlist";
import api from "#/services/api";

const reducer = persistCombineReducers(
	{
		key: "bm",
		storage,
		blacklist: ["api"],

		// v2 persisted the local-database shape; nothing in it fits these reducers
		version: 3,
		migrate: createMigrate({ 3: () => undefined }),
	},
	{
		[api.reducerPath]: api.reducer,

		auth: authReducer,
		wishlist: wishlistReducer,
	},
);

export const store = configureStore({
	reducer,
	middleware: (gDM) =>
		gDM({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

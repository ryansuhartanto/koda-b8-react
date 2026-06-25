import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/es/storage";

import { rootReducer } from "./reducers";

const persistedReducer = persistReducer(
	{ key: "bm", version: 1, storage },
	rootReducer,
);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

/** @typedef {ReturnType<typeof store.getState>} RootState */
/** @typedef {typeof store.dispatch} AppDispatch */

/** @type {() => AppDispatch} */
export const useAppDispatch = useDispatch;

/** @type {import("react-redux").TypedUseSelectorHook<RootState>} */
export const useAppSelector = useSelector;

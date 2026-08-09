import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "#/store";

const api = createApi({
	reducerPath: "api",

	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000",
		prepareHeaders: (headers, { getState }) => {
			const { token } = (getState() as RootState).auth;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
	tagTypes: ["auth"],
});

export default api;

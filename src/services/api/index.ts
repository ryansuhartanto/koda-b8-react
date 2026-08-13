import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { ProblemDetails } from "#/lib/api";
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
	tagTypes: [
		"auth",
		"products",
		"cart",
		"orders",
		"me",
		"payments",
		"addresses",
	],
});

export default api;

// an errored query hands back the RFC 9457 problem document as an opaque `data`
export function message(error: unknown): string | undefined {
	if (typeof error !== "object" || error === null) {
		return undefined;
	}

	if ("data" in error) {
		const problem = error.data as ProblemDetails | undefined;
		return problem?.detail ?? problem?.title;
	}

	if ("error" in error) {
		return String(error.error);
	}

	return undefined;
}

export function status(error: unknown): number | undefined {
	if (typeof error !== "object" || error === null || !("status" in error)) {
		return undefined;
	}

	return typeof error.status === "number" ? error.status : undefined;
}

import api from ".";

export type RequestRegister = {
	name: string;
	email: string;
	password: string;
};

export type RequestLogin = {
	email: string;
	password: string;
};

export type ResponseRegister = {
	token: string;
};

export type ResponseLogin = {
	token: string;
};

// a new session must not read the previous caller's cached rows
const session = ["me", "cart", "orders", "payments", "addresses"] as const;

const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		register: build.mutation<ResponseRegister, RequestRegister>({
			query: (body) => ({ url: "/auth/register", method: "POST", body }),
			invalidatesTags: session,
		}),
		login: build.mutation<ResponseLogin, RequestLogin>({
			query: (body) => ({ url: "/auth/login", method: "POST", body }),
			invalidatesTags: session,
		}),
	}),
	overrideExisting: "throw",
});

export default authApi;

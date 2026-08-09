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

const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		register: build.mutation<ResponseRegister, RequestRegister>({
			query: (body) => ({ url: "/auth/register", method: "POST", body }),
		}),
		login: build.mutation<ResponseLogin, RequestLogin>({
			query: (body) => ({ url: "/auth/login", method: "POST", body }),
		}),
	}),
	overrideExisting: "throw",
});

export default authApi;

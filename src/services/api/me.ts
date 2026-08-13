import api from ".";

export type User = {
	id: string;
	email: string;
	created_at: string;
	updated_at: string;
	name?: string;
	phone?: string;
	birthdate?: string;
	gender?: string;
	avatar?: string;
	roles: string[];
};

export type UserPayment = {
	id: string;
	created_at: string;
	id_payment: string;
	type: string;
	is_default: boolean;
	data: Record<string, unknown>;
};

const meApi = api.injectEndpoints({
	endpoints: (build) => ({
		me: build.query<User, void>({
			query: () => "/me",
			providesTags: ["me"],
		}),
		payments: build.query<UserPayment[], void>({
			query: () => "/me/payments",
			providesTags: ["payments"],
		}),
	}),
	overrideExisting: "throw",
});

export default meApi;

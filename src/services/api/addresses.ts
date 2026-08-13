import api from ".";

export type Address = {
	id: string;
	label: string;
	name: string;
	phone: string;
	address: string;
	city: string;
	province: string;
	postal_code: string;
	is_default: boolean;
};

export type RequestAddress = Omit<Address, "id" | "is_default"> & {
	is_default?: boolean;
};

const addressesApi = api.injectEndpoints({
	endpoints: (build) => ({
		addresses: build.query<Address[], void>({
			query: () => "/me/addresses",
			providesTags: ["addresses"],
		}),
		createAddress: build.mutation<Address, RequestAddress>({
			query: (body) => ({ url: "/me/addresses", method: "POST", body }),
			invalidatesTags: ["addresses"],
		}),
	}),
	overrideExisting: "throw",
});

export default addressesApi;

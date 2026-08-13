import { expect, test } from "vitest";

import { message } from "#/services/api";

test("reads the detail out of a problem document", () => {
	const error = {
		status: 409,
		data: { title: "Conflict", status: 409, detail: "The cart is empty" },
	};

	expect(message(error)).toBe("The cart is empty");
});

test("falls back to the title when the problem carries no detail", () => {
	expect(
		message({ status: 404, data: { title: "Not Found", status: 404 } }),
	).toBe("Not Found");
});

test("reports a transport failure that never reached the API", () => {
	expect(
		message({ status: "FETCH_ERROR", error: "TypeError: fetch failed" }),
	).toBe("TypeError: fetch failed");
	expect(message(undefined)).toBeUndefined();
});

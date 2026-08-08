import { expect, test } from "vitest";

import { parseLinks } from "#/lib/api";

test("parses the Link header a paginated response carries", () => {
	const header =
		'</products?limit=2&offset=2>; rel="self", </products?limit=2&offset=0>; rel="first", ' +
		'</products?limit=2&offset=8>; rel="last", </products?limit=2&offset=0>; rel="prev", ' +
		'</products?limit=2&offset=4>; rel="next"';

	expect(parseLinks(header)).toStrictEqual({
		self: { href: "/products?limit=2&offset=2", rel: "self" },
		first: { href: "/products?limit=2&offset=0", rel: "first" },
		last: { href: "/products?limit=2&offset=8", rel: "last" },
		prev: { href: "/products?limit=2&offset=0", rel: "prev" },
		next: { href: "/products?limit=2&offset=4", rel: "next" },
	});
});

test("an unpaginated response has no links", () => {
	expect(parseLinks()).toStrictEqual({});
});

/**
 * RFC 9457 problem details and RFC 8288 pagination.
 *
 * Responses are never enveloped: a success carries the payload alone, an error
 * carries a problem document alone, and pagination travels in the `Link` and
 * `X-Total-Count` response headers.
 */

/** `self`, `first` and `last` always appear; `prev` and `next` only when such a page exists. */
export type LinkRel = "self" | "first" | "last" | "prev" | "next";

/** One parsed entry of the `Link` response header. */
export type Link = {
	href: string;
	rel?: string;
	title?: string;
	type?: string;
	[key: string]: unknown;
};

export type Pagination = {
	/** Rows matching the filter, ignoring `limit` and `offset`. */
	total: number;
	links: Partial<Record<LinkRel, Link>>;
};

export type ProblemDetails = {
	/** Defaults to `about:blank`. */
	type: string;
	title: string;
	status: number;
	detail?: string;
	instance?: string;
	[k: string]: unknown;
};

const base = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

export class ApiError extends Error {
	readonly problem: ProblemDetails;

	constructor(problem: ProblemDetails) {
		super(problem.detail ?? problem.title);
		this.name = "ApiError";
		this.problem = problem;
	}
}

// the token is passed in, not read from storage, so callers own the session
export type RequestOptions = {
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: unknown;
	token?: string;
};

async function problem(res: Response): Promise<ProblemDetails> {
	const fallback: ProblemDetails = {
		type: "about:blank",
		title: res.statusText || String(res.status),
		status: res.status,
	};

	try {
		// an absent `type` means about:blank; the API never sends one
		return { ...fallback, ...((await res.json()) as ProblemDetails) };
	} catch {
		return fallback;
	}
}

async function request(
	path: string,
	options: RequestOptions,
): Promise<Response> {
	const { method = "GET", body, token } = options;
	const headers: Record<string, string> = {};

	if (token !== undefined) {
		headers["authorization"] = `Bearer ${token}`;
	}

	if (body !== undefined) {
		headers["content-type"] = "application/json";
	}

	const res = await fetch(`${base}${path}`, {
		method,
		headers,
		body: body === undefined ? null : JSON.stringify(body),
	});

	if (!res.ok) {
		throw new ApiError(await problem(res));
	}

	return res;
}

export async function fetchApi<T>(
	path: string,
	options: RequestOptions = {},
): Promise<T> {
	const res = await request(path, options);

	// DELETE /cart/:id_variant is the only 204 the API answers
	return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

// one RFC 8288 link-value; the API always quotes rel, so bare rels are unhandled
const linkValue = /<([^>]*)>;\s*rel="([^"]*)"/g;

export function parseLinks(header?: string): Pagination["links"] {
	const links: Pagination["links"] = {};

	for (const [, href, rel] of (header ?? "").matchAll(linkValue)) {
		if (href !== undefined && rel !== undefined) {
			links[rel as LinkRel] = { href, rel };
		}
	}

	return links;
}

// pagination rides in the `Link` and `X-Total-Count` headers, not the body
// oxlint-disable-next-line typescript/no-unnecessary-type-parameters
export async function fetchPage<T = unknown>(
	path: string,
	options: RequestOptions = {},
): Promise<Pagination & { items: T[] }> {
	const res = await request(path, options);
	const items = (await res.json()) as T[];

	return {
		items,
		total: Number(res.headers.get("X-Total-Count") ?? items.length),
		links: parseLinks(res.headers.get("Link") ?? undefined),
	};
}

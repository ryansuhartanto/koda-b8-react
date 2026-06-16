import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @param  {import("clsx").ClassArray} inputs
 */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/**
 * @param {string} text
 */
export function slugify(text) {
	return text
		.toLowerCase()
		.normalize("NFKD")
		.replaceAll(/[̀-ͯ]/g, "")
		.replaceAll(/[^a-z0-9]+/g, "-")
		.replaceAll(/(^-|-$)/g, "");
}

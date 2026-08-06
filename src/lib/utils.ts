import { clsx } from "clsx";
import type { ClassArray } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassArray): string {
	return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize("NFKD")
		.replaceAll(/[̀-ͯ]/g, "")
		.replaceAll(/[^a-z0-9]+/g, "-")
		.replaceAll(/(^-|-$)/g, "");
}

export function rupiah(n: number): string {
	return `Rp ${n.toLocaleString("id-ID")}`;
}

/** A form field's value, or undefined when absent or a file upload. */
export function field(form: FormData, name: string): string | undefined {
	const value = form.get(name);
	return typeof value === "string" ? value : undefined;
}

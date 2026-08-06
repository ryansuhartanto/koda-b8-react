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

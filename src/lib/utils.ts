import { clsx } from "clsx";
import type { ClassArray } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassArray): string {
	return twMerge(clsx(inputs));
}

export function rupiah(n: number): string {
	return `Rp ${n.toLocaleString("id-ID")}`;
}

export function field(form: FormData, name: string): string | undefined {
	const value = form.get(name);
	return typeof value === "string" ? value : undefined;
}

import type { JSX } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

import TriangleAlert from "~icons/lucide/triangle-alert";

import { Button, buttonVariants } from "#/components/ui/button";

function describe(error: unknown): {
	title: string;
	body: string;
	detail?: string;
} {
	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return {
				title: "Halaman tidak ditemukan",
				body: "Alamat yang kamu buka tidak ada atau sudah dipindahkan.",
			};
		}
		return {
			title: `Terjadi kesalahan (${String(error.status)})`,
			body: error.statusText,
		};
	}
	return {
		title: "Terjadi kesalahan",
		body: "Halaman gagal dimuat. Coba muat ulang, atau kembali ke beranda.",
		detail: error instanceof Error ? error.message : undefined,
	};
}

export default function ErrorBoundary(): JSX.Element {
	const { title, body, detail } = describe(useRouteError());

	return (
		<main className="min-h-dvh grid place-content-center gap-6 p-6 text-center bg-canvas">
			<TriangleAlert className="mx-auto text-4xl text-accent-500" />
			<div className="flex flex-col gap-2">
				<h1 className="text-h1 font-medium text-gray-900">{title}</h1>
				<p className="text-body text-gray-500 max-w-sm">{body}</p>
			</div>
			{detail && (
				<pre className="max-w-md overflow-x-auto rounded-control bg-gray-100 p-3 text-meta text-left text-gray-600">
					{detail}
				</pre>
			)}
			<div className="flex justify-center gap-3">
				<Button
					variant="outline"
					tone="neutral"
					onClick={() => {
						globalThis.location.reload();
					}}
				>
					Muat Ulang
				</Button>
				<Link
					to="/"
					className={buttonVariants()}
				>
					Ke Beranda
				</Link>
			</div>
		</main>
	);
}

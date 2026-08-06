import type { JSX } from "react";
import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router";

import { ToastProvider } from "#/components/ui/toast";

// oxlint-disable-next-line no-unassigned-import
import "#/style.css";

function RouteFallback(): JSX.Element {
	return (
		<div
			role="status"
			aria-label="Memuat halaman"
			className="min-h-dvh grid place-content-center bg-canvas"
		>
			<span className="size-8 rounded-full border-2 border-line border-t-brand-600 animate-spin" />
		</div>
	);
}

export default function Layout(): JSX.Element {
	return (
		<div className="root">
			<ToastProvider>
				<Suspense fallback={<RouteFallback />}>
					<Outlet />
				</Suspense>
				<ScrollRestoration />
			</ToastProvider>
		</div>
	);
}

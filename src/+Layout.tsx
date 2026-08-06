import type { JSX } from "react";
import { Outlet, ScrollRestoration } from "react-router";

import { ToastProvider } from "#/components/ui/toast";

// oxlint-disable-next-line no-unassigned-import
import "#/style.css";

export default function Layout(): JSX.Element {
	return (
		<div className="root">
			<ToastProvider>
				<Outlet />
				<ScrollRestoration />
			</ToastProvider>
		</div>
	);
}

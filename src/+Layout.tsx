import type { JSX } from "react";
import { Outlet, ScrollRestoration } from "react-router";

// oxlint-disable-next-line no-unassigned-import
import "#/style.css";

export default function Layout(): JSX.Element {
	return (
		<>
			<Outlet />
			<ScrollRestoration />
		</>
	);
}

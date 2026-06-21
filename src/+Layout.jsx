import { Outlet } from "react-router";

import { AuthProvider } from "#/context/auth";

// oxlint-disable-next-line no-unassigned-import
import "#/style.css";

export default function Layout() {
	return (
		<AuthProvider>
			<Outlet />
		</AuthProvider>
	);
}

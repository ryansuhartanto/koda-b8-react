import { Outlet } from "react-router";

// oxlint-disable-next-line no-unassigned-import
import "#/style.css";

export default function Layout() {
	return (
		<>
			<Outlet />
		</>
	);
}

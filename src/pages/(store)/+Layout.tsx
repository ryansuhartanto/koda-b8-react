import type { JSX } from "react";
import { Outlet } from "react-router";

import Footer from "#/components/Footer";
import Header from "#/components/Header";
import data from "#/data.json" with { type: "json" };

const navigations = data.categories.map(({ name, icon }) => ({
	href: `/browse?category=${encodeURIComponent(name)}`,
	text: `${icon} ${name}`,
}));

export default function Layout(): JSX.Element {
	return (
		<>
			<Header navigations={navigations} />
			<Outlet />
			<Footer />
		</>
	);
}

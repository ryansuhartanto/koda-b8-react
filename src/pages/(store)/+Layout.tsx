import type { JSX } from "react";
import { Outlet } from "react-router";

import Footer from "#/components/Footer";
import Header from "#/components/Header";
import catalogApi from "#/services/api/catalog";

export default function Layout(): JSX.Element {
	const { data: categories = [] } = catalogApi.useCategoriesQuery();

	const navigations = categories.map(({ name, icon }) => ({
		href: `/browse?category=${encodeURIComponent(name)}`,
		text: icon ? `${icon} ${name}` : name,
	}));

	return (
		<>
			<Header navigations={navigations} />
			<Outlet />
			<Footer />
		</>
	);
}

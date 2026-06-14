import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import LayoutRoot from "#/+Layout";
import LayoutStore from "#/pages/(store)/+Layout.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		Component: LayoutRoot,
		children: [
			{
				Component: LayoutStore,
				children: [
					{
						index: true,
						Component: React.lazy(() => import("#/pages/(store)/index")),
					},
				],
			},
		],
	},
]);

const root = createRoot(document.querySelector("body"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);

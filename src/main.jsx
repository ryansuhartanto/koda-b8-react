import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import LayoutRoot from "#/+Layout";
import LayoutStore from "#/pages/(store)/+Layout";

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
					{
						path: "browse",
						Component: React.lazy(() => import("#/pages/(store)/browse")),
					},
					{
						path: "details/:slug",
						Component: React.lazy(() => import("#/pages/(store)/details")),
					},
					{
						path: "cart",
						Component: React.lazy(() => import("#/pages/(store)/cart")),
					},
					{
						path: "checkout/1",
						Component: React.lazy(() => import("#/pages/(store)/checkout/1")),
					},
					{
						path: "checkout/2",
						Component: React.lazy(() => import("#/pages/(store)/checkout/2")),
					},
					{
						path: "checkout/3",
						Component: React.lazy(() => import("#/pages/(store)/checkout/3")),
					},
					{
						path: "checkout/4",
						Component: React.lazy(() => import("#/pages/(store)/checkout/4")),
					},
					{
						Component: React.lazy(
							() => import("#/pages/(store)/(account)/+Layout"),
						),
						children: [
							{
								path: "profile",
								Component: React.lazy(
									() => import("#/pages/(store)/(account)/profile"),
								),
							},
							{
								path: "orders",
								Component: React.lazy(
									() => import("#/pages/(store)/(account)/orders"),
								),
							},
							{
								path: "wishlist",
								Component: React.lazy(
									() => import("#/pages/(store)/(account)/wishlist"),
								),
							},
							{
								path: "addresses",
								Component: React.lazy(
									() => import("#/pages/(store)/(account)/addresses"),
								),
							},
							{
								path: "payment-methods",
								Component: React.lazy(
									() => import("#/pages/(store)/(account)/payment-methods"),
								),
							},
						],
					},
				],
			},
			{
				path: "login",
				Component: React.lazy(() => import("#/pages/(auth)/login")),
			},
			{
				path: "register",
				Component: React.lazy(() => import("#/pages/(auth)/register")),
			},
			{
				path: "forgot-password",
				Component: React.lazy(() => import("#/pages/(auth)/forgot-password")),
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

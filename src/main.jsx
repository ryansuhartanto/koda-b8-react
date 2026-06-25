import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";

import LayoutRoot from "#/+Layout.jsx";
import LayoutStore from "#/pages/(store)/+Layout";
import { persistor, store } from "#/store";

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
						path: "checkout",
						Component: React.lazy(() => import("#/pages/(store)/checkout")),
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
				path: "admin",
				Component: React.lazy(() => import("#/pages/admin/+Layout")),
				children: [
					{
						index: true,
						Component: React.lazy(() => import("#/pages/admin/dashboard")),
					},
					{
						path: "products",
						Component: React.lazy(() => import("#/pages/admin/products")),
					},
					{
						path: "orders",
						Component: React.lazy(() => import("#/pages/admin/orders")),
					},
					{
						path: "customers",
						Component: React.lazy(() => import("#/pages/admin/customers")),
					},
					{
						path: "settings",
						Component: React.lazy(() => import("#/pages/admin/settings")),
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

const root = createRoot(document.body);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);

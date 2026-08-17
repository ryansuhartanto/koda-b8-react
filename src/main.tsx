import { lazy, StrictMode } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";

import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

import LayoutRoot from "#/+Layout";
import ErrorBoundary from "#/components/ErrorBoundary";
import LayoutStore from "#/pages/(store)/+Layout";
import { persistor, store } from "#/store";

const router = createBrowserRouter([
	{
		path: "/",
		Component: LayoutRoot,
		ErrorBoundary,
		children: [
			{
				Component: LayoutStore,
				children: [
					{
						index: true,
						Component: lazy(async () => import("#/pages/(store)/index")),
					},
					{
						path: "browse",
						Component: lazy(async () => import("#/pages/(store)/browse")),
					},
					{
						path: "details/:id",
						Component: lazy(async () => import("#/pages/(store)/details")),
					},
					{
						path: "cart",
						Component: lazy(async () => import("#/pages/(store)/cart")),
					},
					{
						path: "checkout",
						Component: lazy(async () => import("#/pages/(store)/checkout")),
					},
					{
						Component: lazy(
							async () => import("#/pages/(store)/(account)/+Layout"),
						),
						children: [
							{
								path: "profile",
								Component: lazy(
									async () => import("#/pages/(store)/(account)/profile"),
								),
							},
							{
								path: "orders",
								Component: lazy(
									async () => import("#/pages/(store)/(account)/orders"),
								),
							},
							{
								path: "wishlist",
								Component: lazy(
									async () => import("#/pages/(store)/(account)/wishlist"),
								),
							},
							{
								path: "addresses",
								Component: lazy(
									async () => import("#/pages/(store)/(account)/addresses"),
								),
							},
							{
								path: "payment-methods",
								Component: lazy(
									async () =>
										import("#/pages/(store)/(account)/payment-methods"),
								),
							},
						],
					},
				],
			},
			{
				path: "admin",
				Component: lazy(async () => import("#/pages/admin/+Layout")),
				children: [
					{
						index: true,
						Component: lazy(async () => import("#/pages/admin/dashboard")),
					},
					{
						path: "products",
						Component: lazy(async () => import("#/pages/admin/products")),
					},
					{
						path: "orders",
						Component: lazy(async () => import("#/pages/admin/orders")),
					},
					{
						path: "customers",
						Component: lazy(async () => import("#/pages/admin/customers")),
					},
					{
						path: "settings",
						Component: lazy(async () => import("#/pages/admin/settings")),
					},
				],
			},
			{
				path: "login",
				Component: lazy(async () => import("#/pages/(auth)/login")),
			},
			{
				path: "register",
				Component: lazy(async () => import("#/pages/(auth)/register")),
			},
			{
				path: "forgot-password",
				Component: lazy(async () => import("#/pages/(auth)/forgot-password")),
			},
		],
	},
]);

const root = createRoot(document.body);
root.render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</StrictMode>,
);

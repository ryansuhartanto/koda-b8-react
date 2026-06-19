import { Link } from "react-router";

import { cn } from "#/lib/utils";

/**
 * @typedef {"login" | "register" | "forgot-password"} AuthVariant
 */

/**
 * @typedef AuthLayoutProps
 * @prop {AuthVariant} [variant]
 * @prop {import("react").ReactNode} [badge]
 * @prop {string} heading
 * @prop {string} [description]
 * @prop {import("react").ReactNode} [banner]
 * @prop {import("react").ReactNode} children
 */

/**
 * @param {AuthLayoutProps} props
 */
export default function AuthLayout({
	variant,
	badge,
	heading,
	description,
	banner,
	children,
}) {
	return (
		<div className="grid grid-cols-2 min-h-dvh">
			<div className={cn("auth-banner", variant)}>
				<Link
					className="brand brand-invert relative z-10"
					to="/"
				>
					BeliMudah
				</Link>

				<div className="relative z-10 flex flex-col gap-8 max-w-md">
					{badge}
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl font-bold leading-tight">{heading}</h2>
						{description && (
							<p className="text-white/80 leading-relaxed">{description}</p>
						)}
					</div>
					{banner}
				</div>

				<small className="relative z-10 text-white/60">
					&copy; 2026 BeliMudah. Seluruh hak cipta dilindungi.
				</small>
			</div>

			<main className="flex justify-center items-center p-12 bg-gray-50">
				<div className="w-full max-w-md flex flex-col gap-8">{children}</div>
			</main>
		</div>
	);
}

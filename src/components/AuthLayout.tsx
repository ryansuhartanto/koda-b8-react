import type { JSX, ReactNode } from "react";
import { Link } from "react-router";

import { cn } from "#/lib/utils";

export type AuthVariant = "login" | "register" | "forgot-password";

export type AuthLayoutProps = {
	variant?: AuthVariant;
	badge?: ReactNode;
	heading: string;
	description?: string;
	banner?: ReactNode;
	children: ReactNode;
};

export default function AuthLayout({
	variant,
	badge,
	heading,
	description,
	banner,
	children,
}: AuthLayoutProps): JSX.Element {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 min-h-dvh">
			<div className={cn("auth-banner hidden md:flex", variant)}>
				<Link
					className="brand brand-invert relative z-10"
					to="/"
				>
					BeliMudah
				</Link>

				<div className="relative z-10 flex flex-col gap-8 max-w-md">
					{badge}
					<div className="flex flex-col gap-4">
						<h2 className="text-display font-bold leading-tight">{heading}</h2>
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

			<main className="flex justify-center items-center p-6 md:p-12 bg-canvas">
				<div className="w-full max-w-md flex flex-col gap-8">
					<Link
						className="brand md:hidden"
						to="/"
					>
						BeliMudah
					</Link>
					{children}
				</div>
			</main>
		</div>
	);
}

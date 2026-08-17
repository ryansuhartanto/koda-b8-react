import type { JSX, ReactNode } from "react";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "#/lib/utils";

export const badgeVariants = cva(
	"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
	{
		variants: {
			color: {
				blue: "text-blue-700 bg-blue-50",
				green: "text-green-700 bg-green-50",
				amber: "text-amber-700 bg-amber-50",
				red: "text-red-700 bg-red-50",
				indigo: "text-indigo-700 bg-indigo-50",
				violet: "text-violet-700 bg-violet-50",
				orange: "text-orange-700 bg-orange-50",
				gray: "text-gray-600 bg-gray-100",
			},
		},
		defaultVariants: { color: "gray" },
	},
);

export type BadgeProps = VariantProps<typeof badgeVariants> & {
	className?: string;
	children: ReactNode;
};

export default function Badge({
	color,
	className,
	children,
}: BadgeProps): JSX.Element {
	return (
		<span className={cn(badgeVariants({ color }), className)}>{children}</span>
	);
}

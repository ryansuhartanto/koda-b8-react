import { cn } from "#/lib/utils";

const colors = {
	blue: "text-blue-700 bg-blue-50",
	green: "text-green-700 bg-green-50",
	amber: "text-amber-700 bg-amber-50",
	red: "text-red-700 bg-red-50",
	indigo: "text-indigo-700 bg-indigo-50",
	violet: "text-violet-700 bg-violet-50",
	orange: "text-orange-700 bg-orange-50",
	gray: "text-gray-600 bg-gray-100",
};

/**
 * @typedef BadgeProps
 * @prop {keyof typeof colors} [color]
 * @prop {string} [className]
 * @prop {import("react").ReactNode} children
 */

/**
 * @param {BadgeProps}
 */
export default function Badge({ color = "gray", className, children }) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
				colors[color],
				className,
			)}
		>
			{children}
		</span>
	);
}

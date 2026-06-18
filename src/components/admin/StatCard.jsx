import ArrowDownRight from "~icons/lucide/arrow-down-right";
import ArrowUpRight from "~icons/lucide/arrow-up-right";

import { cn } from "#/lib/utils";

const iconColors = {
	blue: "bg-blue-50 text-blue-600",
	green: "bg-green-50 text-green-600",
	orange: "bg-orange-50 text-orange-600",
	violet: "bg-violet-50 text-violet-600",
	amber: "bg-amber-50 text-amber-600",
};

/**
 * @typedef StatCardProps
 * @prop {string} label
 * @prop {string | number} value
 * @prop {import("react").ComponentType<{ className?: string }>} [icon]
 * @prop {keyof typeof iconColors} [color]
 * @prop {string} [delta]
 * @prop {"up" | "down"} [dir]
 * @prop {boolean} [center]
 */

/**
 * @param {StatCardProps}
 */
export default function StatCard({
	label,
	value,
	icon: Icon,
	color = "blue",
	delta,
	dir = "up",
	center = false,
}) {
	if (center) {
		return (
			<article className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col items-center text-center gap-1">
				<span className="text-3xl font-bold text-gray-900 tabular-nums">
					{value}
				</span>
				<span className="text-sm text-gray-500">{label}</span>
			</article>
		);
	}

	return (
		<article className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-3">
			<div className="flex justify-between items-start gap-4">
				<span className="text-sm text-gray-500">{label}</span>
				{Icon && (
					<div
						className={cn(
							"grid place-content-center size-10 shrink-0 rounded-xl",
							iconColors[color],
						)}
					>
						<Icon className="size-5" />
					</div>
				)}
			</div>
			<span className="text-3xl font-bold text-gray-900 tabular-nums">
				{value}
			</span>
			{delta && (
				<span
					className={cn(
						"flex items-center gap-1 text-sm font-medium",
						dir === "up" ? "text-green-600" : "text-red-500",
					)}
				>
					{dir === "up" ? (
						<ArrowUpRight className="size-4" />
					) : (
						<ArrowDownRight className="size-4" />
					)}
					{delta}
					<span className="text-gray-400 font-normal">dari bulan lalu</span>
				</span>
			)}
		</article>
	);
}

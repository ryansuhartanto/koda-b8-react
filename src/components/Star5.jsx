import Star from "~icons/lucide/star";

import { cn } from "#/lib/utils";

/**
 * @typedef Star5Props
 * @prop {number} [count]
 * @prop {"default" | "monochrome"} [variant]
 */

/**
 * @param {Star5Props}
 */
export default function Star5({ count = 5, variant = "default" }) {
	return (
		<>
			{Array.from({ length: 5 }, (_, i) => {
				const active = i < count;
				const variantDefault = variant === "default";

				return (
					<Star
						key={i}
						className={cn({
							"[&_path]:fill-current": active,
							"text-amber-400": active && variantDefault,
							"text-gray-300": !active && variantDefault,
						})}
					/>
				);
			})}
		</>
	);
}

import type { JSX } from "react";
import Star from "~icons/lucide/star";

import { cn } from "#/lib/utils";

export type Star5Props = {
	count?: number;
	variant?: "default" | "monochrome";
};

export default function Star5({
	count = 5,
	variant = "default",
}: Star5Props): JSX.Element {
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

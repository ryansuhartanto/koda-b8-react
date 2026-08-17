import type { JSX } from "react";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import Star from "~icons/lucide/star";

export const starVariants = cva("", {
	variants: {
		variant: { default: "", monochrome: "" },
		active: { true: "[&_path]:fill-current", false: "" },
	},
	compoundVariants: [
		{ variant: "default", active: true, class: "text-amber-400" },
		{ variant: "default", active: false, class: "text-gray-300" },
	],
	defaultVariants: { variant: "default" },
});

export type Star5Props = VariantProps<typeof starVariants> & {
	count?: number;
};

export default function Star5({ count = 5, variant }: Star5Props): JSX.Element {
	return (
		<>
			{Array.from({ length: 5 }, (_, i) => (
				<Star
					key={i}
					className={starVariants({ variant, active: i < count })}
				/>
			))}
		</>
	);
}

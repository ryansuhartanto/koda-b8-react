import type { JSX } from "react";

import { cn } from "#/lib/utils";

export type AvatarProps = {
	initial?: string;
	src?: string;
	alt?: string;
	className?: string;
};

export default function Avatar({
	initial = "B",
	src,
	alt = "",
	className,
}: AvatarProps): JSX.Element {
	return (
		<div
			className={cn(
				"grid place-content-center shrink-0 size-12 rounded-full overflow-hidden bg-blue-100 text-blue-600 font-bold",
				className,
			)}
		>
			{src ? (
				<img
					src={src}
					alt={alt}
					className="w-full h-full object-cover"
				/>
			) : (
				initial
			)}
		</div>
	);
}

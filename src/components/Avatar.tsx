import type { JSX } from "react";

import { Avatar as BaseAvatar } from "@base-ui/react/avatar";

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
		<BaseAvatar.Root
			className={cn(
				"grid place-content-center shrink-0 size-12 rounded-full overflow-hidden bg-brand-100 text-brand-600 font-bold select-none",
				className,
			)}
		>
			<BaseAvatar.Image
				src={src}
				alt={alt}
				className="w-full h-full object-cover"
			/>
			<BaseAvatar.Fallback>{initial}</BaseAvatar.Fallback>
		</BaseAvatar.Root>
	);
}

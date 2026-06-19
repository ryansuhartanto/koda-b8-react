import { cn } from "#/lib/utils";

/**
 * @typedef AvatarProps
 * @prop {string} [initial]
 * @prop {string} [src]
 * @prop {string} [alt]
 * @prop {string} [className]
 */

/**
 * @param {AvatarProps} props
 */
export default function Avatar({ initial = "B", src, alt = "", className }) {
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

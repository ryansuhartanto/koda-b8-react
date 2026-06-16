import { cn } from "#/lib/utils";

const sizes = {
	sm: { wrapper: "h-8 w-24 border-gray-200", button: "w-8" },
	md: { wrapper: "h-10 w-32 border-gray-300", button: "w-10" },
};

/**
 * @typedef QuantityStepperProps
 * @prop {number} [defaultValue]
 * @prop {number} [min]
 * @prop {number} [max]
 * @prop {"sm" | "md"} [size]
 */

/**
 * @param {QuantityStepperProps}
 */
export default function QuantityStepper({
	defaultValue = 1,
	min = 1,
	max,
	size = "md",
}) {
	const { wrapper, button } = sizes[size];

	return (
		<div
			className={cn(
				"flex items-center border rounded-lg overflow-hidden bg-white",
				wrapper,
			)}
		>
			<button
				type="button"
				className={cn(
					"h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer",
					button,
				)}
			>
				&minus;
			</button>
			<input
				type="number"
				defaultValue={defaultValue}
				min={min}
				max={max}
				className="flex-1 w-full text-center text-sm font-medium outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			/>
			<button
				type="button"
				className={cn(
					"h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer",
					button,
				)}
			>
				&plus;
			</button>
		</div>
	);
}

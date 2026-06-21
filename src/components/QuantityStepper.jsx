import { useState } from "react";

import { cn } from "#/lib/utils";

const sizes = {
	sm: { wrapper: "h-8 w-24 border-gray-200", button: "w-8" },
	md: { wrapper: "h-10 w-32 border-gray-300", button: "w-10" },
};

/**
 * @typedef QuantityStepperProps
 * @prop {number} [value]
 * @prop {number} [defaultValue]
 * @prop {(value: number) => void} [onChange]
 * @prop {number} [min]
 * @prop {number} [max]
 * @prop {"sm" | "md"} [size]
 */

/**
 * @param {QuantityStepperProps} props
 */
export default function QuantityStepper({
	value,
	defaultValue = 1,
	onChange,
	min = 1,
	max,
	size = "md",
}) {
	const [internal, setInternal] = useState(defaultValue);
	const qty = value ?? internal;
	const { wrapper, button } = sizes[size];

	/** @param {number} next */
	function update(next) {
		const clamped = Math.max(
			min,
			max !== undefined ? Math.min(max, next) : next,
		);
		if (value === undefined) {
			setInternal(clamped);
		}
		onChange?.(clamped);
	}

	return (
		<div
			className={cn(
				"flex items-center border rounded-lg overflow-hidden bg-white",
				wrapper,
			)}
		>
			<button
				type="button"
				onClick={() => update(qty - 1)}
				disabled={qty <= min}
				className={cn(
					"h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed",
					button,
				)}
			>
				{"-"}
			</button>
			<input
				type="number"
				value={qty}
				min={min}
				max={max}
				onChange={(e) => update(Number(e.target.value))}
				className="flex-1 w-full text-center text-sm font-medium outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			/>
			<button
				type="button"
				onClick={() => update(qty + 1)}
				disabled={max !== undefined && qty >= max}
				className={cn(
					"h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed",
					button,
				)}
			>
				{"+"}
			</button>
		</div>
	);
}

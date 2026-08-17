import type { JSX } from "react";

import { NumberField } from "@base-ui/react/number-field";

import { cn } from "#/lib/utils";

const sizes = {
	sm: { wrapper: "h-8 w-24 border-gray-200", button: "w-8" },
	md: { wrapper: "h-10 w-32 border-gray-300", button: "w-10" },
};

const buttonClass =
	"h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed select-none";

export type QuantityStepperProps = {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	size?: "sm" | "md";
	label?: string;
};

export default function QuantityStepper({
	value,
	defaultValue = 1,
	onChange,
	min = 1,
	max,
	size = "md",
	label = "Jumlah",
}: QuantityStepperProps): JSX.Element {
	const { wrapper, button } = sizes[size];

	return (
		<NumberField.Root
			value={value}
			defaultValue={defaultValue}
			onValueChange={(next) => onChange?.(next ?? min)}
			min={min}
			max={max}
			aria-label={label}
		>
			<NumberField.Group
				className={cn(
					"flex items-center border rounded-lg overflow-hidden bg-white",
					wrapper,
				)}
			>
				<NumberField.Decrement className={cn(buttonClass, button)}>
					{"-"}
				</NumberField.Decrement>
				<NumberField.Input className="flex-1 w-full min-w-0 text-center text-sm font-medium outline-none bg-transparent" />
				<NumberField.Increment className={cn(buttonClass, button)}>
					{"+"}
				</NumberField.Increment>
			</NumberField.Group>
		</NumberField.Root>
	);
}

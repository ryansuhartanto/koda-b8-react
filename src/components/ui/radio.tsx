import { Field } from "@base-ui/react/field";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { JSX, ReactNode } from "react";

import { cn } from "#/lib/utils";

export const radioVariants = cva(
	"cursor-pointer select-none transition-colors data-disabled:opacity-50 data-disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
	{
		variants: {
			variant: {
				dot: "grid place-content-center shrink-0 size-4 rounded-full border border-gray-300 bg-white data-checked:border-brand-600",
				pill: "p-1.5 px-3 text-sm font-medium border rounded-lg border-gray-200 bg-white text-gray-600 hover:border-gray-300 data-checked:border-brand-600 data-checked:bg-brand-50 data-checked:text-brand-600",
			},
		},
		defaultVariants: { variant: "dot" },
	},
);

export const radioLabelVariants = cva(
	"flex items-center gap-3 cursor-pointer select-none",
	{
		variants: {
			card: {
				true: "border rounded-xl p-4 transition-colors border-black/10 hover:border-brand-300 has-data-checked:border-brand-600 has-data-checked:bg-brand-50/50",
				false: "text-sm text-gray-600",
			},
		},
		defaultVariants: { card: false },
	},
);

export type RadioGroupProps<T> = {
	value?: T;
	defaultValue?: T;
	onValueChange?: (value: T) => void;
	name?: string;
	disabled?: boolean;
	className?: string;
	children: ReactNode;
};

export function RadioGroup<T>({
	value,
	defaultValue,
	onValueChange,
	name,
	disabled,
	className,
	children,
}: RadioGroupProps<T>): JSX.Element {
	return (
		<Field.Root>
			<BaseRadioGroup
				value={value}
				defaultValue={defaultValue}
				onValueChange={(next) => onValueChange?.(next)}
				name={name}
				disabled={disabled}
				className={className}
			>
				{children}
			</BaseRadioGroup>
		</Field.Root>
	);
}

export type RadioProps = VariantProps<typeof radioLabelVariants> & {
	value: unknown;
	disabled?: boolean;
	children?: ReactNode;
	className?: string;
};

export function Radio({
	value,
	disabled,
	children,
	card,
	className,
}: RadioProps): JSX.Element {
	const control = (
		<BaseRadio.Root
			value={value}
			disabled={disabled}
			className={radioVariants({ variant: "dot" })}
		>
			<BaseRadio.Indicator className="size-2 rounded-full bg-brand-600 data-unchecked:hidden" />
		</BaseRadio.Root>
	);

	if (!children) {
		return control;
	}

	return (
		<Field.Item
			render={
				<Field.Label className={cn(radioLabelVariants({ card }), className)} />
			}
		>
			{control}
			{children}
		</Field.Item>
	);
}

export function RadioPill({
	value,
	disabled,
	className,
	children,
}: {
	value: unknown;
	disabled?: boolean;
	className?: string;
	children: ReactNode;
}): JSX.Element {
	return (
		<BaseRadio.Root
			value={value}
			disabled={disabled}
			className={cn(radioVariants({ variant: "pill" }), className)}
		>
			{children}
		</BaseRadio.Root>
	);
}

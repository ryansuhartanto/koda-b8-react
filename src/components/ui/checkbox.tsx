import type { JSX, ReactNode, Ref } from "react";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Field } from "@base-ui/react/field";

import IconCheck from "~icons/lucide/check";

import { cn } from "#/lib/utils";

export type CheckboxProps = {
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	name?: string;
	value?: string;
	disabled?: boolean;
	inputRef?: Ref<HTMLInputElement>;
	children?: ReactNode;
	className?: string;
};

export function Checkbox({
	checked,
	defaultChecked,
	onCheckedChange,
	name,
	value,
	disabled,
	inputRef,
	children,
	className,
}: CheckboxProps): JSX.Element {
	const control = (
		<BaseCheckbox.Root
			checked={checked}
			defaultChecked={defaultChecked}
			onCheckedChange={onCheckedChange}
			name={name}
			value={value}
			disabled={disabled}
			inputRef={inputRef}
			className="grid place-content-center shrink-0 size-4 rounded border border-gray-300 bg-white cursor-pointer transition-colors data-checked:bg-brand-600 data-checked:border-brand-600 data-disabled:opacity-50 data-disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
		>
			<BaseCheckbox.Indicator className="text-white text-[0.65rem] data-unchecked:hidden">
				<IconCheck />
			</BaseCheckbox.Indicator>
		</BaseCheckbox.Root>
	);

	if (!children) {
		return control;
	}

	return (
		<Field.Root>
			<Field.Label
				className={cn(
					"flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none",
					className,
				)}
			>
				{control}
				{children}
			</Field.Label>
		</Field.Root>
	);
}

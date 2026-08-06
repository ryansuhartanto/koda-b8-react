import { Field } from "@base-ui/react/field";
import type {
	JSX,
	ComponentType,
	InputHTMLAttributes,
	ReactNode,
	Ref,
} from "react";

import { cn } from "#/lib/utils";

export type FormFieldOwnProps = {
	label: string;
	error?: string;
	ref?: Ref<HTMLInputElement>;
	icon?: ComponentType<{ className?: string }>;
	trailing?: ReactNode;
	aside?: ReactNode;
	description?: ReactNode;
};

export default function FormField({
	label,
	error,
	icon: Icon,
	trailing,
	aside,
	description,
	ref,
	required,
	...inputProps
}: FormFieldOwnProps & InputHTMLAttributes<HTMLInputElement>): JSX.Element {
	return (
		<Field.Root
			invalid={Boolean(error)}
			className="flex flex-col gap-2 text-sm text-gray-600"
		>
			<div className="flex justify-between items-center">
				<Field.Label
					className={cn(
						required && "after:content-['*'] after:ml-1 after:text-red-500",
					)}
				>
					{label}
				</Field.Label>
				{aside}
			</div>
			<div className="flex items-center gap-2 border rounded-xl px-4 py-2.5 transition-colors bg-gray-50 text-gray-900 border-black/10 focus-within:border-blue-600 focus-within:bg-white has-data-invalid:border-red-400">
				{Icon && <Icon className="text-gray-400 shrink-0" />}
				<Field.Control
					ref={ref}
					required={required}
					className="flex-1 w-full outline-none bg-transparent text-sm"
					{...inputProps}
				/>
				{trailing}
			</div>
			{description && (
				<Field.Description className="text-xs text-gray-500 -mt-1">
					{description}
				</Field.Description>
			)}
			<Field.Error
				match={Boolean(error)}
				className="text-xs text-red-500 -mt-1"
			>
				{error}
			</Field.Error>
		</Field.Root>
	);
}

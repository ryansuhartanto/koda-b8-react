import { Select as BaseSelect } from "@base-ui/react/select";
import type { JSX, ReactNode, Ref } from "react";
import IconCheck from "~icons/lucide/check";
import IconChevronDown from "~icons/lucide/chevron-down";

import { cn } from "#/lib/utils";

export type SelectOption<T> = { value: T; label: ReactNode };

export type SelectProps<T> = {
	items: Array<SelectOption<T>>;
	value?: T;
	defaultValue?: T;
	onValueChange?: (value: T | undefined) => void;
	name?: string;
	label?: ReactNode;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	inputRef?: Ref<HTMLInputElement>;
	className?: string;
	triggerClassName?: string;
};

export function Select<T>({
	items,
	value,
	defaultValue,
	onValueChange,
	name,
	label,
	placeholder = "Pilih…",
	required,
	disabled,
	inputRef,
	className,
	triggerClassName,
}: SelectProps<T>): JSX.Element {
	return (
		<BaseSelect.Root
			items={items}
			value={value}
			defaultValue={defaultValue}
			onValueChange={(next) => {
				onValueChange?.(next ?? undefined);
			}}
			name={name}
			required={required}
			disabled={disabled}
			inputRef={inputRef}
		>
			<div
				className={cn("flex flex-col gap-2 text-sm text-gray-600", className)}
			>
				{label && (
					<BaseSelect.Label
						className={cn(
							required && "after:content-['*'] after:ml-1 after:text-red-500",
						)}
					>
						{label}
					</BaseSelect.Label>
				)}
				<BaseSelect.Trigger
					className={cn(
						"flex items-center justify-between gap-2 w-full border border-black/10 rounded-xl px-4 py-2.5 bg-gray-50 text-gray-900 text-sm text-left cursor-pointer transition-colors select-none hover:bg-white data-popup-open:bg-white data-popup-open:border-blue-600 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-600 data-disabled:opacity-50 data-disabled:cursor-not-allowed",
						triggerClassName,
					)}
				>
					<BaseSelect.Value
						placeholder={placeholder}
						className="truncate"
					/>
					<BaseSelect.Icon className="shrink-0 text-gray-400">
						<IconChevronDown />
					</BaseSelect.Icon>
				</BaseSelect.Trigger>
			</div>

			<BaseSelect.Portal>
				<BaseSelect.Positioner
					sideOffset={6}
					alignItemWithTrigger={false}
				>
					<BaseSelect.Popup className="max-h-[min(20rem,var(--available-height))] w-(--anchor-width) min-w-max overflow-y-auto rounded-xl border border-black/10 bg-white p-1 shadow-lg outline-none origin-(--transform-origin) transition-[transform,opacity] duration-150 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95">
						<BaseSelect.List>
							{items.map((item) => (
								<BaseSelect.Item
									key={String(item.value)}
									value={item.value}
									className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 cursor-pointer select-none outline-none data-highlighted:bg-blue-50 data-highlighted:text-blue-700 data-selected:font-medium"
								>
									<BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
									<BaseSelect.ItemIndicator className="text-blue-600">
										<IconCheck />
									</BaseSelect.ItemIndicator>
								</BaseSelect.Item>
							))}
						</BaseSelect.List>
					</BaseSelect.Popup>
				</BaseSelect.Positioner>
			</BaseSelect.Portal>
		</BaseSelect.Root>
	);
}

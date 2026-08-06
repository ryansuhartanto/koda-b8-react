import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { JSX, ReactNode } from "react";

import { cn } from "#/lib/utils";

export const tabsListVariants = cva("relative flex", {
	variants: {
		variant: {
			underline: "gap-6 border-b border-black/10",
			pill: "flex-wrap gap-2",
		},
	},
	defaultVariants: { variant: "underline" },
});

export const tabVariants = cva(
	"font-medium whitespace-nowrap cursor-pointer select-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
	{
		variants: {
			variant: {
				underline:
					"px-1 pb-3 text-sm text-gray-500 hover:text-gray-700 data-active:text-brand-600",
				pill: "px-4 py-2 rounded-xl border border-black/10 bg-white text-sm text-gray-600 hover:border-brand-600 data-active:bg-brand-600 data-active:border-brand-600 data-active:text-white",
			},
		},
		defaultVariants: { variant: "underline" },
	},
);

export type TabsProps<T> = {
	value?: T;
	defaultValue?: T;
	onValueChange?: (value: T) => void;
	className?: string;
	children: ReactNode;
};

export function Tabs<T>({
	value,
	defaultValue,
	onValueChange,
	className,
	children,
}: TabsProps<T>): JSX.Element {
	return (
		<BaseTabs.Root
			value={value}
			defaultValue={defaultValue}
			onValueChange={(next) => onValueChange?.(next as T)}
			className={className}
		>
			{children}
		</BaseTabs.Root>
	);
}

export type TabsListProps = VariantProps<typeof tabsListVariants> & {
	className?: string;
	children: ReactNode;
};

export function TabsList({
	variant,
	className,
	children,
}: TabsListProps): JSX.Element {
	return (
		<BaseTabs.List className={cn(tabsListVariants({ variant }), className)}>
			{children}
			{variant !== "pill" && (
				<BaseTabs.Indicator className="absolute bottom-0 left-0 h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) bg-brand-600 transition-all duration-200" />
			)}
		</BaseTabs.List>
	);
}

export type TabProps = VariantProps<typeof tabVariants> & {
	value: unknown;
	className?: string;
	children: ReactNode;
};

export function Tab({
	value,
	variant,
	className,
	children,
}: TabProps): JSX.Element {
	return (
		<BaseTabs.Tab
			value={value}
			className={cn(tabVariants({ variant }), className)}
		>
			{children}
		</BaseTabs.Tab>
	);
}

export const TabPanel = BaseTabs.Panel;

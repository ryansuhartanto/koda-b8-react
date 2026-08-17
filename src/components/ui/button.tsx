import type { ComponentProps, JSX } from "react";

import { Button as BaseButton } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "#/lib/utils";

export const buttonVariants = cva(
	"font-medium whitespace-nowrap transition-colors cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-60 disabled:cursor-not-allowed data-disabled:opacity-60 data-disabled:cursor-not-allowed",
	{
		variants: {
			variant: {
				solid: "",
				outline: "border bg-white",
				ghost: "",
				link: "",
				icon: "",
			},
			tone: {
				primary: "",
				accent: "",
				neutral: "",
				danger: "",
				success: "",
			},
			size: {
				sm: "inline-flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg",
				md: "inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm rounded-xl",
				lg: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl",
				square: "grid place-content-center size-8 rounded-full",
				squareLg: "inline-flex items-center justify-center size-10 rounded-xl",
				none: "",
			},
			block: { true: "w-full" },
		},
		compoundVariants: [
			{
				variant: "solid",
				tone: "primary",
				class: "bg-brand-600 text-white hover:bg-brand-700",
			},
			{
				variant: "solid",
				tone: "accent",
				class:
					"bg-accent-500 text-white hover:bg-accent-600 shadow-sm shadow-accent-500/20",
			},
			{
				variant: "solid",
				tone: "neutral",
				class: "bg-gray-100 text-gray-700 hover:bg-gray-200",
			},
			{
				variant: "solid",
				tone: "danger",
				class: "bg-red-600 text-white hover:bg-red-700",
			},

			{
				variant: "outline",
				tone: "primary",
				class: "border-brand-600 text-brand-600 hover:bg-brand-50",
			},
			{
				variant: "outline",
				tone: "accent",
				class:
					"border-2 border-accent-500 bg-accent-50/50 text-accent-500 hover:bg-accent-50",
			},
			{
				variant: "outline",
				tone: "neutral",
				class: "border-black/10 text-gray-700 hover:bg-gray-50",
			},
			{
				variant: "outline",
				tone: "danger",
				class: "border-red-200 text-red-600 hover:bg-red-50",
			},

			{
				variant: "ghost",
				tone: "primary",
				class: "text-gray-500 hover:text-brand-600 hover:bg-brand-50",
			},
			{
				variant: "ghost",
				tone: "neutral",
				class: "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
			},
			{
				variant: "ghost",
				tone: "danger",
				class: "text-gray-400 hover:text-red-500 hover:bg-red-50",
			},

			{
				variant: "link",
				tone: "primary",
				class: "text-brand-600 hover:underline",
			},
			{
				variant: "link",
				tone: "danger",
				class: "text-red-500 hover:text-red-700",
			},
			{
				variant: "link",
				tone: "neutral",
				class: "text-gray-600 hover:text-gray-900",
			},

			{ variant: "icon", tone: "primary", class: "hover:text-brand-600" },
			{
				variant: "icon",
				tone: "neutral",
				class: "text-gray-400 hover:text-gray-900",
			},
			{ variant: "icon", tone: "danger", class: "hover:text-red-500" },
			{
				variant: "icon",
				tone: "success",
				class: "text-green-500 hover:text-green-600",
			},
		],
		defaultVariants: { variant: "solid", tone: "primary", size: "md" },
	},
);

export type ButtonProps = ComponentProps<typeof BaseButton> &
	VariantProps<typeof buttonVariants>;

export function Button({
	variant,
	tone,
	size,
	block,
	className,
	type = "button",
	...props
}: ButtonProps): JSX.Element {
	return (
		<BaseButton
			type={type}
			className={cn(buttonVariants({ variant, tone, size, block }), className)}
			{...props}
		/>
	);
}

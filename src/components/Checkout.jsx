import React from "react";
import Check from "~icons/lucide/check";

import { SummaryItem } from "#/components/ProductCard";
import { cn } from "#/lib/utils";

/**
 * @typedef StepperProps
 * @prop {number} activeStep
 */

/**
 * @param {StepperProps} props
 */
export function Stepper({ activeStep }) {
	return (
		<nav
			aria-label="Checkout progress"
			className="flex items-center w-full max-w-xl mx-auto py-4 pb-8"
		>
			{[
				{ step: 1, label: "Pengiriman" },
				{ step: 2, label: "Pembayaran" },
				{ step: 3, label: "Konfirmasi" },
			].map(({ step, label }, i, arr) => [
				<React.Fragment key={label}>
					<div className="flex flex-col items-center gap-2 relative">
						<div
							className={cn(
								"size-12 rounded-full flex items-center justify-center text-lg font-medium z-10 transition-colors",
								{
									"bg-green-500 text-white": activeStep > step,
									"bg-blue-600 text-white": activeStep === step,
									"bg-gray-200 text-gray-500": activeStep < step,
								},
							)}
						>
							{activeStep > step ? <Check className="size-6" /> : step}
						</div>
						<span
							className={cn("text-sm absolute top-14 whitespace-nowrap", {
								"text-blue-600 font-medium": activeStep === step,
								"text-gray-500": activeStep !== step,
							})}
						>
							{label}
						</span>
					</div>
					{i < arr.length - 1 && (
						<div
							className={cn("flex-1 h-0.5 mx-4 transition-colors", {
								"bg-green-500": activeStep > step,
								"bg-gray-200": activeStep <= step,
							})}
						/>
					)}
				</React.Fragment>,
			])}
		</nav>
	);
}

/**
 * @typedef SummaryProps
 * @prop {import("#/components/ProductCard").SummaryItemProps[]} [items]
 * @prop {string} [subtotal]
 */

/**
 * @param {SummaryProps} props
 */
export function Summary({ items = [], subtotal = "Rp 0" }) {
	return (
		<aside className="flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5 sticky top-36">
			<h2 className="text-lg font-medium text-gray-900">Ringkasan Pesanan</h2>

			<div className="flex flex-col gap-4">
				{items.map((item) => (
					<SummaryItem
						key={item.name}
						{...item}
					/>
				))}
			</div>

			<hr className="border-gray-100" />

			<div className="flex flex-col gap-2 text-sm text-gray-600">
				<div className="flex justify-between">
					<span>Subtotal</span>
					<span>{subtotal}</span>
				</div>
				<div className="flex justify-between">
					<span>Ongkir</span>
					<span className="text-green-600 font-medium">Gratis</span>
				</div>
				<hr className="border-gray-200" />
				<div className="flex justify-between items-center">
					<span className="font-medium text-gray-900">Total</span>
					<span className="font-bold text-blue-600">{subtotal}</span>
				</div>
			</div>

			<div className="flex flex-col items-center gap-2 text-center text-xs">
				<div className="flex items-center gap-1 text-gray-600 font-medium">
					🔒 Pembayaran aman dan terenkripsi
				</div>
			</div>
		</aside>
	);
}

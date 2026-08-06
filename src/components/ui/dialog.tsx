import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { JSX, ReactNode } from "react";
import IconX from "~icons/lucide/x";

import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";

export type DialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	className?: string;
	children: ReactNode;
};

export function Dialog({
	open,
	onOpenChange,
	title,
	description,
	className,
	children,
}: DialogProps): JSX.Element {
	return (
		<BaseDialog.Root
			open={open}
			onOpenChange={onOpenChange}
		>
			<BaseDialog.Portal>
				<BaseDialog.Backdrop className="fixed inset-0 bg-black/40 transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
				<BaseDialog.Viewport className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
					<BaseDialog.Popup
						className={cn(
							"relative w-full max-w-lg my-auto bg-white rounded-2xl shadow-xl outline-none transition-all duration-200 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95",
							className,
						)}
					>
						<div className="flex items-start justify-between gap-4 p-6 pb-4">
							<div>
								<BaseDialog.Title className="text-lg font-semibold text-gray-900">
									{title}
								</BaseDialog.Title>
								{description && (
									<BaseDialog.Description className="mt-1 text-sm text-gray-500">
										{description}
									</BaseDialog.Description>
								)}
							</div>
							<BaseDialog.Close
								aria-label="Tutup"
								className={cn(
									buttonVariants({
										variant: "ghost",
										tone: "neutral",
										size: "none",
									}),
									"shrink-0 -mr-1 -mt-1 p-1.5 rounded-lg text-gray-400",
								)}
							>
								<IconX />
							</BaseDialog.Close>
						</div>
						{children}
					</BaseDialog.Popup>
				</BaseDialog.Viewport>
			</BaseDialog.Portal>
		</BaseDialog.Root>
	);
}

export const DialogClose = BaseDialog.Close;

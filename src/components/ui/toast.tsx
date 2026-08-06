import { Toast as BaseToast } from "@base-ui/react/toast";
import type { JSX, ReactNode } from "react";
import IconX from "~icons/lucide/x";

import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";

export const useToast = BaseToast.useToastManager;

function ToastList(): JSX.Element {
	const { toasts } = BaseToast.useToastManager();

	return (
		<>
			{toasts.map((toast) => (
				<BaseToast.Root
					key={toast.id}
					toast={toast}
					className="absolute inset-x-0 bottom-0 z-[calc(1000_-_var(--toast-index))] mr-0 w-full rounded-xl border border-black/10 bg-white p-4 shadow-lg select-none [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_+_min(var(--toast-index)_*_-16px,0px)))_scale(calc(max(0,1_-_(var(--toast-index)_*_0.1))))] transition-all duration-300 ease-out data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-offset-y)_*_-1_+_var(--toast-swipe-movement-y)_+_var(--toast-index)_*_-16px))] data-starting-style:[transform:translateY(150%)] data-ending-style:opacity-0 after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)_+_1px)] after:w-full after:content-['']"
				>
					<BaseToast.Content>
						<BaseToast.Title className="text-sm font-semibold text-gray-900" />
						<BaseToast.Description className="mt-0.5 text-sm text-gray-500" />
					</BaseToast.Content>
					<BaseToast.Close
						aria-label="Tutup"
						className={cn(
							buttonVariants({
								variant: "ghost",
								tone: "neutral",
								size: "none",
							}),
							"absolute top-3 right-3 p-1 rounded-md text-gray-400",
						)}
					>
						<IconX />
					</BaseToast.Close>
				</BaseToast.Root>
			))}
		</>
	);
}

export function ToastProvider({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<BaseToast.Provider>
			{children}
			<BaseToast.Portal>
				<BaseToast.Viewport className="fixed bottom-4 right-4 mx-auto flex w-80 max-w-[calc(100vw_-_2rem)] [--gap:1rem]">
					<ToastList />
				</BaseToast.Viewport>
			</BaseToast.Portal>
		</BaseToast.Provider>
	);
}

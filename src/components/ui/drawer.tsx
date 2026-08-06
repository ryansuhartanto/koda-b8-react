import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { JSX, ReactNode } from "react";
import { useEffect } from "react";

import { useMediaQuery } from "#/hooks/useMediaQuery";
import { cn } from "#/lib/utils";

const MD = "(min-width: 48rem)";

const sides = {
	left: {
		swipe: "left",
		viewport: "items-stretch justify-start",
		popup: "h-full w-72 max-w-[85vw] border-r",
		hidden:
			"data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
		swipeAxis: "[transform:translateX(var(--drawer-swipe-movement-x))]",
	},
	right: {
		swipe: "right",
		viewport: "items-stretch justify-end",
		popup: "h-full w-72 max-w-[85vw] border-l",
		hidden:
			"data-starting-style:translate-x-full data-ending-style:translate-x-full",
		swipeAxis: "[transform:translateX(var(--drawer-swipe-movement-x))]",
	},
	bottom: {
		swipe: "down",
		viewport: "items-end justify-center",
		popup: "w-full max-h-[80vh] rounded-t-2xl border-t",
		hidden:
			"data-starting-style:translate-y-full data-ending-style:translate-y-full",
		swipeAxis: "[transform:translateY(var(--drawer-swipe-movement-y))]",
	},
} as const;

export type DrawerProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	side?: keyof typeof sides;
	title: string;
	hideTitle?: boolean;
	description?: string;
	/** Closes the drawer once the viewport reaches `md`, where the desktop layout takes over. */
	mobileOnly?: boolean;
	className?: string;
	children: ReactNode;
};

export function Drawer({
	open,
	onOpenChange,
	side = "left",
	title,
	hideTitle = false,
	description,
	mobileOnly = false,
	className,
	children,
}: DrawerProps): JSX.Element {
	const s = sides[side];
	const isDesktop = useMediaQuery(MD);
	const suppressed = mobileOnly && isDesktop;

	useEffect(() => {
		if (suppressed && open) {
			onOpenChange(false);
		}
	}, [suppressed, open, onOpenChange]);

	return (
		<BaseDrawer.Root
			open={open && !suppressed}
			onOpenChange={onOpenChange}
			swipeDirection={s.swipe}
		>
			<BaseDrawer.Portal>
				<BaseDrawer.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-[calc(0.4_*_(1_-_var(--drawer-swipe-progress)))] transition-opacity duration-300 ease-out data-swiping:duration-0 data-starting-style:opacity-0 data-ending-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
				<BaseDrawer.Viewport className={cn("fixed inset-0 flex", s.viewport)}>
					<BaseDrawer.Popup
						className={cn(
							"flex flex-col bg-white border-black/10 text-gray-900 outline-none overflow-y-auto overscroll-contain touch-auto transition-transform duration-300 ease-out data-swiping:select-none data-swiping:duration-0",
							s.popup,
							s.swipeAxis,
							s.hidden,
							className,
						)}
					>
						{side === "bottom" && (
							<div className="mx-auto mt-3 mb-1 h-1 w-12 shrink-0 rounded-full bg-gray-300" />
						)}
						<BaseDrawer.Title
							className={cn(
								"px-4 py-4 text-base font-semibold",
								hideTitle && "sr-only",
							)}
						>
							{title}
						</BaseDrawer.Title>
						{description && (
							<BaseDrawer.Description className="px-4 -mt-2 pb-2 text-sm text-gray-500">
								{description}
							</BaseDrawer.Description>
						)}
						<BaseDrawer.Content className="flex-1 min-h-0">
							{children}
						</BaseDrawer.Content>
					</BaseDrawer.Popup>
				</BaseDrawer.Viewport>
			</BaseDrawer.Portal>
		</BaseDrawer.Root>
	);
}

export const DrawerClose = BaseDrawer.Close;

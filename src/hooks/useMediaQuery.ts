import { useMemo, useSyncExternalStore } from "react";

export type MediaQueryStore = {
	subscribe: (onStoreChange: () => void) => () => void;
	getSnapshot: () => boolean;
};

export function mediaQueryStore(query: string): MediaQueryStore {
	return {
		subscribe(onStoreChange) {
			const list = globalThis.matchMedia(query);
			list.addEventListener("change", onStoreChange);
			return () => {
				list.removeEventListener("change", onStoreChange);
			};
		},
		getSnapshot: () => globalThis.matchMedia(query).matches,
	};
}

export function useMediaQuery(query: string): boolean {
	const store = useMemo(() => mediaQueryStore(query), [query]);
	return useSyncExternalStore(store.subscribe, store.getSnapshot, () => false);
}

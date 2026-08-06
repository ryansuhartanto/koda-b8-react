import { expect, test, vi } from "vitest";

import { mediaQueryStore } from "#/hooks/useMediaQuery";

function fakeMatchMedia(initial: boolean) {
	const listeners = new Set<() => void>();
	let matches = initial;

	globalThis.matchMedia = vi.fn(() => ({
		get matches() {
			return matches;
		},
		addEventListener: (_: string, fn: () => void) => void listeners.add(fn),
		removeEventListener: (_: string, fn: () => void) =>
			void listeners.delete(fn),
	})) as unknown as typeof globalThis.matchMedia;

	return {
		set(next: boolean) {
			matches = next;
			for (const fn of listeners) {
				fn();
			}
		},
		listenerCount: () => listeners.size,
	};
}

test("notifies on change so a mobile-only drawer closes when the viewport grows", () => {
	const mm = fakeMatchMedia(false);
	const store = mediaQueryStore("(min-width: 48rem)");

	expect(store.getSnapshot()).toBe(false);

	const notified = vi.fn();
	const unsubscribe = store.subscribe(notified);
	expect(mm.listenerCount()).toBe(1);

	mm.set(true);
	expect(notified).toHaveBeenCalledTimes(1);
	expect(store.getSnapshot()).toBe(true);

	unsubscribe();
	expect(mm.listenerCount()).toBe(0);

	mm.set(false);
	expect(notified).toHaveBeenCalledTimes(1);
});

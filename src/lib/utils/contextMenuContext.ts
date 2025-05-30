import type { ContextMenuItem } from "$lib/commands/contextMenu";
import { getContext, setContext } from "svelte";

const KEY = "context-menu-context";

export function setContextMenuContext(items: () => ContextMenuItem[]) {
	return setContext(KEY, items);
}

export function getContextMenuContext(): () => ContextMenuItem[] {
	const maybeItems = getContext<(() => ContextMenuItem[]) | undefined>(KEY);
	if (maybeItems) {
		return maybeItems;
	} else {
		return () => [];
	}
}

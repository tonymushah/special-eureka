import type { ContextMenuItem } from "@special-eureka/core/commands/contextMenu";
import contextMenu from "@special-eureka/core/commands/contextMenu";
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

export type RegisterContextMenuEventOptions = {
	additionalMenus?: () => ContextMenuItem[],
	includeContext?: boolean;
	preventDefault?: boolean;
	stopPropagation?: boolean;
};

export default function registerContextMenuEvent(options?: RegisterContextMenuEventOptions): (e: MouseEvent) => any {
	const includeContext = options?.includeContext ?? true;
	const contextMenuFunc = includeContext ? getContextMenuContext() : () => [];
	return async (e) => {
		if (options?.preventDefault) {
			e.preventDefault();
		}
		if (options?.stopPropagation) {
			e.stopPropagation();
		}
		let menu = contextMenuFunc();
		if (options?.additionalMenus) {
			menu.push(...options.additionalMenus());
		}
		await contextMenu(menu, e)
	}
}

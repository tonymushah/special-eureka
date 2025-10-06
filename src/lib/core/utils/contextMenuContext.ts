import type { ContextMenuItem } from "@special-eureka/core/commands/contextMenu";
import contextMenu, { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
import { isArray } from "lodash";
import { getContext, setContext } from "svelte";

const KEY = "context-menu-context";

export function setContextMenuContext(
	_items: (() => ContextMenuItem[]) | ContextMenuItem[],
	append?: boolean
) {
	let items: () => ContextMenuItem[];
	if (isArray(_items)) {
		items = () => _items;
	} else {
		items = _items;
	}
	const parentContext = getContextMenuContext();
	return setContext(
		KEY,
		append
			? () => {
					return [...parentContext(), ...items()];
				}
			: items
	);
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
	additionalMenus?: (() => ContextMenuItem[]) | ContextMenuItem[];
	includeContext?: boolean;
	preventDefault?: boolean;
	stopPropagation?: boolean;
	addSeparator?: boolean;
};

export default function registerContextMenuEvent(
	options?: RegisterContextMenuEventOptions
): (e: MouseEvent) => any {
	const includeContext = options?.includeContext ?? true;
	const contextMenuFunc = includeContext ? getContextMenuContext() : () => [];
	const addSeparator = options?.addSeparator ?? true;
	return async (e) => {
		if (options?.preventDefault) {
			e.preventDefault();
		}
		if (options?.stopPropagation ?? true) {
			e.stopPropagation();
		}
		const menu = contextMenuFunc();
		if (options?.additionalMenus) {
			if (addSeparator) {
				menu.push(ContextMenuItemProvider.seperator());
			}
			if (typeof options.additionalMenus == "function") {
				menu.push(...options.additionalMenus());
			} else if (Array.isArray(options.additionalMenus)) {
				menu.push(...options.additionalMenus);
			}
		}
		await contextMenu(menu, e);
	};
}

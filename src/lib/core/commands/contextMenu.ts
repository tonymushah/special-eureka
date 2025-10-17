import { internalToStore } from "$lib/index.svelte";
import type { Accessor } from "@tanstack/svelte-query";
import { invoke, transformCallback } from "@tauri-apps/api/core";
import { LogicalPosition, Position, type PhysicalPosition } from "@tauri-apps/api/dpi";
import type { UnlistenFn } from "@tauri-apps/api/event";
import { getCurrentWebview } from "@tauri-apps/api/webview";
import { get, type Readable } from "svelte/store";
import { v4 } from "uuid";

type MaybeEventStreamData<T> = T | {
	eventName: string,
	initData: T
}

export type ContextMenuItem =
	(| {
		type: "Seperator";
	}
		| {
			type: "MenuItem";
			text: MaybeEventStreamData<string>;
			accelerator?: string | null;
			enabled?: MaybeEventStreamData<boolean | null>;
			action: number;
			icon?: string | null;
		}
		| {
			type: "Submenu";
			text: MaybeEventStreamData<string>;
			items: ContextMenuItem[];
			enabled?: MaybeEventStreamData<boolean | null>
		}) & {
			unlisteners?: UnlistenFn[]
		};

export type MenuItemParams = {
	text: string | Readable<string> | Accessor<string>;
	accelerator?: string | null;
	enabled?: boolean | null | Readable<boolean> | Accessor<boolean>;
	action: () => any;
	/**
	 * The icon path should be available in the tauri ressource dir
	 */
	icon?: string | null;
};

export type SubmenuParams = {
	text: string | Readable<string> | Accessor<string>;
	items: ContextMenuItem[];
	enabled?: boolean | null | Readable<boolean> | Accessor<boolean>;
};

export class ContextMenuItemProvider {
	public static seperator(): ContextMenuItem {
		return {
			type: "Seperator",
		};
	}
	public static menuItem(params: string | MenuItemParams): ContextMenuItem {
		if (typeof params == "string") {
			return {
				type: "MenuItem",
				text: params,
				action: transformCallback(() => { }, true),
			};
		} else {
			let unlisteners: UnlistenFn[] = [];

			let text: MaybeEventStreamData<string>;
			if (typeof params.text == "string") {
				text = params.text;
			} else {
				const webview = getCurrentWebview();
				const p_text = params.text;
				const eventName = v4();
				let t_store: Readable<string>;
				if (typeof p_text == "function") {
					t_store = internalToStore(p_text);
				} else {
					t_store = p_text;
				}
				unlisteners.push(t_store.subscribe((e) => {
					webview.emitTo({
						kind: "Webview",
						label: webview.label
					}, eventName, e);
				}));
				text = {
					eventName,
					initData: get(t_store)
				}
			}

			let enabled: MaybeEventStreamData<boolean | null> | undefined = undefined;
			if (typeof params.enabled == "boolean" || params.enabled == null) {
				enabled = params.enabled;
			} else {
				const webview = getCurrentWebview();
				const p_enable = params.enabled;
				const eventName = v4();
				let t_store: Readable<boolean>;
				if (typeof p_enable == "function") {
					t_store = internalToStore(p_enable);
				} else {
					t_store = p_enable;
				}
				unlisteners.push(t_store.subscribe((e) => {
					webview.emitTo({
						kind: "Webview",
						label: webview.label
					}, eventName, e);
				}));
				enabled = {
					eventName,
					initData: get(t_store)
				}
			}
			return {
				type: "MenuItem",
				text,
				action: transformCallback(params.action, true),
				unlisteners,
				enabled
			};
		}
	}
	public static subMenu(params: SubmenuParams): ContextMenuItem {
		let unlisteners: UnlistenFn[] = [];

		let text: MaybeEventStreamData<string>;
		if (typeof params.text == "string") {
			text = params.text;
		} else {
			const webview = getCurrentWebview();
			const p_text = params.text;
			const eventName = v4();
			let t_store: Readable<string>;
			if (typeof p_text == "function") {
				t_store = internalToStore(p_text);
			} else {
				t_store = p_text;
			}
			unlisteners.push(t_store.subscribe((e) => {
				webview.emitTo({
					kind: "Webview",
					label: webview.label
				}, eventName, e);
			}));
			text = {
				eventName,
				initData: get(t_store)
			}
		}

		let enabled: MaybeEventStreamData<boolean | null> | undefined = undefined;
		if (typeof params.enabled == "boolean" || params.enabled == null) {
			enabled = params.enabled;
		} else {
			const webview = getCurrentWebview();
			const p_enable = params.enabled;
			const eventName = v4();
			let t_store: Readable<boolean>;
			if (typeof p_enable == "function") {
				t_store = internalToStore(p_enable);
			} else {
				t_store = p_enable;
			}
			unlisteners.push(t_store.subscribe((e) => {
				webview.emitTo({
					kind: "Webview",
					label: webview.label
				}, eventName, e);
			}));
			enabled = {
				eventName,
				initData: get(t_store)
			}
		}
		return {
			type: "Submenu",
			text,
			items: params.items,
			unlisteners,
			enabled
		};
	}
}

export default async function contextMenu(
	items: ContextMenuItem[],
	position: LogicalPosition | PhysicalPosition | Position | MouseEvent
) {
	let unlisteners: UnlistenFn[] = [];
	function pushItemUnlisteners(item: ContextMenuItem) {
		if (item.unlisteners) {
			unlisteners.push(...item.unlisteners);
			item.unlisteners = undefined;
		}
		if (item.type == "Submenu") {
			item.items.forEach((i) => {
				pushItemUnlisteners(i)
			});
		}
	}
	items.forEach((item) => {
		pushItemUnlisteners(item);
	});
	let to_send_p: Position;
	if (position instanceof Position) {
		to_send_p = position;
	} else if (position instanceof MouseEvent) {
		to_send_p = new Position(new LogicalPosition(position.x, position.y));
	} else {
		to_send_p = new Position(position);
	}
	await invoke("context_menu", {
		items,
		position: to_send_p
	}).finally(() => {
		unlisteners.forEach((e) => e());
	});
}

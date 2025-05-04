import { LogicalPosition } from "@tauri-apps/api/dpi";
import { Menu } from "@tauri-apps/api/menu";
import { getCurrentWindow } from "@tauri-apps/api/window";
import type { EventHandler } from "svelte/elements";

type MouseEventMenuParam<T extends HTMLElement> = {
	menu: Menu | Promise<Menu>,
	preventDefault?: boolean,
	stopPropagation?: boolean,
	callback?: EventHandler<MouseEvent, T>
}

export default function mouseEventMenu<H extends HTMLElement = HTMLElement>(params: MouseEventMenuParam<H>): EventHandler<MouseEvent, H> {
	return async (e) => {
		const { menu: maybeMenu, preventDefault = true, stopPropagation = true, callback } = params;
		if (preventDefault) {
			e.preventDefault();
		}
		if (stopPropagation) {
			e.stopPropagation();
		}
		try {
			let menu: Menu;
			let shouldClose = false;
			if (maybeMenu instanceof Menu) {
				menu = maybeMenu;
			} else {
				menu = await maybeMenu;
				shouldClose = true;
			}
			try {
				await menu.popup(new LogicalPosition(e.x, e.y), getCurrentWindow());
			} finally {
				if (shouldClose) {
					await menu.close();
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			callback?.(e)
		}
	}
}
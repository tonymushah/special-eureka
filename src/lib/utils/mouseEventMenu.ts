import { LogicalPosition } from "@tauri-apps/api/dpi";
import { Menu } from "@tauri-apps/api/menu";
import { getCurrentWindow } from "@tauri-apps/api/window";
import type { EventHandler } from "svelte/elements";

type MouseEventMenuParam<T extends HTMLElement> = {
	menu: Menu | Promise<Menu>,
	preventDefault?: boolean,
	stopPropagation?: boolean,
	callback?: EventHandler<MouseEvent, T>,
	shouldClose?: boolean
}

export default function mouseEventMenu<H extends HTMLElement = HTMLElement>(params: MouseEventMenuParam<H>): EventHandler<MouseEvent, H> {
	return async (e) => {
		const { menu: maybeMenu, preventDefault = true, stopPropagation = true, callback, shouldClose } = params;
		if (preventDefault) {
			e.preventDefault();
		}
		if (stopPropagation) {
			e.stopPropagation();
		}
		try {
			let menu: Menu;
			if (maybeMenu instanceof Menu) {
				menu = maybeMenu;
			} else {
				menu = await maybeMenu;
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
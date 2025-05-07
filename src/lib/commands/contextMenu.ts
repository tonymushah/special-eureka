import { invoke, transformCallback } from "@tauri-apps/api/core";
import { LogicalPosition, Position, type PhysicalPosition } from "@tauri-apps/api/dpi";

export type ContextMenuItem =
	| {
			type: "Seperator";
	  }
	| {
			type: "MenuItem";
			text: string;
			accelerator?: string | null;
			enabled?: boolean | null;
			action: number;
			icon?: string | null;
	  }
	| {
			type: "Submenu";
			text: string;
			items: ContextMenuItem[];
	  };

export type MenuItemParams = {
	text: string;
	accelerator?: string | null;
	enabled?: boolean | null;
	action: () => any;
	/**
	 * The icon path should be available in the tauri ressource dir
	 */
	icon?: string | null;
};

export type SubmenuParams = {
	text: string;
	items: ContextMenuItem[];
};

export class ContextMenuItemProvider {
	public static seperator(): ContextMenuItem {
		return {
			type: "Seperator"
		};
	}
	public static menuItem(params: string | MenuItemParams): ContextMenuItem {
		if (typeof params == "string") {
			return {
				type: "MenuItem",
				text: params,
				action: transformCallback(() => {}, true)
			};
		} else {
			return {
				type: "MenuItem",
				...params,
				action: transformCallback(params.action, true)
			};
		}
	}
	public static subMenu(params: SubmenuParams): ContextMenuItem {
		return {
			type: "Submenu",
			...params
		};
	}
}

export default async function contextMenu(
	items: ContextMenuItem[],
	position: LogicalPosition | PhysicalPosition | Position | MouseEvent
) {
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
	});
}

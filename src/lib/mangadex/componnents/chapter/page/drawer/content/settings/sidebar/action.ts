import defaultBehavior, {
	floatSidebar,
	hideSidebar
} from "@mangadex/componnents/sidebar/states/actions";
import { writable, type Unsubscriber } from "svelte/store";

export enum SideBarActionType {
	Default,
	Floating,
	Hidden
}

export const sideBarActionType = writable(SideBarActionType.Default);

export function registerListeners() {
	const unsus: Unsubscriber[] = [];
	unsus.push(
		sideBarActionType.subscribe((action) => {
			switch (action) {
				case SideBarActionType.Default:
					defaultBehavior();
					break;
				case SideBarActionType.Floating:
					floatSidebar();
					break;
				case SideBarActionType.Hidden:
					hideSidebar();
					break;
				default:
					break;
			}
		})
	);
	return () => {
		unsus.forEach((unsus) => unsus());
	};
}

export function toggleAction() {
	sideBarActionType.update((action) => {
		switch (action) {
			case SideBarActionType.Default:
				return SideBarActionType.Floating;
			case SideBarActionType.Floating:
				return SideBarActionType.Hidden;
			default:
				return SideBarActionType.Default;
		}
	});
}

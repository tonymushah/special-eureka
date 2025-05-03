import defaultBehavior, {
	floatSidebar,
	hideSidebar
} from "@mangadex/componnents/sidebar/states/actions";
import { SidebarMode } from "@mangadex/gql/graphql";
import { sidebarModeStore } from "@mangadex/stores/chapterLayout";
import { type Unsubscriber } from "svelte/store";

export const sideBarActionType = sidebarModeStore;

export function registerListeners() {
	const unsus: Unsubscriber[] = [];
	unsus.push(
		sideBarActionType.subscribe((action) => {
			switch (action) {
				case SidebarMode.Default:
					defaultBehavior();
					break;
				case SidebarMode.Floating:
					floatSidebar();
					break;
				case SidebarMode.Hidden:
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
			case SidebarMode.Default:
				return SidebarMode.Floating;
			case SidebarMode.Floating:
				return SidebarMode.Hidden;
			default:
				return SidebarMode.Default;
		}
	});
}

import { isSidebarFloating } from "@mangadex/componnents/sidebar/states/isSidebarFloating";
import { showSidebar } from "@mangadex/componnents/sidebar/states/showSidebar";

export default function defaultBehavior() {
	isSidebarFloating.set(false);
	showSidebar.set(true);
}

export function floatSidebar() {
	isSidebarFloating.set(true);
}

export function hideSidebar() {
	showSidebar.set(false);
}

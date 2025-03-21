import type { MouseEventHandler } from "svelte/elements";
import { debounce } from "lodash";

const TOGGLE_SIDEBAR_KEY = "TOGGLE_SIDEBAR";
const debunc = debounce(async () => {
	const { isSidebarRtl } = await import("./componnents/sidebar/states/isRtl");
	isSidebarRtl.update((d) => !d);
});
const TOGGLE_SIDEBAR_HANDLER: MouseEventHandler<HTMLButtonElement> = () => {
	debunc();
};

export async function mangadexTitleBar() {
	const { defaultBehavior, titleBarButtons } = await import(
		"$lib/window-decoration/stores/decorations.svelte"
	);
	defaultBehavior();
	titleBarButtons.set(TOGGLE_SIDEBAR_KEY, {
		title: "Sidebar Direction",
		onclick: TOGGLE_SIDEBAR_HANDLER
	});
}

import { debounce } from "es-toolkit/compat";
import type { MouseEventHandler } from "svelte/elements";

const TOGGLE_SIDEBAR_KEY = "TOGGLE_SIDEBAR";
const debunc = debounce(async () => {
	const { isSidebarRtl } = await import("./componnents/sidebar/states/isRtl");
	isSidebarRtl.update((d) => !d);
});
const TOGGLE_SIDEBAR_HANDLER: MouseEventHandler<HTMLButtonElement> = () => {
	debunc();
};

export async function mangadexTitleBar() {
	const { defaultBehavior, titleBarButtons } =
		await import("$lib/core/window-decoration/stores/decorations.svelte");
	defaultBehavior();
	titleBarButtons.set(TOGGLE_SIDEBAR_KEY, {
		title: "Sidebar Direction",
		onclick: TOGGLE_SIDEBAR_HANDLER
	});
	/*
	const { logo, title } = await import("@special-eureka/core/window-decoration/WindowDecoration.svelte");
	logo.set(mangadexLogo);
	title.set("MangaDex | Special Eureka")
	*/
}
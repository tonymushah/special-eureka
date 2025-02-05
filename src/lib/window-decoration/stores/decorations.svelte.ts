import openNewWindow from "$lib/commands/openNewWindow";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import type { MouseEventHandler } from "svelte/elements";

export const HOME_KEY = "HOME";
export const NEW_WINDOW_KEY = "NEW_WINDOW";

export type TitleBarButton = {
	title: string;
	onclick: MouseEventHandler<HTMLButtonElement>;
};

export const HOME_BUTTON_HANDLER: MouseEventHandler<HTMLButtonElement> = async () => {
	const appWindow = getCurrentWebviewWindow();
	await appWindow.emitTo(
		{
			kind: "WebviewWindow",
			label: appWindow.label
		},
		"redirect",
		"/"
	);
};

export const NEW_WINDOW_HANDLER: MouseEventHandler<HTMLButtonElement> = async () => {
	await openNewWindow();
};

export const titleBarButtons = $state(new Map<string, TitleBarButton>());

export function defaultBehavior() {
	titleBarButtons.clear();
	titleBarButtons.set(HOME_KEY, {
		title: "Home",
		onclick: HOME_BUTTON_HANDLER
	});
	titleBarButtons.set(NEW_WINDOW_KEY, {
		title: "New Window",
		onclick: NEW_WINDOW_HANDLER
	});
}

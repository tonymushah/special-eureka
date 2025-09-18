import { getCurrentWindow, type Theme } from "@tauri-apps/api/window";
import { readable, type Readable, type Writable } from "svelte/store";

const tauriThemeRead: Readable<Theme> = readable("light" as Theme, (set) => {
	const sub = getCurrentWindow().onThemeChanged((theme) => {
		set(theme.payload);
	});
	return () => {
		sub.then((u) => u());
	};
});

const tauriTheme: Writable<Theme> = {
	subscribe: tauriThemeRead.subscribe,
	set(value) {
		getCurrentWindow().setTheme(value);
	},
	update(updater) {
		const currentWindow = getCurrentWindow();
		currentWindow
			.theme()
			.then((theme) => updater(theme ?? "light"))
			.then((theme) => {
				currentWindow.setTheme(theme);
			});
	}
};

export default tauriTheme;

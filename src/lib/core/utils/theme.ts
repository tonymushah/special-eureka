import { getCurrentWindow, type Theme } from "@tauri-apps/api/window";
import { readable, type Readable, type Writable } from "svelte/store";

const tauriThemeRead: Readable<Theme> = readable("dark" as Theme, (set) => {
	const currentWindow = getCurrentWindow();
	currentWindow
		.theme()
		.then((theme) => {
			set(theme ?? "dark");
		})
		.catch(console.error);
	const sub = currentWindow
		.listen("special-eureka://theme-change", () => {
			currentWindow
				.theme()
				.then((theme) => {
					set(theme ?? "dark");
				})
				.catch(console.error);
		})
		.catch(console.error);
	return () => {
		sub.then((u) => u?.());
	};
});

const tauriTheme: Writable<Theme> = {
	subscribe(run, invalidate) {
		return tauriThemeRead.subscribe(run, invalidate);
	},
	set(value) {
		const currentWindow = getCurrentWindow();
		currentWindow
			.setTheme(value)
			.then(() => {
				currentWindow.emitTo(
					{
						kind: "Window",
						label: currentWindow.label
					},
					"special-eureka://theme-change"
				);
			})
			.catch(console.error);
	},
	update(updater) {
		const currentWindow = getCurrentWindow();
		currentWindow
			.theme()
			.then((theme) => updater(theme ?? "light"))
			.then((theme) => {
				currentWindow.setTheme(theme);
			})
			.then(() => {
				currentWindow.emitTo(
					{
						kind: "Window",
						label: currentWindow.label
					},
					"special-eureka://theme-change"
				);
			})
			.catch(console.error);
	}
};

export default tauriTheme;

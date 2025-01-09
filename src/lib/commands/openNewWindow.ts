import { invoke } from "@tauri-apps/api/core";

export default async function openNewWindow(url?: string) {
	await invoke("open_new_window", {
		url
	});
}

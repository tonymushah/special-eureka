import { invoke } from "@tauri-apps/api/core";
import { readable } from "svelte/store";

export default async function isLinux(): Promise<boolean> {
	return await invoke<boolean>("is_linux")
}

export const isLinuxStore = readable(false, (set) => {
	isLinux().then(set);
})
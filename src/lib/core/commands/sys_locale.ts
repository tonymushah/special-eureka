import { invoke } from "@tauri-apps/api/core";
import { readable } from "svelte/store";

export default async function sysLocale(): Promise<string | null> {
	return await invoke<string | null>("sys_locale");
}

export const sysLocaleStore = readable<string | null>(null, (set) => {
	sysLocale().then(set);
});

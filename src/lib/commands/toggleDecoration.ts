import { invoke } from "@tauri-apps/api/core";

export default async function toggleDecoration(decoration?: boolean) {
	await invoke("toggle_decoration", { decoration });
}

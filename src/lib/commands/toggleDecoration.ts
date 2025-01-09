import { invoke } from "@tauri-apps/api/core";

export default async function toggleDecoration() {
	await invoke("toggle_decoration");
}

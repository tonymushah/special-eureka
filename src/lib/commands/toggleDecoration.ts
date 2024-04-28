import { invoke } from "@tauri-apps/api";

export default async function toggleDecoration() {
    await invoke("toggle_decoration");
}
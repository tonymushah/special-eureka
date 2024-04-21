import { invoke } from "@tauri-apps/api";

export default async function openNewWindow(url?: string) {
    await invoke("open_new_window", {
        url
    });
}
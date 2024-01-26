import { appWindow } from "@tauri-apps/api/window";

export async function sub_end(sub_id: string) {
    await appWindow.emit("sub_end", sub_id);
}
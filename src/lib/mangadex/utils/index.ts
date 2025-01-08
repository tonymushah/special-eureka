import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
const appWindow = getCurrentWebviewWindow()

export async function sub_end(sub_id: string) {
    /*const unlisten = await appWindow.once("sub_end", (e) => {
        console.debug(e);
    })
    try {*/
    await appWindow.emit("sub_end", sub_id);
    /*} finally {
        unlisten();
    }*/

}
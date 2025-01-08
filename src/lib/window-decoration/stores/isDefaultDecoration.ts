import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { writable, type Readable } from "svelte/store";
const appWindow = getCurrentWebviewWindow()

const isDefaultDecoration = writable(true, (set) => {
    appWindow.isDecorated().then(set);
    const unlisten = appWindow.listen<boolean>("decoration", () => {
        appWindow.isDecorated().then(set);
    })
    return () => {
        unlisten.then((u) => u());
    }
});

export async function setDecoration(isDecorated: boolean) {
    await appWindow.setDecorations(isDecorated);
    await appWindow.emit("decoration");
}

export default isDefaultDecoration satisfies Readable<boolean>;
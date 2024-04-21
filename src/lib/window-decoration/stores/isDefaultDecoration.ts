import { appWindow } from "@tauri-apps/api/window";
import { writable, type Readable } from "svelte/store";

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
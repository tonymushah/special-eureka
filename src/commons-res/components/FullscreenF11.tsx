import { globalShortcut } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";

export const FullScreenKey = "F11";

export const eventName = "special-eureka:\\F11-clicked";

export async function toggleFullscreen() {
    await appWindow.setFullscreen(!(await appWindow.isFullscreen()));
    await appWindow.emit(eventName);
}

async function unregisterF11ShortCut(){
    if(await globalShortcut.isRegistered(FullScreenKey)){
        await globalShortcut.unregister(FullScreenKey);
    }
}

async function initF11ShortCut() {
    await unregisterF11ShortCut();
    await globalShortcut.register(FullScreenKey, () => {
        toggleFullscreen().catch((e) => {
            console.error(e);
        });
    });
}

export default function FullscreenF11(){
    React.useEffect(() => {
        initF11ShortCut().catch((e) => {
            console.error(e);
        });
        return () => {
            unregisterF11ShortCut();
        };
    }, []);
    return (
        <React.Fragment/>
    );
}
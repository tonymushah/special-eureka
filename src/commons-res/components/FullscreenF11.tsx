import { globalShortcut } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";

export const FullScreenKey = "F11";

export async function toggleFullscreen() {
    await appWindow.setFullscreen(!(await appWindow.isFullscreen()));
}

async function initF11ShortCut() {
    if(await globalShortcut.isRegistered(FullScreenKey)){
        await globalShortcut.unregister(FullScreenKey);
    }
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
    }, []);
    return (
        <React.Fragment/>
    );
}
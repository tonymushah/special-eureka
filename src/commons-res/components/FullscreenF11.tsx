import { globalShortcut } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";

export const FullScreenKey = "F11";

export const eventName = "special-eureka://F11-clicked";

const unlisten = appWindow.listen<boolean | undefined>(eventName, async ({ payload }) => {
    if (payload == undefined) {
        await appWindow.setFullscreen(!(await appWindow.isFullscreen()));
    } else {
        await appWindow.setFullscreen(payload);
    }
});

appWindow.onCloseRequested(() => {
    unlisten.then((e) => e());
});

export async function toggleFullscreen(value?: boolean) {
    await appWindow.emit(eventName, value);
}

async function unregisterF11ShortCut() {
    if (await globalShortcut.isRegistered(FullScreenKey)) {
        await globalShortcut.unregister(FullScreenKey);
    }
}

async function initF11ShortCut() {
    await unregisterF11ShortCut();
    await globalShortcut.register(FullScreenKey, async () => {
        await toggleFullscreen();
    });
}

export default function FullscreenF11() {
    React.useEffect(() => {
        initF11ShortCut().catch((e) => {
            console.error(e);
        });
        return () => {
            unregisterF11ShortCut();
        };
    }, []);
    return (
        <React.Fragment />
    );
}
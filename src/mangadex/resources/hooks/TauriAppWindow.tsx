import { appWindow } from "@tauri-apps/api/window";
import React from "react";

export function useAppWindowTitle() {
    const [, setTitle_] = React.useTransition();
    return React.useCallback((title: string) => {
        setTitle_(() => {
            appWindow.setTitle(title);
        });
    }, []);
}
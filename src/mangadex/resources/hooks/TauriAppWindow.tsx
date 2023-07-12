import { appWindow } from "@tauri-apps/api/window";
import React from "react";

export function useAppWindowTitle() {
    const [, setTitle_] = React.useTransition();
    function fn(title: string) {
        setTitle_(() => {
            appWindow.setTitle(title);
        });
    }
    return fn;
}
import { appWindow } from "@tauri-apps/api/window";
import React from "react";

export function useAppWindowTitle(title : string){
    React.useEffect(() => {
        appWindow.setTitle(title);
    }, []);
}
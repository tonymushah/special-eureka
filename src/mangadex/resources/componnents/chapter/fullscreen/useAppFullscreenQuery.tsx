import { useQuery } from "@tanstack/react-query";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";

export function useAppFullscreenQuery() {
    // [x] Refactor into a function
    const queryKey_: readonly string[] =  React.useMemo(() => queryKey(), []);
    const query = useQuery(queryKey_, () => appWindow.isFullscreen());
    return {
        query,
        queryKey : queryKey_
    };
}

export function queryKey(): readonly string[] {
    return ["mdx", "is", "initially", "fullscreen"];
}


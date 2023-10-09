import { ColorModeProviderProps } from "@chakra-ui/system";
import { UnlistenFn } from "@tauri-apps/api/event";
import { Theme, appWindow } from "@tauri-apps/api/window";

let theme : Theme = "light";

appWindow.theme().then((t) => {
    if(t != null){
        theme = t;
    }
});

const storageKey = "chakra-ui-color-mode";

export let unlistenFn : UnlistenFn | undefined = undefined;

appWindow.onThemeChanged((t) => {
    theme = t.payload;
}).then((t) => {
    unlistenFn = t;
});

export const tauriColorModeManager : ColorModeProviderProps["colorModeManager"] = {
    type : "localStorage",
    set(colorModeManager){
        localStorage.setItem(storageKey, colorModeManager);
    },
    get(init) {
        const localStorage_theme = localStorage.getItem(storageKey) ?? (init ?? "system");
        switch (localStorage_theme) {
            case "system":
                return theme;
            case "light":
                return "light";
            case "dark":
                return "dark";
            default:
                return theme;
        }
    }
};

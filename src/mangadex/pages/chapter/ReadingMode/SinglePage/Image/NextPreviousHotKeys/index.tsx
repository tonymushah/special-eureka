import React from "react";
import { HotkeyCallback, useHotkeys } from "react-hotkeys-hook";

export default function NextPreviousHotKeys({onNext, onPrevious} : {
    onNext?: HotkeyCallback,
    onPrevious?: HotkeyCallback
}){
    useHotkeys("left", onPrevious ?? (() => {
        return;
    }));
    useHotkeys("right", onNext ?? (() => {
        return;
    }));
    return (
        <React.Fragment/>
    );
}
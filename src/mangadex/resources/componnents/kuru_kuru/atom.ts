import { atom } from "jotai";
import React from "react";

export const isActiveAtom = atom(false);

export let clickCount = 0;

export function setClickCount(value : number){
    clickCount = value;
}

export function useClickCount() : [number, typeof setClickCount]{
    const clickCount_ = React.useMemo<number>(() => {
        return clickCount;
    }, [clickCount]);
    const setClickCount_ = React.useCallback((value : number) => {
        setClickCount(value);
    }, []);
    return [clickCount_, setClickCount_];
}
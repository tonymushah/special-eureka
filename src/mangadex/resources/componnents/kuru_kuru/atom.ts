import { atom } from "jotai";
import React from "react";

export const isActiveAtom = atom(false);

export let clickCount = 0;

let listners: (() => void)[] = [];

function emit() {
    listners.forEach((listener) => listener());
}

export function setClickCount(value: number) {
    clickCount = value;
    emit();
}

function suscribe(onStoreChange: () => void): () => void {
    listners = [...listners, onStoreChange];
    return () => {
        listners = listners.filter((l) => l !== onStoreChange);
    };
}

function getSnapshot(): typeof clickCount {
    return clickCount;
}

export function useClickCount(): [number, typeof setClickCount] {
    const clickCount_ = React.useSyncExternalStore<number>(suscribe, getSnapshot);
    const setClickCount_ = React.useCallback((value: number) => {
        setClickCount(value);
    }, []);
    return [clickCount_, setClickCount_];
}
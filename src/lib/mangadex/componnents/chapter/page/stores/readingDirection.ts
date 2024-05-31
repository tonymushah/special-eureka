import { writable } from "svelte/store";

export enum ReadingDirection {
	Ltr,
	Rtl
}

export const readingDirection = writable(ReadingDirection.Ltr);

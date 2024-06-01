import { writable } from "svelte/store";

export type KeyBindings = {
	next: string;
	previous: string;
};

export const defaultChapterKeyBindings = {
	next: "ArrowRight",
	previous: "ArrowLeft"
};

export const chapterKeyBindingsStore = writable(defaultChapterKeyBindings);

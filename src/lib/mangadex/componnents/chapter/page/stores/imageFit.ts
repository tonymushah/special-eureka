import { writable } from "svelte/store";

export enum ImageFit {
	Width,
	Height,
	None
}

export const imageFitStore = writable(ImageFit.None);

import type { MouseEventHandler } from "svelte/elements"

export type OnReadingModeContextMenu = (e: Parameters<MouseEventHandler<Element>>["0"] & {
	pageNumber: number
}) => any;

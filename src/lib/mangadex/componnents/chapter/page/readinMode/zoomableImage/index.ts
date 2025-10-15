import type { MouseEventHandler } from "svelte/elements"

export type OnContextMenu = (e: Parameters<MouseEventHandler<Element>>["0"] & {
	source?: "left" | "right"
}) => any;

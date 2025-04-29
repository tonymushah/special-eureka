import type { Component } from "svelte";

export type Item = {
	icon: Component;
	label: string;
	onClick?: (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) => any;
	disabled?: undefined;
};

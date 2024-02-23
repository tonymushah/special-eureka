import type { ComponentType } from "svelte";

export type Item = {
	icon: ComponentType;
	label: string;
	onClick?: (
		e: CustomEvent<
			MouseEvent & {
				currentTarget: EventTarget & HTMLDivElement;
			}
		>
	) => Promise<void> | void;
};

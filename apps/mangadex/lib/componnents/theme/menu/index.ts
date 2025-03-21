import type { ComponentType } from "svelte";

export type MenuItem<T> = {
	label: string;
	key: T;
	icon?: ComponentType;
};

import type { Component } from "svelte";

export type MenuItem<T> = {
	label: string;
	key: T;
	icon?: Component;
};

// place files you want to import through the `$lib` alias in this folder.

import type { Getter } from "runed";
import type { Readable } from "svelte/store";

export type StoreOrVal<T> = T | Readable<T>;

export interface ReadonlyValue<T> {
	readonly value: T;
}

export function createReadonlyValue<T>(val_getter: Getter<T>): ReadonlyValue<T> {
	return {
		get value() {
			return val_getter();
		}
	};
}

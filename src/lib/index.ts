// place files you want to import through the `$lib` alias in this folder.

import type { Getter, MaybeGetter } from "runed";
import type { Readable } from "svelte/store";

export type StoreOrVal<T> = T | Readable<T>;

export interface ReadonlyValue<T> {
	readonly value: T;
}

export interface WritableValue<T> {
	value: T;
}

export function createReadonlyValue<T>(val_getter: Getter<T>): ReadonlyValue<T> {
	return {
		get value() {
			return val_getter();
		}
	};
}

export function get_value_from_maybe_getter<
	T extends object | string | number | undefined | boolean | symbol
>(maybe_getter: MaybeGetter<T>): T {
	if (typeof maybe_getter == "function") {
		return maybe_getter();
	} else {
		return maybe_getter;
	}
}

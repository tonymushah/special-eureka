import type { Accessor } from "@tanstack/svelte-query";
import { readable, type Readable } from "svelte/store";

export function root_effect(effect: () => void | VoidFunction): VoidFunction {
	return $effect.root(effect)
}

type ExtractedAccessor<T> = {
	value: T;
	[Symbol.dispose]: VoidFunction;
};

/**
 * Wrap the accessor in a `$effect.root()`.
 * The extracted value can be disposed safety with `Symbol.dispose`
 * @param access Accessor<T>
 * @returns ExtractedAccessor<T>
 * 
 */
export function extractFromAccessor<T>(access: Accessor<T>): ExtractedAccessor<T> {
	let val: T;
	const d = $effect.root(() => {
		val = $derived(access());
	})
	return {
		get value() {
			return val;
		},
		[Symbol.dispose]() {
			d();
		}
	};
}

export function internalToStore<T>(accessor: Accessor<T>): Readable<T> {
	using value = extractFromAccessor(accessor);
	return readable<T>(value.value, (set) => {
		return $effect.root(() => {
			const val = accessor();
			$effect.pre(() => {
				set(val);
			})
		});
	});
}
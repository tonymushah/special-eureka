import type { Accessor } from "@tanstack/svelte-query";
import { readable, type Readable } from "svelte/store";
import { useExtractedAccessor, type ExtractedAccessor } from "./core/utils/extractedAccessor";

export function root_effect(effect: () => void | VoidFunction): VoidFunction {
	return $effect.root(effect)
}

export function extractFromAccessor<T>(_access: Accessor<T>): ExtractedAccessor<T> {
	let val: T;
	const d = $effect.root(() => {
		val = _access();
	});
	const to_ret = {
		get value() {
			return val;
		},
		[Symbol.dispose]() {
			d();
		}
	};
	//console.debug(to_ret);
	return to_ret;
}

export function internalToStore<T>(accessor: Accessor<T>): Readable<T> {
	const inner = extractFromAccessor(accessor);
	return useExtractedAccessor(inner, (value) => readable<T>(value, (set) => {
		return $effect.root(() => {
			let val = $derived(accessor());
			$effect(() => {
				set(val);
			})
		});
	}));
}
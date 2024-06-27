import { getContext, setContext } from "svelte";
import { readonly, type Writable } from "svelte/store";

export * from "./theme";

export function generateContextMethods<T>(key: string, customErrorMessage?: string) {
	return {
		init(value: T) {
			return setContext<T>(key, value);
		},
		get(defaultValue?: T) {
			const data = getContext<T | undefined>(key);
			if (data != undefined) {
				return data;
			} else if (defaultValue != undefined) {
				return defaultValue;
			} else {
				throw new Error(customErrorMessage ?? `The context ${key} should be defined`);
			}
		}
	};
}

export function generateContextMethodsIgnoreUndefined<T>(key: string, customErrorMessage?: string) {
	return {
		init(value: T) {
			return setContext<T>(key, value);
		},
		get() {
			const data = getContext<T>(key);
			return data;
		}
	};
}

export function generateContextStoresMethods<T>(key: string, customErrorMessage?: string) {
	const { init, get } = generateContextMethods<Writable<T>>(key, customErrorMessage);
	return {
		init,
		get,
		getReadonly() {
			return readonly(get());
		}
	};
}

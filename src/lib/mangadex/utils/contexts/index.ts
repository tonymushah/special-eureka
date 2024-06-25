import { getContext, setContext } from "svelte";

export * from "./theme";

export function generateContextMethods<T>(key: string, customErrorMessage?: string) {
	return {
		init(value: T) {
			return setContext<T>(key, value);
		},
		get() {
			const data = getContext<T | undefined>(key);
			if (data != undefined) {
				return data;
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

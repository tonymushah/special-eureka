export type ExtractedAccessor<T> = {
	value: T;
	[Symbol.dispose]: VoidFunction;
};

export function useExtractedAccessor<T, R>(extracted: ExtractedAccessor<T>, runFn: (value: T) => R): R {
	using inner = extracted;
	return runFn(inner.value);
}

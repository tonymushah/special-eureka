import type { MangadexTheme } from "@mangadex/theme";
import { getContext, setContext } from "svelte";
import { readonly, type Readable, type Writable } from "svelte/store";

const key = "mangadex-theme";

export function getMangaDexThemeContext(): Readable<MangadexTheme> {
	const d = getContext<Writable<MangadexTheme> | undefined>(key);
	if (d == undefined) {
		throw new Error(`${key} context is undefined`);
	}
	return readonly(d);
}

export function setMangaDexThemeContextWritable(
	theme: Writable<MangadexTheme>
): Writable<MangadexTheme> {
	const d = setContext(key, theme);
	return d;
}

export function getMangaDexThemeContextWritable(): Writable<MangadexTheme> {
	return getContext(key);
}

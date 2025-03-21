import type { MangadexTheme } from "@mangadex/theme";
import { getContext, setContext } from "svelte";
import { readonly, type Readable, type Writable } from "svelte/store";

const key = "mangadex-theme";

export function getMangaDexThemeContext(): Readable<MangadexTheme> {
	return readonly(getContext(key));
}

export function setMangaDexThemeContextWritable(
	theme: Writable<MangadexTheme>
): Writable<MangadexTheme> {
	return setContext(key, theme);
}

export function getMangaDexThemeContextWritable(): Writable<MangadexTheme> {
	return getContext(key);
}

import type { MangadexTheme } from "@mangadex/theme";
import { getContext, setContext } from "svelte";
import type { Readable, Writable } from "svelte/store";

const key = "mangadex-theme";

export function setMangaDexThemeContext(theme: Readable<MangadexTheme>): Readable<MangadexTheme> {
	return setContext(key, theme);
}

export function getMangaDexThemeContext(): Readable<MangadexTheme> {
	return getContext(key);
}

export function setMangaDexThemeContextWritable(
	theme: Writable<MangadexTheme>
): Writable<MangadexTheme> {
	return setContext(key, theme);
}

export function getMangaDexThemeContextWritable(): Writable<MangadexTheme> {
	return getContext(key);
}

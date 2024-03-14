import type { MangadexTheme } from "@mangadex/theme";
import { getContext, setContext } from "svelte";

const key = "mangadex-theme";

export function setMangaDexThemeContext(theme: MangadexTheme): MangadexTheme {
	return setContext(key, theme);
}

export function getMangaDexThemeContext(): MangadexTheme {
	return getContext(key);
}

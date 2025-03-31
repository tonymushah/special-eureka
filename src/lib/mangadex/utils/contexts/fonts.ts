import { getContext, setContext } from "svelte";
import type { Readable, Writable } from "svelte/store";

const key = "mangadex-fonts";

export function setMangaDexFontsContext(theme: Readable<string>): Readable<string> {
    return setContext(key, theme);
}

export function getMangaDexFontsContext(): Readable<string> {
    return getContext(key);
}

export function setMangaDexThemeFontsWritable(
    theme: Writable<string>
): Writable<string> {
    return setContext(key, theme);
}

export function getMangaDexThemeFontsWritable(): Writable<string> {
    return getContext(key);
}

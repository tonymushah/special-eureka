import { getContext, setContext } from "svelte";
import type { Readable } from "svelte/store";

const key = "top-manga-is-following";

type IsFollowingTopManga = Readable<boolean | undefined>;

export function setTopMangaIsFollowingContextStore(cover: IsFollowingTopManga) {
	return setContext<IsFollowingTopManga>(key, cover);
}

export function getTopMangaIsFollowingContextStore() {
	const coverContext = getContext<IsFollowingTopManga | undefined>(key);
	if (coverContext) {
		return coverContext;
	} else {
		throw new Error(`\`${key}\` is not declared`);
	}
}

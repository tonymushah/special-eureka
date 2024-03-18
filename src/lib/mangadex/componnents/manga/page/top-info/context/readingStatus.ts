import type { ReadingStatus } from "@mangadex/gql/graphql";
import { getContext, setContext } from "svelte";
import type { Writable } from "svelte/store";

const key = "top-manga-reading-status";

type TopMangaReadingStatus = Writable<ReadingStatus | undefined>;

export function setTopMangaReadingStatusContextStore(cover: TopMangaReadingStatus) {
	return setContext<TopMangaReadingStatus>(key, cover);
}

export function getTopMangaReadingStatusContextStore() {
	const coverContext = getContext<TopMangaReadingStatus | undefined>(key);
	if (coverContext) {
		return coverContext;
	} else {
		throw new Error(`\`${key}\` is not declared`);
	}
}

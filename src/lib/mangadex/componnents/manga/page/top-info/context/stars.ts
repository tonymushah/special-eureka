import { getContext, setContext } from "svelte";
import type { Readable } from "svelte/store";

const key = "top-manga-rating";

type RatingTopManga = Readable<boolean | undefined>;

export function setTopMangaRatingContextStore(rating: RatingTopManga) {
	return setContext<RatingTopManga>(key, rating);
}

export function getTopMangaRatingContextStore() {
	return getContext<RatingTopManga | undefined>(key);
}

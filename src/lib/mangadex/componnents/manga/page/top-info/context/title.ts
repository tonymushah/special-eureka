import { getContext, setContext } from "svelte";

const key = "top-manga-title";

type TopMangaTitle = string;

export function setTopMangaTitleContextStore(cover: TopMangaTitle) {
	return setContext<TopMangaTitle>(key, cover);
}

export function getTopMangaTitleContextStore() {
	return getContext<TopMangaTitle | undefined>(key);
}

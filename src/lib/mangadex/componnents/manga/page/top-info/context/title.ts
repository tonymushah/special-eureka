import { getContext, setContext } from "svelte";

const key = "top-manga-title";

type TopMangaTitle = string;

export function setTopMangaTitleContextStore(title: TopMangaTitle) {
	return setContext<TopMangaTitle>(key, title);
}

export function getTopMangaTitleContextStore() {
	return getContext<TopMangaTitle | undefined>(key);
}

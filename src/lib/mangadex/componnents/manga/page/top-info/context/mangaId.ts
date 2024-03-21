import { getContext, setContext } from "svelte";

const key = "top-info-manga-id";

type TopInfoMangaId = string;

export function setTopMangaIdContextStore(mangaId: TopInfoMangaId) {
	return setContext<TopInfoMangaId>(key, mangaId);
}

export function getTopMangaIdContextStore() {
	const mangaId = getContext<TopInfoMangaId | undefined>(key);
	if (mangaId) {
		return mangaId;
	} else {
		throw new Error(`\`${key}\` is not declared`);
	}
}

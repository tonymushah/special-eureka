import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
	get: getMangaSearchYearContextStoreWritable,
	init: initMangaSearchYearContextStore,
	getReadonly: getMangaSearchYearContextStore
} = generateContextStoresMethods<number | null>("MANGA_SEARCH_YEAR");

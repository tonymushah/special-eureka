import type { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
import { getContext, setContext } from "svelte";
import type { Readable } from "svelte/store";

const key = "top-manga-download-state";

type DownloadStateTopManga = Readable<ChapterDownloadState>;

export function setTopMangaDownloadContextStore(state: DownloadStateTopManga) {
	return setContext<DownloadStateTopManga>(key, state);
}

export function getTopMangaDownloadContextStore() {
	const context = getContext<DownloadStateTopManga | undefined>(key);
	if (context) {
		return context;
	} else {
		throw new Error(`\`${key}\` is not declared`);
	}
}

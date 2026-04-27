import type { ReadonlyValue } from "$lib";
import type { MangaDownloadState } from "@mangadex/download/manga.svelte";
import { Context } from "runed";

const key = "top-manga-download-state";

const ctx = new Context<ReadonlyValue<MangaDownloadState>>(key);

export function setTopMangaDownloadContextStore(state: () => MangaDownloadState) {
	return ctx.set({
		get value() {
			return state();
		}
	});
}

export function getTopMangaDownloadContextStore() {
	return ctx.get();
}

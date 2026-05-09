import type { InputMaybe } from "$lib";
import { createReadonlyValue, type ReadonlyValue } from "$lib";
import type { MangaDownloadState } from "@mangadex/download/manga.svelte";
import { Context } from "runed";

const key = "top-manga-download-state";

const ctx = new Context<ReadonlyValue<InputMaybe<MangaDownloadState>>>(key);

export function setTopMangaDownloadContextStore(state: () => InputMaybe<MangaDownloadState>) {
	return ctx.set(createReadonlyValue(state));
}

export function getTopMangaDownloadContextStore() {
	return ctx.get();
}
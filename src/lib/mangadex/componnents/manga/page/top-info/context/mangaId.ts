import type { ReadonlyValue } from "$lib";
import { Context } from "runed";

const key = "top-info-manga-id";

type TopInfoMangaId = string;

const ctt = new Context<ReadonlyValue<string>>(key);

export function setTopMangaIdContextStore(mangaId: () => TopInfoMangaId) {
	return ctt.set({
		get value() {
			return mangaId();
		}
	});
}

export function getTopMangaIdContextStore() {
	return ctt.get();
}

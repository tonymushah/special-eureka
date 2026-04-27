import { createReadonlyValue, type ReadonlyValue } from "$lib";
import { Context, type Getter } from "runed";

const key = "top-info-manga-id";

type TopInfoMangaId = string;

const ctt = new Context<ReadonlyValue<string>>(key);

export function setTopMangaIdContextStore(mangaId: Getter<TopInfoMangaId>) {
	return ctt.set(createReadonlyValue(mangaId));
}

export function getTopMangaIdContextStore() {
	return ctt.get();
}

import { createReadonlyValue, type ReadonlyValue } from "$lib";
import type { InputMaybe, ReadingStatus } from "@mangadex/gql/graphql";
import { Context, type Getter } from "runed";

const key = "top-manga-reading-status";

type TopMangaReadingStatus = InputMaybe<ReadingStatus>;

const ctx = new Context<ReadonlyValue<TopMangaReadingStatus>>(key);

export function setTopMangaReadingStatusContextStore(cover: Getter<TopMangaReadingStatus>) {
	return ctx.set(createReadonlyValue(cover));
}

export function getTopMangaReadingStatusContextStore() {
	return ctx.get();
}

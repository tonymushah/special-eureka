import { createReadonlyValue, type ReadonlyValue } from "$lib";
import type { InputMaybe } from "@mangadex/gql/graphql";
import { Context, type Getter } from "runed";

const key = "top-manga-rating";

type RatingTopManga = InputMaybe<number | undefined>;

const ctx = new Context<ReadonlyValue<RatingTopManga>>(key);

export function setTopMangaRatingContextStore(rating: Getter<RatingTopManga>) {
	return ctx.set(createReadonlyValue(rating));
}

export function getTopMangaRatingContextStore() {
	return ctx.get();
}

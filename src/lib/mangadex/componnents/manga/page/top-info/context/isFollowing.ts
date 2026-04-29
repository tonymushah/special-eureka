import { createReadonlyValue, type ReadonlyValue } from "$lib";
import type { InputMaybe } from "@mangadex/gql/graphql";
import { Context, type Getter } from "runed";

const key = "top-manga-is-following";

type IsFollowingTopManga = InputMaybe<boolean | undefined>;

const ctx = new Context<ReadonlyValue<IsFollowingTopManga>>(key);

export function setTopMangaIsFollowingContextStore(is_following: Getter<IsFollowingTopManga>) {
	return ctx.set(createReadonlyValue(is_following));
}

export function getTopMangaIsFollowingContextStore() {
	return ctx.get();
}

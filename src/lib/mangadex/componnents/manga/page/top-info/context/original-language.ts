import { createReadonlyValue, type ReadonlyValue } from "$lib";
import type { Language } from "@mangadex/gql/graphql";
import { Context, type Getter } from "runed";

const key = "top-info-original-language";

const ctx = new Context<ReadonlyValue<Language>>(key);

export function setTopMangaOriginalLanguageContextStore(originalLanguage: Getter<Language>) {
	return ctx.set(createReadonlyValue(originalLanguage));
}

export function getTopMangaOriginalLanguageContextStore() {
	return ctx.get();
}

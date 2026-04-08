import type { Language } from "@mangadex/gql/graphql";
import { getContext, setContext } from "svelte";

const key = "top-info-original-language";

export function setTopMangaOriginalLanguageContextStore(originalLanguage: Language) {
	return setContext<Language>(key, originalLanguage);
}

export function getTopMangaOriginalLanguageContextStore() {
	const originalLanguage = getContext<Language | undefined>(key);
	if (originalLanguage) {
		return originalLanguage;
	} else {
		throw new Error(`\`${key}\` is not declared`);
	}
}

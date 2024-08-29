import type { Language } from "@mangadex/gql/graphql"
import { generateContextStoresMethods } from "@mangadex/utils/contexts"
import { derived, get, type Writable } from "svelte/store"

type MangaSearchLanguages = {
    originalLanguage: Language[],
    excludedOriginalLanguage: Language[],
    availableTranslatedLanguage: Language[]
}

export function defaultMangaSearchLanguages(): MangaSearchLanguages {
    return {
        originalLanguage: [],
        excludedOriginalLanguage: [],
        availableTranslatedLanguage: []
    }
}

export const {
    init: initMangaSearchLanguagesContextStore,
    get: getMangaSearchLanguagesContextWritableStore,
    getReadonly: getMangaSearchLanguagesContextStore
} = generateContextStoresMethods<MangaSearchLanguages>("MANGA_SEARCH_LANGUAGES");

export function getMangaSearchOriginalLanguageContextWritableStore(): Writable<Language[]> {
    const context = getMangaSearchLanguagesContextWritableStore();
    const context_derived = derived(context, ($c) => $c.originalLanguage);
    return {
        subscribe(run, invalidate) {
            return context_derived.subscribe(run, invalidate);
        },
        set(value) {
            const contextData = get(context);
            contextData.originalLanguage = value;
            context.set(contextData)
        },
        update(updater) {
            const contextData = get(context);
            contextData.originalLanguage = updater(contextData.originalLanguage);
            context.set(contextData)
        },
    }
}

export function getMangaSearchExcludedOriginalLanguageContextWritableStore(): Writable<Language[]> {
    const context = getMangaSearchLanguagesContextWritableStore();
    const context_derived = derived(context, ($c) => $c.excludedOriginalLanguage);
    return {
        subscribe(run, invalidate) {
            return context_derived.subscribe(run, invalidate);
        },
        set(value) {
            const contextData = get(context);
            contextData.excludedOriginalLanguage = value;
            context.set(contextData)
        },
        update(updater) {
            const contextData = get(context);
            contextData.excludedOriginalLanguage = updater(contextData.excludedOriginalLanguage);
            context.set(contextData)
        },
    }
}

export function getMangaSearchAvailableTranslatedLanguageContextWritableStore(): Writable<Language[]> {
    const context = getMangaSearchLanguagesContextWritableStore();
    const context_derived = derived(context, ($c) => $c.availableTranslatedLanguage);
    return {
        subscribe(run, invalidate) {
            return context_derived.subscribe(run, invalidate);
        },
        set(value) {
            const contextData = get(context);
            contextData.availableTranslatedLanguage = value;
            context.set(contextData)
        },
        update(updater) {
            const contextData = get(context);
            contextData.availableTranslatedLanguage = updater(contextData.availableTranslatedLanguage);
            context.set(contextData)
        },
    }
}
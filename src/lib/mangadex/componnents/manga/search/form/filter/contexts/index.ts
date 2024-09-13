import type { ContentRating, Demographic, MangaStatus } from "@mangadex/gql/graphql"
import { defaultMangaSearchLanguages, initMangaSearchLanguagesContextStore, type MangaSearchLanguages } from "./languages"
import { initMangaSearchTagOptionsContextStore, type TagOptions } from "./tags"
import { generateContextStoresMethods } from "@mangadex/utils/contexts"
import { derived, get, type Writable } from "svelte/store"
import { initMangaSearchContentRatingContextStore } from "./contentRating"
import { initMangaSearchPublicationDemographicContextStore } from "./publicationDemographic"
import { initMangaSearchPublicationStatusContextStore } from "./publicationStatus"
import { initMangaSearchYearContextStore } from "./year"
import { defaultTagModes, initMangaSearchTagModeContext, type TagModes } from "./tagModes"
import { defaultAuthorArtistOptions, initMangaSearchAuthorArtistsOptions, type AuthorArtistOptions } from "./authorArtist"

export type MangaSearchFilterParams = {
    contentRating: ContentRating[],
    languages: MangaSearchLanguages,
    demographic: Demographic[],
    status: MangaStatus[],
    tags: TagOptions,
    year: number | null,
    tagModes: TagModes,
    authorArtists: AuthorArtistOptions
}

export function defaultMangaFilterParams(): MangaSearchFilterParams {
    return {
        contentRating: [],
        languages: defaultMangaSearchLanguages(),
        demographic: [],
        status: [],
        tags: new Map(),
        year: null,
        tagModes: defaultTagModes(),
        authorArtists: defaultAuthorArtistOptions()
    }
}

export const {
    get: getMangaSearchOptionContextWritable,
    init: initMangaSearchOptionContext,
    getReadonly: getMangaSearchOptionContext
} = generateContextStoresMethods<MangaSearchFilterParams>("MANGA_SEARCH_OPTION")

export function init(init_: Writable<MangaSearchFilterParams>) {
    const store = initMangaSearchOptionContext(init_);
    const contentRating = (() => {
        const derived_ = derived(store, ($s) => $s.contentRating)
        return initMangaSearchContentRatingContextStore({
            subscribe(run, invalidate) {
                return derived_.subscribe(run, invalidate)
            },
            set(value) {
                const context = get(store);
                context.contentRating = value;
                store.set(context)
            },
            update(updater) {
                const context = get(store);
                context.contentRating = updater(context.contentRating);
                store.set(context)
            },
        })
    })();
    const languages = (() => {
        const derived_ = derived(store, ($s) => $s.languages)
        return initMangaSearchLanguagesContextStore({
            subscribe(run, invalidate) {
                return derived_.subscribe(run, invalidate)
            },
            set(value) {
                const context = get(store);
                context.languages = value;
                store.set(context)
            },
            update(updater) {
                const context = get(store);
                context.languages = updater(context.languages);
                store.set(context)
            },
        })
    })();
    const demographic = (() => {
        const derived_ = derived(store, ($s) => $s.demographic)
        return initMangaSearchPublicationDemographicContextStore({
            subscribe(run, invalidate) {
                return derived_.subscribe(run, invalidate)
            },
            set(value) {
                const context = get(store);
                context.demographic = value;
                store.set(context)
            },
            update(updater) {
                const context = get(store);
                context.demographic = updater(context.demographic);
                store.set(context)
            },
        })
    })();
    const status = (() => {
        const derived_ = derived(store, ($s) => $s.status)
        return initMangaSearchPublicationStatusContextStore({
            subscribe(run, invalidate) {
                return derived_.subscribe(run, invalidate)
            },
            set(value) {
                const context = get(store);
                context.status = value;
                store.set(context)
            },
            update(updater) {
                const context = get(store);
                context.status = updater(context.status);
                store.set(context)
            },
        })
    })();
    const tags = (() => {
        const derived_ = derived(store, ($s) => $s.tags)
        return initMangaSearchTagOptionsContextStore({
            subscribe(run, invalidate) {
                return derived_.subscribe(run, invalidate)
            },
            set(value) {
                const context = get(store);
                context.tags = value;
                store.set(context)
            },
            update(updater) {
                const context = get(store);
                context.tags = updater(context.tags);
                store.set(context)
            },
        })
    })();
    const year = (() => {
        const derived_ = derived(store, ($s) => $s.year)
        return initMangaSearchYearContextStore({
            subscribe(run, invalidate) {
                return derived_.subscribe(run, invalidate)
            },
            set(value) {
                const re_value = Number(value);
                const context = get(store);
                if (isFinite(re_value)) {
                    context.year = value;
                } else {
                    context.year = null
                }

                store.set(context)
            },
            update(updater) {
                const context = get(store);
                context.year = (() => {
                    const uo = Number(updater(context.year));
                    if (isFinite(uo)) {
                        return uo
                    } else {
                        return null
                    }
                })();
                store.set(context)
            },
        })
    })();
    const tagModes = (() => {
        const derived_ = derived(store, ($s) => $s.tagModes)
        return initMangaSearchTagModeContext({
            subscribe(run, invalidate) {
                return derived_.subscribe(run, invalidate);
            },
            set(value) {
                init_.update((v) => {
                    v.tagModes = value;
                    return v;
                })
            },
            update(updater) {
                init_.update((v) => {
                    v.tagModes = updater(v.tagModes);
                    return v;
                })
            },
        })
    })();
    const authorArtists = (() => {
        const derived_ = derived(store, ($s) => $s.authorArtists);
        return initMangaSearchAuthorArtistsOptions({
            subscribe(run, invalidate) {
                return derived_.subscribe(run, invalidate);
            },
            set(value) {
                init_.update((v) => {
                    v.authorArtists = value;
                    return v;
                })
            },
            update(updater) {
                init_.update((v) => {
                    v.authorArtists = updater(v.authorArtists);
                    return v;
                })
            },
        })
    })()
    return {
        contentRating,
        languages,
        demographic,
        status,
        tags,
        year,
        store,
        tagModes,
        authorArtists
    }
}
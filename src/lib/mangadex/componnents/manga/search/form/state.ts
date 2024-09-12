import type { MangaListParams } from "@mangadex/gql/graphql"
import { defaultMangaFilterParams, type MangaSearchFilterParams } from "./filter/contexts"
import { TagOptionState } from "./filter/contexts/tags"

export type MangaSearchParams = {
    title: string | undefined,
    filter: MangaSearchFilterParams,
    offlineOnly: boolean
}

export default function defaultMangaSearchParams(): MangaSearchParams {
    return {
        title: undefined,
        filter: defaultMangaFilterParams(),
        offlineOnly: false
    }
}

export function toMangaListParams(params: MangaSearchParams): MangaListParams {
    const tags = Array.from(params.filter.tags.entries())
    return {
        artists: params.filter.authorArtists.artists.map((a) => a.id),
        authors: params.filter.authorArtists.authors.map((a) => a.id),
        availableTranslatedLanguage: params.filter.languages.availableTranslatedLanguage,
        contentRating: params.filter.contentRating,
        excludedOriginalLanguage: params.filter.languages.excludedOriginalLanguage,
        excludedTagsMode: params.filter.tagModes.exclude,
        includedTagsMode: params.filter.tagModes.include,
        publicationDemographic: params.filter.demographic,
        status: params.filter.status,
        year: params.filter.year,
        includedTags: tags.filter(([, data]) => {
            return data.state != TagOptionState.INCLUDE
        }).map(([id]) => id),
        title: params.title,
        excludedTags: tags.filter(([, data]) => {
            return data.state != TagOptionState.EXCLUDE
        }).map(([id]) => id),
        originalLanguage: params.filter.languages.originalLanguage,
    }
}
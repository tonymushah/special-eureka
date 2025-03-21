import type { ContentRating } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
    getReadonly: getMangaSearchContentRatingContextStore,
    init: initMangaSearchContentRatingContextStore,
    get: getMangaSearchContentRatingContextStoreWritable
} = generateContextStoresMethods<ContentRating[]>("MANGA_SEARCH_CONTENT_RATING")
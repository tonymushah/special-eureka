import type { Demographic } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
    getReadonly: getMangaSearchPublicationDemographicContextStore,
    init: initMangaSearchPublicationDemographicContextStore,
    get: getMangaSearchPublicationDemographicContextStoreWritable
} = generateContextStoresMethods<Demographic[]>("MANGA_SEARCH_PUBLICATION_DEMOGRAPHIC")
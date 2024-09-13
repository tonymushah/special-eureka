import type { MangaStatus } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
    getReadonly: getMangaSearchPublicationStatusContextStore,
    init: initMangaSearchPublicationStatusContextStore,
    get: getMangaSearchPublicationStatusContextStoreWritable
} = generateContextStoresMethods<MangaStatus[]>("MANGA_SEARCH_PUBLICATION_STATUS")
import type { MangaListStyle } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
    getReadonly: getMangaListStyleContext,
    get: getMangaListStyleContextWritable,
    init: initMangaListStyleContext
} = generateContextStoresMethods<MangaListStyle>("MANGA_LIST_STYLE");

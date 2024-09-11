import { defaultMangaFilterParams, type MangaSearchFilterParams } from "./filter/contexts"

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

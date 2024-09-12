import type { MangaListContentItemProps } from "@mangadex/componnents/manga/list/MangaListContent.svelte";
import { CoverImageQuality, type MangaListParams, type OfflineMangaSearchQueryQuery } from "@mangadex/gql/graphql";
import type { Client } from "@urql/svelte";
import { defaultQuery, offlineQuery } from "./query";
import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";

export interface IMangaSearchResult {
    data: MangaListContentItemProps[],
    hasNext(): boolean;
    next(): Promise<IMangaSearchResult>;
}

type MangaSearchResultConstuctorParams = {
    data: MangaListContentItemProps[];
    client: Client;
    params: MangaListParams;
    offline?: boolean;
    offset: number,
    limit: number,
    total: number
};

export class MangaSearchResult implements IMangaSearchResult {
    client: Client;
    params: MangaListParams;
    offline: boolean;
    offset: number;
    limit: number;
    total: number;
    data: MangaListContentItemProps[];
    constructor({ data, client, params, offline = false, offset, limit, total }: MangaSearchResultConstuctorParams) {
        this.client = client;
        this.params = params;
        this.offline = offline;
        this.data = data;
        this.limit = limit;
        this.offset = offset;
        this.total = total
    }
    hasNext(): boolean {
        return this.offset < this.total && this.offset >= 0;
    }
    next(): Promise<IMangaSearchResult> {
        return executeSearchQuery(this.client, {
            ...this.params,
            offset: this.offset + this.limit,
            limit: this.limit
        }, this.offline)
    }
}

type SomeRes = {
    data: MangaListContentItemProps[]
    offset: number;
    limit: number;
    total: number;
}

export default async function executeSearchQuery(client: Client, params: MangaListParams, offline: boolean = false): Promise<IMangaSearchResult> {
    let res: SomeRes | undefined = undefined;
    if (offline) {
        const result = await client.query(offlineQuery, {
            params
        }).toPromise();
        if (result.data) {
            const data = result.data.manga.listOffline;
            res = {
                data: data.data.map<MangaListContentItemProps>((v) => {
                    const contentRating = v.attributes.contentRating
                    return {
                        id: v.id,
                        coverImage: get_cover_art({
                            cover_id: v.relationships.coverArt.id,
                            manga_id: v.id,
                            filename: v.relationships.coverArt.attributes.fileName,
                            client,
                            mode: CoverImageQuality.V256
                        }),
                        status: v.attributes.status,
                        contentRating: contentRating != null ? contentRating : undefined,
                        description: get_value_from_title_and_random_if_undefined(v.attributes.description, "en") ?? "",
                        title: get_value_from_title_and_random_if_undefined(v.attributes.title, "en") ?? "",
                        coverImageAlt: v.relationships.coverArt.id,
                        withFull: true,
                        tags: v.attributes.tags.map((tag) => ({
                            id: tag.id,
                            name: get_value_from_title_and_random_if_undefined(tag.attributes.name, "en") ?? ""
                        }))
                    }
                }),
                offset: data.offset,
                limit: data.limit,
                total: data.limit
            };
        }
        if (result.error) {
            throw result.error
        }
    } else {
        const result = await client.query(defaultQuery, {
            params
        }).toPromise();
        if (result.data) {
            const data = result.data.manga.list;
            res = {
                data: data.data.map<MangaListContentItemProps>((v) => {
                    const contentRating = v.attributes.contentRating
                    return {
                        id: v.id,
                        coverImage: get_cover_art({
                            cover_id: v.relationships.coverArt.id,
                            manga_id: v.id,
                            filename: v.relationships.coverArt.attributes.fileName,
                            client,
                            mode: CoverImageQuality.V256
                        }),
                        status: v.attributes.status,
                        contentRating: contentRating != null ? contentRating : undefined,
                        description: get_value_from_title_and_random_if_undefined(v.attributes.description, "en") ?? "",
                        title: get_value_from_title_and_random_if_undefined(v.attributes.title, "en") ?? "",
                        coverImageAlt: v.relationships.coverArt.id,
                        withFull: true,
                        tags: v.attributes.tags.map((tag) => ({
                            id: tag.id,
                            name: get_value_from_title_and_random_if_undefined(tag.attributes.name, "en") ?? ""
                        }))
                    }
                }),
                offset: data.offset,
                limit: data.limit,
                total: data.limit
            };
        }
        if (result.error) {
            throw result.error
        }
    }
    if (res) {
        return new MangaSearchResult({
            ...res,
            client,
            params,
            offline
        })
    } else {
        throw new Error("no data obtained");
    }
}
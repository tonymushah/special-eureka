import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import React from "react";
import { Client } from "@tauri-apps/api/http";
import CollectionComponnent_withInfiniteQuery from "../../Collection/CollectionComponnent_withInfiniteQuery";
import { InfiniteQueryConsumer } from "../../Collection/InfiniteQueryConsumer";
import MangaListWithCollectionArray from "../../mangas/v1/MangaList/ViaMangaCollectionArray";

export default function Group_Titles(props: {
    id: string
}) {
    const client = useHTTPClient();
    const _queryKey_ = React.useMemo(() => queryKey(props), []);
    return (
        <CollectionComponnent_withInfiniteQuery<Manga>
            // [x] Refactor into a function
            queryKey={_queryKey_}
            queryFn={async function ({ pageParam = new Offset_limits() }) {
                return await queryFn({ offset_limit: pageParam, id: props.id, client });
            }}
            options={
                {
                    "staleTime": Infinity,
                    getNextPageParam(lastPage) {
                        try { 
                            return lastPage.next_offset_limit(); 
                        } 
                        catch { 
                            return undefined; 
                        }
                    },
                    getPreviousPageParam(lastPage) {
                        try{
                            return lastPage.previous_offset_limit();
                        }catch{
                            return undefined;
                        }
                    }
                }
            }
        >
            {(query) => (
                <InfiniteQueryConsumer<Manga> query={query}>
                    {(collections) => (<MangaListWithCollectionArray src={collections}/>)} 
                </InfiniteQueryConsumer>
            )}
        </CollectionComponnent_withInfiniteQuery>
    );
}

export function queryKey(props: { id: string; }) {
    return ["mdx", "group_titles", props.id];
}

export function queryFn({ client, id, offset_limit }: {
    client?: Client,
    id: string,
    offset_limit: Offset_limits
}) {
    return Manga.search({
        offset_Limits: offset_limit,
        group: id,
        client: client
    });
}
import { Collection } from "@mangadex/api/structures/Collection";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import { CollectionComponnent_WithQuery } from "../Collection/Collection";
import MangaList from "../mangas/v1/MangaList";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import React from "react";

export default function Group_Titles(props: {
    id: string
}) {
    const client = useHTTPClient();
    const _queryKey_ = React.useMemo(() => queryKey(props), []);
    return (
        <CollectionComponnent_WithQuery<Manga>
            // [x] Refactor into a function
            queryKey={_queryKey_}
            fn={() => {
                return Manga.search({
                    offset_Limits: new Offset_limits(),
                    group: props.id,
                    client: client
                });
            }}
            query_options={
                {
                    "staleTime": Infinity
                }
            }
        >
            {
                (value: Collection<Manga>) => (
                    <MangaList src={value.get_data()} />
                )
            }
        </CollectionComponnent_WithQuery>
    );
}

export function queryKey(props: { id: string; }) {
    return ["mdx", "group_titles", props.id];
}


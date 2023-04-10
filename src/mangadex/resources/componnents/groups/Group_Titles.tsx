import React from "react";
import { Collection } from "../../../api/structures/Collection";
import { Offset_limits } from "../../../api/internal/Utils";
import { Manga } from "../../../api/structures/Manga";
import { CollectionComponnent_WithQuery } from "../Collection/Collection";
import MangaList from "../mangas/v1/MangaList";
import { useHTTPClient } from "../../../../commons-res/components/HTTPClientProvider";

export default function Group_Titles(props: {
    id: string
}) {
    const client = useHTTPClient();
    return (
        <CollectionComponnent_WithQuery<Manga>
            queryKey={"mdx-group_titles-" + props.id}
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

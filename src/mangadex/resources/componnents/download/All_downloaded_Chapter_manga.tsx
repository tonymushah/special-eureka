import React from "react";
import Consumer from "@commons-res/components/Consumer";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import { CollectionComponnent_WithQuery } from "../Collection/Collection";

export default function All_downloaded_Chapter_manga(props: {
    children : (value: Array<string>) => React.ReactNode,
    mangaID : string,
    offset_limit?: Offset_limits,
    onLoading? : React.ReactNode
}){
    const client = useHTTPClient();
    // Refactor into a function
    const query_key = ["mdx", "manga", props.mangaID, "offline-chapters"];
    return (
        <CollectionComponnent_WithQuery<string>
            fn={() => {
                return Manga.getAllDownloadedChapters_ofAManga(props.mangaID, props.offset_limit, client);
            }}
            queryKey={query_key}
            query_options={
                {
                    "staleTime" : 0
                }
            }
        >
            {
                (value) => (
                    <Consumer to_consume={value.get_data()}>
                        {
                            props.children
                        }
                    </Consumer>
                )
            }
        </CollectionComponnent_WithQuery>
    );
}
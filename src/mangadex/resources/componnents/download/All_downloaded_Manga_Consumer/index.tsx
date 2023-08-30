import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Collection } from "@mangadex/api/structures/Collection";
import { Manga } from "@mangadex/api/structures/Manga";
import { UseInfiniteQueryOptions, UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";
import CollectionComponnent_withInfiniteQuery from "../../Collection/CollectionComponnent_withInfiniteQuery";
import { InfiniteQueryConsumer } from "../../Collection/InfiniteQueryConsumer";

const RefreshButton = React.lazy(() => import("./RefreshButton"));
const RefetchButton = React.lazy(() => import("./RefetchButton"));
const PatchButton = React.lazy(() => import("./PatchButton"));

export default function AllDownlaodedMangaConsumer(props: {
    children: (value: Collection<string>[]) => React.ReactNode,
    query_options?: Omit<
        UseInfiniteQueryOptions<
            Collection<string>,
            unknown
        >,
        "queryKey"
    >
}) {
    const client = useHTTPClient();
    // [x] Refactor into a function
    const query_key = React.useMemo(queryKey, []);
    return (
        <Chakra.Box>
            <React.Suspense
                fallback={
                    <Chakra.Text>Loading buttons...</Chakra.Text>
                }
            >
                <Chakra.Wrap>
                    <Chakra.WrapItem>
                        <RefreshButton query_key={query_key} query_options={props.query_options} />
                    </Chakra.WrapItem>
                    <Chakra.WrapItem>
                        <PatchButton query_key={query_key} />
                    </Chakra.WrapItem>
                    <Chakra.WrapItem>
                        <RefetchButton query_key={query_key} />
                    </Chakra.WrapItem>
                </Chakra.Wrap>
            </React.Suspense>

            <CollectionComponnent_withInfiniteQuery<string>
                queryFn={async function ({ pageParam = new Offset_limits() }) {
                    return await Manga.getAllDownloadedMangaID(pageParam, client);
                }}
                queryKey={query_key}
            //query_options={props.query_options}
            >{
                    (query: UseInfiniteQueryResult<Collection<string>, unknown>) => (
                        <InfiniteQueryConsumer<string> query={query}>
                            {
                                props.children
                            }
                        </InfiniteQueryConsumer>
                    )
                }
            </CollectionComponnent_withInfiniteQuery>
        </Chakra.Box>
    );
}

export function queryKey() {
    return ["mdx", "dowloaded_manga"];
}

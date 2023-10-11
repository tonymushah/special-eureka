import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import Collection from "@mangadex/api/structures/Collection";
import Manga from "@mangadex/api/structures/Manga";
import { QueryKey, UseInfiniteQueryOptions, UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";
import CollectionComponnent_withInfiniteQuery from "../../Collection/CollectionComponnent_withInfiniteQuery";
import { InfiniteQueryConsumer } from "../../Collection/InfiniteQueryConsumer";
import { useAtom } from "jotai";
import { titleAtom } from "./atom";
import TitleInput from "./TitleInput";

const RefreshButton = React.lazy(() => import("./RefreshButton"));
const RefetchButton = React.lazy(() => import("./RefetchButton"));
const PatchButton = React.lazy(() => import("./PatchButton"));

function Buttons({ query_key, query_options }: {
    query_key: QueryKey,
    query_options?: Omit<
        UseInfiniteQueryOptions<
            Collection<string>,
            unknown
        >,
        "queryKey"
    >
}) {
    return (
        <React.Fragment>
            <React.Suspense
                fallback={
                    <Chakra.Text>Loading buttons...</Chakra.Text>
                }
            >
                <Chakra.Wrap>
                    <Chakra.WrapItem>
                        <RefreshButton query_key={query_key} query_options={query_options} />
                    </Chakra.WrapItem>
                    <Chakra.WrapItem>
                        <PatchButton query_key={query_key} />
                    </Chakra.WrapItem>
                    <Chakra.WrapItem>
                        <RefetchButton query_key={query_key} />
                    </Chakra.WrapItem>
                </Chakra.Wrap>
            </React.Suspense>
        </React.Fragment>
    );
}



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
    const [title, ] = useAtom(titleAtom);
    // [x] Refactor into a function
    const query_key = React.useMemo(() => queryKey({ title }), [title]);
    return (
        <Chakra.Box>
            <Buttons query_key={query_key} query_options={props.query_options}/>
            <TitleInput/>
            <CollectionComponnent_withInfiniteQuery<string>
                queryFn={async function ({ pageParam = new Offset_limits() }) {
                    return await Manga.getAllDownloadedMangaID({ offset_Limits: pageParam, title, client });
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

export function queryKey(arg?: {
    title?: string 
}) {
    return ["mdx", "dowloaded_manga", arg];
}

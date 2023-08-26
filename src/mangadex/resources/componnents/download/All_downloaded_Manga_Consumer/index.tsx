import * as Chakra from "@chakra-ui/react";
import Consumer from "@commons-res/components/Consumer";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Collection } from "@mangadex/api/structures/Collection";
import { Manga } from "@mangadex/api/structures/Manga";
import { UseQueryOptions } from "@tanstack/react-query";
import React from "react";
import { CollectionComponnent_WithQuery } from "../../Collection/Collection";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";

const RefreshButton = React.lazy(() => import("./RefreshButton"));
const RefetchButton = React.lazy(() => import("./RefetchButton"));
const PatchButton = React.lazy(() => import("./PatchButton"));

export default function AllDownlaodedMangaConsumer(props: {
    children: (value: Array<string>) => React.ReactNode,
    query_options?: Omit<UseQueryOptions<Collection<string>, Error>, "queryKey" | "queryFn">,
}) {
    const client = useHTTPClient();
    // [ ] Refactor into a function
    const query_key = ["mdx", "dowloaded_manga"];
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

            <CollectionComponnent_WithQuery<string>
                fn={() => {
                    return Manga.getAllDownloadedMangaID(undefined, client);
                }}
                queryKey={query_key}
                onLoading={
                    <Chakra.Center>
                        <MangadexSpinner />
                    </Chakra.Center>
                }
                query_options={props.query_options}
            >{
                    (value) => (
                        <Consumer<Array<string>> to_consume={value.get_data()}>
                            {
                                props.children
                            }
                        </Consumer>
                    )
                }</CollectionComponnent_WithQuery>
        </Chakra.Box>
    );
}
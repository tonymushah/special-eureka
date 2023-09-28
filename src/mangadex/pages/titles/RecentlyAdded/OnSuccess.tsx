import * as Chakra from "@chakra-ui/react";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import Manga from "@mangadex/api/structures/Manga";
import CollectionComponnent_withInfiniteQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_withInfiniteQuery";
import { InfiniteQueryConsumer } from "@mangadex/resources/componnents/Collection/InfiniteQueryConsumer";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import MangaListWithCollectionArray from "@mangadex/resources/componnents/mangas/v1/MangaList/ViaMangaCollectionArray";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { queryFn } from ".";
import { useInfiniteQuery } from "@tanstack/react-query";

function Title({ query_Key }: {
    query_Key: string[]
}) {
    const query = useInfiniteQuery(query_Key, {
        enabled: false
    });
    return (
        <Chakra.Heading
            fontFamily={"inherit"}
            onClick={() => {
                if (query.isSuccess) {
                    query.refetch();
                }
            }}
            _hover={{
                textDecoration: query.isLoading ? "none" : "overline"
            }}
        >
            Recently Added
        </Chakra.Heading>
    );
}

export function OnSuccess({ offset_limit, client, query_Key }: { offset_limit: Offset_limits; client: Client; query_Key: string[]; }) {
    return (
        <ChakraContainer>
            <Chakra.Box>
                <Title query_Key={query_Key}/>
                <Chakra.Box>
                    <CollectionComponnent_withInfiniteQuery<Manga>
                        queryFn={async ({ pageParam: offset_Limits = offset_limit }) => {
                            return queryFn({
                                offset_Limits,
                                client
                            });
                        }}
                        queryKey={query_Key}
                    >
                        {(query) => (
                            <InfiniteQueryConsumer<Manga> query={query}>
                                {(collections) => (
                                    <MangaListWithCollectionArray src={collections} />
                                )}
                            </InfiniteQueryConsumer>
                        )}
                    </CollectionComponnent_withInfiniteQuery>
                </Chakra.Box>
            </Chakra.Box>
        </ChakraContainer>
    );
}

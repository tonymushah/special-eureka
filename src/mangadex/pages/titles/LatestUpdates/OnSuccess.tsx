import * as Chakra from "@chakra-ui/react";
import UserOptions from "@mangadex/api/internal/UserOptions";
import { Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Chapter } from "@mangadex/api/structures/Chapter";
import CollectionComponnent_withInfiniteQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_withInfiniteQuery";
import { InfiniteQueryConsumer } from "@mangadex/resources/componnents/Collection/InfiniteQueryConsumer";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ChapterCollectionToAccordion from "@mangadex/resources/componnents/mangas/v1/ChapterCollectionToAccordion";

function Title({ queryKey }: {
    queryKey: string[]
}) {
    const query = useInfiniteQuery(queryKey, {
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
            Latest Updates
        </Chakra.Heading>
    );
}

export function OnSuccess({ userOption, offset_limit, client, queryKey }: { userOption: UserOptions; offset_limit: Offset_limits; client: Client; queryKey: string[]; }) {
    return (
        <Chakra.Box>
            <Title queryKey={queryKey} />
            <Chakra.Box>
                <CollectionComponnent_withInfiniteQuery<Chapter>
                    queryFn={async () => {
                        const userLanguages = await userOption.getLanguages();
                        return await Chapter.search({
                            offset_limits: offset_limit,
                            order: new Order("desc"),
                            client: client,
                            translatedLanguage: userLanguages.map((lang) => lang.get_two_letter())
                        });
                    }}
                    queryKey={queryKey}
                >
                    {(query) => (
                        <InfiniteQueryConsumer<Chapter> query={query}>
                            {(collections) => (
                                <React.Fragment>
                                    <Chakra.VStack>
                                        {collections.map((value) => (
                                            <ChapterCollectionToAccordion value={value} key={`${value.get_current_page()}`} />
                                        ))}
                                    </Chakra.VStack>
                                </React.Fragment>
                            )}
                        </InfiniteQueryConsumer>
                    )}
                </CollectionComponnent_withInfiniteQuery>
            </Chakra.Box>
        </Chakra.Box>
    );
}

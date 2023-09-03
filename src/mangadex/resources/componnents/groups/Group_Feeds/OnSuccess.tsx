import * as Chakra from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { Collection } from "@mangadex/api/structures/Collection";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { InfiniteQueryConsumer } from "../../Collection/InfiniteQueryConsumer";
import ChapterCollectionToAccordion from "../../mangas/v1/ChapterCollectionToAccordion";

export function OnSuccess({ query }: {
    query: UseInfiniteQueryResult<Collection<Chapter>, unknown>;
}) {
    return (
        <InfiniteQueryConsumer query={query}>
            {(pages) => (
                <Chakra.Stack m={2} spacing={2}> 
                    {pages.map((value) => (
                        <ChapterCollectionToAccordion value={value} key={`${value.get_current_page()}`} />
                    ))}
                </Chakra.Stack>
            )}
        </InfiniteQueryConsumer>
    );
}

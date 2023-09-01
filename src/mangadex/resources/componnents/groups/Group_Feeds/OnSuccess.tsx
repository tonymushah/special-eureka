import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Collection } from "@mangadex/api/structures/Collection";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import NextTrigger from "../../Collection/NextTrigger";
import ChapterCollectionToAccordion from "../../mangas/v1/ChapterCollectionToAccordion";

export function OnSuccess({ query }: {
    query: UseInfiniteQueryResult<Collection<Chapter>, unknown>;
}) {
    if (query.isSuccess) {
        return (
            <React.Fragment>
                <Chakra.VStack>
                    {query.data.pages.map((value) => (
                        <ChapterCollectionToAccordion value={value} key={`${value.get_current_page()}`} />
                    ))}
                </Chakra.VStack>
                <NextTrigger query={query} />
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}

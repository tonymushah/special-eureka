import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Aggregate } from "@mangadex/api/structures/Aggregate";
import { Chapter } from "@mangadex/api/structures/Chapter";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import { get_aggregate_query } from "@mangadex/resources/hooks/AgreggateStateHooks/get_aggregate_query";
import React from "react";
import { Chapter_Previous_Next_Synced } from "./Chapter_Previous_Next_Synced";

type ContextType = {
    aggregate: Aggregate,
    chapter: Chapter
}

const context = React.createContext<ContextType | undefined>(undefined);

export function useChapter_Previous_NextAggregate() {
    const data = React.useContext(context);
    if (data == undefined) {
        throw new Error("The Chapter_Previous_NextAggregateContext value is undefined");
    } else {
        return data;
    }
}

function Chapter_Previous_NextAggregateContext({ value, children }: React.PropsWithChildren<{
    value: ContextType
}>) {
    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    );
}

export default function Chapter_Previous_Next(props: {
    src: Chapter
}) {
    const client = useHTTPClient();
    const { query: chapter_aggregate_query } = get_aggregate_query({
        aggregate_options: props.src.getAggregateList_options(client),
        queryOption: {
            staleTime: 1000 * 60 * 30
        }
    });
    if (chapter_aggregate_query.isSuccess) {
        return (
            <Chapter_Previous_NextAggregateContext value={{
                aggregate: chapter_aggregate_query.data,
                chapter: props.src
            }}>
                <Chakra.ButtonGroup
                    colorScheme={"orange"}
                    isAttached
                >
                    <Chapter_Previous_Next_Synced/>
                </Chakra.ButtonGroup>
            </Chapter_Previous_NextAggregateContext>
        );
    } else if (chapter_aggregate_query.isLoading || chapter_aggregate_query.fetchStatus == "fetching") {
        return (
            <Chakra.ButtonGroup
                colorScheme={"orange"}
                isAttached
            >
                <Chakra.IconButton isLoading aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                <Chakra.IconButton isLoading aria-label="next" icon={<ChakraIcon.ChevronRightIcon />} />
            </Chakra.ButtonGroup>
        );
    } else if (chapter_aggregate_query.isError) {
        return (
            <ErrorEL1 error={chapter_aggregate_query.error} />
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
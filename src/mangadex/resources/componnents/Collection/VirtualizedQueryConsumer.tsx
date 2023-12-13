import * as Chakra from "@chakra-ui/react";
import Collection from "@mangadex/api/structures/Collection";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import ShowUnknownError from "../router/error/ShowUnknownError";

export default function VirtualizedInfiniteQueryConsumer<T>({
    query, children
}: {
    query: UseInfiniteQueryResult<Collection<T>, unknown>;
    children: (value: T) => React.ReactNode;
}) {
    const {
        status,
        data,
        error,
        //isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = query;
    const allRows = data ? data.pages.flatMap((d) => d.get_data()) : [];

    const parentRef = React.useRef();

    const rowVirtualizer = useVirtualizer({
        count: hasNextPage ? allRows.length + 1 : allRows.length,
        getScrollElement: () => parentRef.current ?? null,
        estimateSize: () => 100,
        overscan: 5,
    });
    React.useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

        if (!lastItem) {
            return;
        }

        if (
            lastItem.index >= allRows.length - 1 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    }, [
        hasNextPage,
        fetchNextPage,
        allRows.length,
        isFetchingNextPage,
        rowVirtualizer.getVirtualItems(),
    ]);
    if (status == "loading") {
        return (
            <Chakra.Alert status="loading" variant={"left-accent"}>
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>Loading...</Chakra.AlertTitle>
            </Chakra.Alert>
        );
    } else if (status == "error") {
        return (
            <ShowUnknownError
                error={error}
            />
        );
    } else {
        return (
            <Chakra.Box ref={parentRef}>
                <Chakra.Box
                    height={`${rowVirtualizer.getTotalSize()}px`}
                    width={"100%"}
                    position={"relative"}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const item = allRows[virtualRow.index];
                        return (
                            <Chakra.Box key={virtualRow.key}>
                                {children(item)}
                            </Chakra.Box>
                        );
                    })}
                </Chakra.Box>
            </Chakra.Box>
        );
    }

}
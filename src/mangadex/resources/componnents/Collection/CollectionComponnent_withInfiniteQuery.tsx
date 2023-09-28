import Consumer from "@commons-res/components/Consumer";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import Collection from "@mangadex/api/structures/Collection";
import { QueryFunction, QueryKey, UseInfiniteQueryOptions, UseInfiniteQueryResult, useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

// TODO Finish this `CollectionComponnent_withInfiniteQuery` component
export default function CollectionComponnent_withInfiniteQuery<T>({ queryKey, queryFn, options = {
    getNextPageParam(lastPage) {
        try {
            return lastPage.next_offset_limit();
        } catch {
            return undefined;
        }
    },
    getPreviousPageParam(lastPage) {
        try {
            return lastPage.previous_offset_limit();
        } catch {
            return undefined;
        }
    },
}, children }: {
    queryKey: QueryKey,
    queryFn: QueryFunction<Collection<T>, QueryKey, Offset_limits>,
    options?: Omit<
        UseInfiniteQueryOptions<
            Collection<T>,
            unknown,
            Collection<T>,
            Collection<T>,
            QueryKey
        >,
        "queryKey" | "queryFn"
    >,
    children : (query : UseInfiniteQueryResult<Collection<T>, unknown>) => React.ReactNode
}) {
    const query = useInfiniteQuery<Collection<T>, unknown, Collection<T>, QueryKey>(queryKey, queryFn, options);
    return (
        <Consumer<UseInfiniteQueryResult<Collection<T>, unknown>> to_consume={query}>
            {
                children
            }
        </Consumer>
    );
}
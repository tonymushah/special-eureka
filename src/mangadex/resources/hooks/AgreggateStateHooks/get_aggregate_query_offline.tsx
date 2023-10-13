import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Aggregate } from "@mangadex/api/structures/Aggregate";
import { AggregateListOptions } from "@mangadex/api/structures/SearchType/AggregateListOptions";
import useServerStateQuery from "../MangaManagerState/useServerStateQuery";
import React from "react";


export function get_aggregate_query_offline(props: {
    aggregate_options: AggregateListOptions;
    queryOption?: Omit<UseQueryOptions<Aggregate, Error>, "queryKey" | "queryFn">;
}) {
    const server_query = useServerStateQuery();
    // [x] Refactor query key into a new funtion
    const _queryKey_ = React.useMemo(() => queryKey(props.aggregate_options), []);
    const query = useQuery<Aggregate, Error>(_queryKey_, () => {
        return Aggregate.get_aggregate_offline(props.aggregate_options);
    }, props.queryOption == undefined ? {
        staleTime: Infinity,
        enabled : server_query.query.data == true
    } : props.queryOption);
    return {
        queryKey : _queryKey_,
        query
    };
}
export function queryKey(aggregate_options: AggregateListOptions) {
    return ["mdx", "aggregate", aggregate_options, "offline"];
}


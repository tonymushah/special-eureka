import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Aggregate } from "@mangadex/api/structures/Aggregate";
import { AggregateListOptions } from "@mangadex/api/structures/SearchType/AggregateListOptions";
import usePingQuery from "../Ping";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import React from "react";

export function get_aggregate_query(props: {
    aggregate_options: AggregateListOptions;
    queryOption?: Omit<UseQueryOptions<Aggregate, Error>, "queryKey" | "queryFn">;
}) {
    const client = useHTTPClient();
    const usePingQueryRes = usePingQuery({
        client: client
    });
    // [x] Refactor query key into a new function
    const _queryKey_ = React.useMemo(() => querykey(props.aggregate_options), []);
    const query = useQuery<Aggregate, Error>(_queryKey_, () => {
        if (usePingQueryRes.query.data == true) {
            return Aggregate.get_aggregate(props.aggregate_options);
        } else {
            return Aggregate.get_aggregate_offline(props.aggregate_options);
        }
    }, props.queryOption == undefined ? {
        staleTime: Infinity,
        enabled: !!usePingQueryRes.query.data
    } : props.queryOption);
    return {
        queryKey : _queryKey_,
        query
    };
}

export function querykey(aggregate_options : AggregateListOptions) {
    return ["mdx", "aggregate", aggregate_options];
}


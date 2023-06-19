import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Aggregate } from "@mangadex/api/structures/Aggregate";
import { AggregateListOptions } from "@mangadex/api/structures/SearchType/AggregateListOptions";
import usePingQuery from "./Ping";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";

export function get_aggregate_query(props : {
    aggregate_options: AggregateListOptions,
    queryOption? : Omit<UseQueryOptions<Aggregate, Error>, "queryKey" | "queryFn">
}){
    const client = useHTTPClient();
    const usePingQueryRes = usePingQuery({
        client : client
    });
    const queryKey = ["mdx", "aggregate", props.aggregate_options];
    const query = useQuery<Aggregate, Error>(queryKey, () => {
        if(usePingQueryRes.query.data == true){
            return Aggregate.get_aggregate(props.aggregate_options);
        }else{
            return Aggregate.get_aggregate_offline(props.aggregate_options);
        }
    }, props.queryOption == undefined? {
        staleTime: Infinity,
        enabled : !!usePingQueryRes.query.data
    } : props.queryOption);
    return {
        queryKey,
        query
    };
}

export function get_aggregate_query_offline(props : {
    aggregate_options: AggregateListOptions,
    queryOption? : Omit<UseQueryOptions<Aggregate, Error>, "queryKey" | "queryFn">
}){
    const queryKey = ["mdx", "aggregate", props.aggregate_options, "offline"];
    const query = useQuery<Aggregate, Error>(queryKey, () => {
        return Aggregate.get_aggregate_offline(props.aggregate_options);
    }, props.queryOption == undefined? {
        staleTime: Infinity
    } : props.queryOption);
    return {
        queryKey,
        query
    };
}
import { useQuery, UseQueryOptions } from "react-query";
import { Aggregate } from "../../api/structures/Aggregate";
import { AggregateListOptions } from "../../api/structures/SearchType/AggregateListOptions";

export function get_aggregate_query(props : {
    aggregate_options: AggregateListOptions,
    queryOption? : Omit<UseQueryOptions<Aggregate, Error>, "queryKey" | "queryFn">
}){
    const queryKey = ["mdx-aggregate", props.aggregate_options];
    const query = useQuery<Aggregate, Error>(queryKey, () => {
        return Aggregate.get_aggregate(props.aggregate_options);
    }, props.queryOption == undefined? {
        staleTime: Infinity
    } : props.queryOption);
    return {
        queryKey,
        query
    };
}
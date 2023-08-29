import { UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function useChapterReadingDrawer(query_options? : Omit<UseQueryOptions<boolean, unknown, boolean, string[]>, "queryFn" | "queryKey">){
    const queryClient = useQueryClient();
    // [x] Refactor this query key into a function
    // [x] use `React.useMemo` for optimization
    const _queryKey_ = React.useMemo(() => queryKey(), []);
    const query = useQuery(_queryKey_, async () => {
        return false;
    }, query_options);
    const changeOptionMutation = useMutation({
        mutationKey : _queryKey_.concat("mutation"),
        mutationFn : async (new_ : boolean) => {
            queryClient.setQueryData(_queryKey_, new_);
        }
    });
    const changeOption = changeOptionMutation.mutate;
    const toggle = () => {
        if(query.isSuccess){
            changeOption(!query.data);
        }
    };
    return {
        query,
        queryKey : _queryKey_,
        changeOption,
        toggle
    };
}

export function queryKey() {
    return ["mdx", "client", "fullscreen-drawer"];
}
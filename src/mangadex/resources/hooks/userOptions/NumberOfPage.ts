import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function useElementPerPage(){
    // [x] Refactor this query key into a function
    // [x] use `React.useMemo` for optimization
    const _queryKey_ = React.useMemo(() => queryKey(), []);
    const queryClient = useQueryClient();
    const query = useQuery<number>(_queryKey_, async () => {
        return 10;
    }, {
        staleTime: Infinity
    });
    const changeOption = (new_ : number) => {
        if(new_ > 0){
            queryClient.setQueryData(_queryKey_, new_);
        }
    };
    return {
        queryKey : _queryKey_,
        query,
        changeOption
    };
}

export function queryKey() {
    return ["mdx", "user-option", "element-per-page"];
}

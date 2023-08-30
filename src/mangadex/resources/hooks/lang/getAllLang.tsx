import { Lang } from "@mangadex/api/internal/Utils";
import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "./getLanguages";
import React from "react";

export function getAllLang(){
    const required_query = getLanguages().query;
    // [x] Refactor this query key into a function
    // [x] use `React.useMemo` for optimization
    const _queryKey_ = React.useMemo(() => queryKey(), []);
    const query = useQuery<Array<Lang>>(_queryKey_, async () => {
        if(required_query.isSuccess){
            return required_query.data?.get_langs();
        }else{
            return [];
        }
    }, {
        staleTime : Infinity,
        enabled : !!required_query.data
    });
    return {
        queryKey: _queryKey_,
        query
    };
}

export function queryKey() {
    return ["mdx", "all-langs"];
}

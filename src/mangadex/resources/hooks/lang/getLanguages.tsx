import { Languages } from "@mangadex/api/internal/Utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function getLanguages() {
    // [x] Refactor this query key into a function
    // [x] use `React.useMemo` for optimization
    const _queryKey_ = React.useMemo(() => queryKey(), []);
    const query = useQuery<Languages>(_queryKey_, async () => {
        return await Languages.initialize();
    }, {
        staleTime: Infinity
    });
    return {
        queryKey : _queryKey_,
        query
    };
}

export function queryKey() {
    return ["mdx", "languages"];
}
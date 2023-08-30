import { Author } from "@mangadex/api/structures/Author";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";


export function useAuthorMenuSearchData() {
    const queryClient = useQueryClient();
    // [x] Refactor into a function
    const queryKey_ = React.useMemo(() => queryKey(), []);
    const query = useQuery<Array<Author>>(queryKey_, () => {
        return [];
    });
    const mutationKey: readonly string[] = queryKey_.concat("mutation");
    const mutation = useMutation<void, unknown, Author, unknown>({
        mutationFn: async (author: Author) => {
            const authors = query.data ?? [];
            queryClient.setQueryData(queryKey_, authors.concat(author));
            return;
        },
        mutationKey
    });
    return {
        mutation,
        queryKey : queryKey_,
        mutationKey,
        query
    };
}

export function queryKey() {
    return ["mdx", "manga", "search", "authors"];
}


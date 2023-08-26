import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function AuthorMenuSearch(){
    return (
        <React.Fragment/>
    );
}

export function useAuthorMenuSearch({name} : {
    name : string
}){
    const client = useHTTPClient();
    /// [ ] Refactor into a function
    const queryKey = ["mdx", "manga", "search", "authors", {
        name : name
    }];
    const query = useQuery(queryKey, () => {
        return Author.searchAuthor({
            client,
            name,
            offset_Limits : new Offset_limits()
        });
    });
    return {
        query, 
        queryKey
    };
}

export function useAuthorMenuSearchData(){
    const queryClient = useQueryClient();
    // [ ] Refactor into a function
    const queryKey = ["mdx", "manga", "search", "authors"];
    const query = useQuery<Array<Author>>(queryKey, () => {
        return [];
    });
    const mutationKey : readonly string[] = queryKey.concat("mutation");
    const mutation = useMutation<void, unknown, Author, unknown>({
        mutationFn : async (author : Author) => {
            const authors = query.data?? [];
            queryClient.setQueryData(queryKey, authors.concat(author));
            return;
        },
        mutationKey
    });
    return {
        mutation,
        queryKey,
        mutationKey,
        query
    };
}
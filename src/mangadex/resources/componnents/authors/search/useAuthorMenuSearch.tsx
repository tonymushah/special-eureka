import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import { useQuery } from "@tanstack/react-query";
import React from "react";


export function useAuthorMenuSearch({ name }: {
    name: string;
}) {
    const client = useHTTPClient();
    /// [x] Refactor into a function
    const queryKey_ = React.useMemo(() => queryKey(name), [name]);
    const query = useQuery(queryKey_, () => {
        return Author.searchAuthor({
            client,
            name,
            offset_Limits: new Offset_limits()
        });
    });
    return {
        query,
        queryKey: queryKey_
    };
}

export function queryKey(name: string) {
    return ["mdx", "manga", "search", "authors", {
        name: name
    }];
}


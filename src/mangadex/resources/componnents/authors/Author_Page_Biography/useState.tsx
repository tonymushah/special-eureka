import { useQuery } from "@tanstack/react-query";
import { Lang_and_Data } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import React from "react";

export function useState(props: { src: Author; }) {
    /// [x] Refactor into a function
    const query_key = React.useMemo(() => queryKey(props), []);
    const query = useQuery<Array<Lang_and_Data>>(query_key, () => {
        return Lang_and_Data.initializeByDesc(props.src.get_biography());
    });
    return query;
}

export function queryKey(props: { src: Author; }) {
    return ["mdx", "author", props.src.get_id(), "biography"];
}


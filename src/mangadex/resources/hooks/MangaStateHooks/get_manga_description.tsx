import { Lang_and_Data } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import { useQuery } from "@tanstack/react-query";
import React from "react";


export function get_manga_description(props: {
    src: Manga;
}) {
    // [x] Refactor this query key into a function
    const manga_description_querykey = React.useMemo(() => queryKey(props.src.get_id()), []);
    const manga_description_query = useQuery<Array<Lang_and_Data>, Error>(manga_description_querykey, () => {
        return Lang_and_Data.initializeByDesc(props.src.get_description());
    });
    return {
        manga_description_query,
        manga_description_querykey
    };
}

export function queryKey(id : string) {
    return ["mdx", "manga", id, "description"];
}
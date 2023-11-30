import { Lang_and_Data } from "@mangadex/api/internal/Utils";
import { MangaPageProps } from "@mangadex/resources/componnents/mangas/Manga_Page";
import { useQuery } from "@tanstack/react-query";
import React from "react";


export default function get_manga_page_titles(props: MangaPageProps) {
    // [x] Refactor this `queryKey` into a function
    const title_query_key = React.useMemo(() => queryKey(props.src.get_id()), []);
    const title_query = useQuery<Array<Lang_and_Data>, Error>(title_query_key, () => {
        return Lang_and_Data.initializeArrayByAltTitle_obj(props.src.get_alt_title());
    }, {
        "staleTime": Infinity
    });
    return {
        title_query,
        title_query_key
    };
}

export function queryKey(id : string) {
    return ["mdx", "manga", id, "title"];
}


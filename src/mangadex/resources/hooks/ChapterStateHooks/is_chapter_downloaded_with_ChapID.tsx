import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { useQuery } from "@tanstack/react-query";
import React from "react";


export function is_chapter_downloaded_with_ChapID(props: {
    id: string;
}) {
    const client = useHTTPClient();
    // [x] Refactor into a new file
    const is_downloaded_queryKey = React.useMemo(() => queryKey(props), []);
    const download_query = useQuery(is_downloaded_queryKey, () => {
        return Chapter.is_chapter_downloaded(props.id, client);
    });
    return {
        is_downloaded_queryKey: is_downloaded_queryKey,
        is_downloaded_query: download_query
    };
}

export function queryKey(props: { id: string; }) {
    return ["mdx", "chapter", props.id, "is_downloaded"];
}
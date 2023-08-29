import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter, Chapter_withAllIncludes } from "@mangadex/api/structures/Chapter";
import GetChapterByIdResult from "@mangadex/api/structures/additonal_types/GetChapterByIdResult";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { get_chapter_queryKey } from "./get_chapter_queryKey";
import React from "react";

export function get_ChapterbyId(props: {
    id: string;
    with_all_includes?: boolean;
    options?: Omit<UseQueryOptions<GetChapterByIdResult, Error>, "queryKey" | "queryFn">;
}) {
    const client = useHTTPClient();
    // [x] use `React.useMemo` for optimization
    const key = React.useMemo(() => get_chapter_queryKey({
        id: props.id
    }), []);
    const query = useQuery<GetChapterByIdResult, Error>(key, () => {
        if (props.with_all_includes == true) {
            return Chapter_withAllIncludes.get_ChapterbyId(props.id, client);
        } else {
            return Chapter.get_ChapterbyId(props.id, client);
        }
    }, props.options == undefined ? {
        staleTime: Infinity,
    } : props.options);
    return {
        queryKey: key,
        query: query
    };
}

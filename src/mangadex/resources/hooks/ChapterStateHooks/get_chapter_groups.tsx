import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { Group } from "@mangadex/api/structures/Group";
import { UseQueryResult, useQueries } from "@tanstack/react-query";


export function get_chapter_groups(props: {
    chapter: Chapter;
}) {
    const client = useHTTPClient();
    const groups_query: Array<UseQueryResult<Group, unknown>> = useQueries({
        queries: props.chapter.get_scanlations_groups_id().map((value: string) => {
            return {
                queryKey: ["mdx", "group", value],
                queryFn: () => {
                    return props.chapter.get_scanlation_group_byID(value, client);
                },
                staleTime: Infinity
            };
        })
    });
    return groups_query;
}

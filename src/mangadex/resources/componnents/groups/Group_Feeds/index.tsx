import React from "react";

import { Offset_limits } from "@mangadex/api/internal/Utils";

import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter } from "@mangadex/api/structures/Chapter";
import useLanguageUserOption from "@mangadex/resources/hooks/userOptions/SelectLanguage";
import { useQueryClient } from "@tanstack/react-query";
import CollectionComponnent_withInfiniteQuery from "../../Collection/CollectionComponnent_withInfiniteQuery";
import { OnSuccess } from "./OnSuccess";
import { queryFn } from "./queryFn";


export default function Group_Feeds(props: {
    id: string
}) {
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const languages = useLanguageUserOption();
    const queryKey_ = React.useMemo(() => queryKey(props), []);
    return (
        <CollectionComponnent_withInfiniteQuery<Chapter>
            queryKey={queryKey_}
            queryFn={async function ({ pageParam = new Offset_limits(0, 25) }) {
                return await queryFn({
                    offset_Limits: pageParam,
                    client,
                    queryClient,
                    id: props.id
                });
            }}
            options={{
                staleTime: Infinity,
                enabled: !!languages.query.data,
                getNextPageParam(lastPage) {
                    try {
                        return lastPage.next_offset_limit();
                    } catch {
                        return undefined;
                    }
                },
                getPreviousPageParam(lastPage) {
                    try {
                        return lastPage.previous_offset_limit();
                    } catch {
                        return undefined;
                    }
                }
            }}
        >
            {(query) => <OnSuccess query={query} />}
        </CollectionComponnent_withInfiniteQuery>
    );
}
export function queryKey(props: { id: string; }) {
    return ["mdx", "group_feeds", props.id];
}


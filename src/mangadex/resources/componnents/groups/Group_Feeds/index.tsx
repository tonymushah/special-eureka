import React from "react";

import { Asc_Desc, Offset_limits, Order } from "@mangadex/api/internal/Utils";

import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import UserOptions from "@mangadex/api/internal/UserOptions";
import GetChapterByIdResult from "@mangadex/api/structures/additonal_types/GetChapterByIdResult";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { get_chapter_queryKey } from "@mangadex/resources/hooks/ChapterStateHooks/get_chapter_queryKey";
import useLanguageUserOption from "@mangadex/resources/hooks/userOptions/SelectLanguage";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import CollectionComponnent_withInfiniteQuery from "../../Collection/CollectionComponnent_withInfiniteQuery";
import { OnSuccess } from "./OnSuccess";


export default function Group_Feeds(props: {
    id: string
}) {
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const languages = useLanguageUserOption();
    const queryKey_ = React.useMemo(() => queryKey(props), []);
    const startOffsetLimit = React.useMemo(() => {
        const to_return = new Offset_limits();
        to_return.set_limits(25);
        return to_return;
    }, []);
    return (
        <React.Fragment>
            <CollectionComponnent_withInfiniteQuery<Chapter>
                queryKey={queryKey_}
                queryFn={async function ({ pageParam = startOffsetLimit }) {
                    return await queryFn({
                        offset_Limits: pageParam,
                        client,
                        queryClient,
                        id: props.id
                    });
                }}
                options={{
                    staleTime: Infinity,
                    enabled: !!languages.query.data
                }}
            >
                {(query) => <OnSuccess query={query} />}
            </CollectionComponnent_withInfiniteQuery>
        </React.Fragment>
    );
}
export function queryKey(props: { id: string; }) {
    return ["mdx", "group_feeds", props.id];
}

export async function queryFn({ offset_Limits, id, client, queryClient }: {
    offset_Limits: Offset_limits,
    id: string,
    client: Client,
    queryClient: QueryClient
}) {
    const userOptions = new UserOptions();
    const languages = await userOptions.getLanguages();
    const search_result = await Chapter.search({
        offset_limits: offset_Limits,
        "group": [
            id
        ],
        order: new Order(Asc_Desc.desc()),
        translatedLanguage: languages.map((value) => value.get_two_letter()),
        client: client
    });
    search_result.get_data().forEach((chapter) => {
        Chapter.downloaded(chapter.get_id(), client).then((value) => {
            const queryKey = get_chapter_queryKey({
                id: chapter.get_id()
            });
            queryClient.setQueryData<GetChapterByIdResult>(queryKey, {
                "data": chapter,
                hasFailed: value.hasFailed,
                "isDownloaded": value.isDownloaded
            });
        });
    });
    return search_result;
}   
import { useToast } from "@chakra-ui/react";
import { useQueryClient, useMutation, QueryKey, useQuery, UseQueryOptions, useQueries, UseQueryResult } from "react-query";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Chapter } from "../../api/structures/Chapter";
import { Group } from "../../api/structures/Group";
import { User } from "../../api/structures/User";

export function get_ChapterbyId(props: {
    id: string,
    options?: Omit<UseQueryOptions<Chapter, Error>, 'queryKey' | 'queryFn'>
}) {
    const client = useHTTPClient();
    const key = "mdx-chapter:" + props.id;
    const query = useQuery<Chapter, Error>(key, () => {
        return Chapter.get_ChapterbyId(props.id, client);
    }, props.options == undefined ? {
        staleTime: Infinity,
    } : props.options);
    return {
        queryKey: key,
        query: query
    };
}

export function is_chapter_downloaded(props: {
    chapter: Chapter
}) {
    return is_chapter_downloaded_with_ChapID({
        id: props.chapter.get_id()
    });
}

export function is_chapter_downloaded_with_ChapID(props: {
    id: string
}) {
    const client = useHTTPClient();
    const is_downloaded_queryKey = "mdx-chapter:" + props.id + "-is_downloaded";
    const download_query = useQuery(is_downloaded_queryKey, () => {
        return Chapter.is_chapter_downloaded(props.id, client);
    });
    return {
        is_downloaded_queryKey: is_downloaded_queryKey,
        is_downloaded_query: download_query
    }
}

export function get_chapter_user_uploader(props: {
    chapter: Chapter
}) {
    const client = useHTTPClient();
    const user_query_key = "mdx-user:" + props.chapter.get_user_id();
    const user_query = useQuery<User, Error>(user_query_key, () => {
        return props.chapter.get_userUploader(client)
    }, {
        staleTime: Infinity
    });
    return {
        user_query_key,
        user_query
    }
}

export function get_chapter_groups(props: {
    chapter: Chapter
}) {
    const client = useHTTPClient();
    const groups_query: Array<UseQueryResult<Group, unknown>> = useQueries(
        props.chapter.get_scanlations_groups_id().map((value: string) => {
            return {
                queryKey: "mdx-group-" + value,
                queryFn: () => {
                    return props.chapter.get_scanlation_group_byID(value, client);
                },
                staleTime: Infinity
            }
        })
    )
    return groups_query;
}

export function get_this_chapter_lang(props: {
    chapter: Chapter
}) {
    const this_chapter_lang_querykey = "mdx-chapter:" + props.chapter.get_id() + "-lang";
    const this_chapter_lang_query = useQuery(this_chapter_lang_querykey, () => {
        return props.chapter.get_translated_Lang();
    }, {
        cacheTime: 1000 * 60
    })
    return {
        this_chapter_lang_query,
        this_chapter_lang_querykey
    }
}

export function useChapterDownloadMutation(props: {
    chapID: string,
    toInvalidate: Array<QueryKey>
}) {
    const client = useHTTPClient();
    const queryClient = useQueryClient()
    const toast = useToast();
    const download_query = useMutation({
        mutationKey: "mdx-mutation-chapter-download-" + props.chapID,
        mutationFn: () => {
            return Chapter.download(props.chapID, client);
        },
        onError(error: Error) {
            toast({
                position: "bottom-right",
                status: "error",
                isClosable: true,
                duration: 9000,
                title: "Error on downloading",
                description: error.message
            });
        },
        onSuccess(data, variables, context) {
            toast({
                position: "bottom-right",
                status: "success",
                isClosable: true,
                duration: 9000,
                title: "Downloaded chapter",
                description: props.chapID
            });
            props.toInvalidate.map((value) => {
                queryClient.invalidateQueries({
                    queryKey: value
                });
            })
        },
    })
    return download_query;
}
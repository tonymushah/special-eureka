import { ToastId, useToast } from "@chakra-ui/react";
import { reset_queue } from "@mangadex/api/offline/plugin";
import { useQueryClient, useMutation, QueryKey, useQuery, UseQueryOptions, useQueries, UseQueryResult } from "react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter, Chapter_withAllIncludes } from "@mangadex/api/structures/Chapter";
import { Group } from "@mangadex/api/structures/Group";
import { User } from "@mangadex/api/structures/User";
import GetChapterByIdResult from "@mangadex/api/structures/additonal_types/GetChapterByIdResult";
import { Manga } from "@mangadex/api/structures/Manga";
import MangaTitle from "../componnents/mangas/v1/MangaTitle";
import React from "react";


export type ChapterDeleteMutation_data = {
    chapter: Chapter,
    manga: Manga
}

export function get_chapter_queryKey(props: {
    id: string
}) {
    return "mdx-chapter:" + props.id;
}

export function reset_queue_mutation() {
    const toast = useToast({
        position: "bottom-right",
        duration: 9000,
    });
    const mutation = useMutation({
        mutationKey: "mdx-queue_reset",
        mutationFn: () => {
            return reset_queue();
        },
        onError(error: string) {
            toast({
                status: "error",
                isClosable: true,
                title: "Error on reset",
                description: error
            });
        },
        onSuccess() {
            toast({
                status: "success",
                isClosable: true,
                title: "Queue reinitilized"
            });
        },
    })
    return mutation;
}

export function get_ChapterbyId(props: {
    id: string,
    with_all_includes?: boolean,
    options?: Omit<UseQueryOptions<GetChapterByIdResult, Error>, 'queryKey' | 'queryFn'>
}) {
    const client = useHTTPClient();
    const key = get_chapter_queryKey({
        id: props.id
    });
    const query = useQuery<GetChapterByIdResult, Error>(key, () => {
        if (props.with_all_includes == true) {
            return Chapter_withAllIncludes.get_ChapterbyId(props.id, client)
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
    const toast = useToast({
        position: "bottom-right",
        duration: 9000,
    });
    const download_query = useMutation<ChapterDeleteMutation_data, Error>({
        mutationKey: `mdx-mutation-chapter-download-${props.chapID}`,
        mutationFn: async () => {
            toast({
                status: "loading",
                title: "Downloading chapter"
            })
            await Chapter.download(props.chapID, client);
            const chapter = (await Chapter.get_ChapterbyId(props.chapID, client)).data;
            const manga = await chapter.get_manga(client);
            return {
                chapter: chapter,
                manga: manga
            }
        },
        onError(error) {
            toast({
                status: "error",
                isClosable: true,
                title: "Error on downloading",
                description: JSON.stringify(error)
            });
            props.toInvalidate.map((value) => {
                queryClient.refetchQueries({
                    queryKey: value
                });
            })
        },
        onSuccess(data) {
            let title = (<MangaTitle src={data.manga} />)
            toast({
                status: "success",
                isClosable: true,
                title: "Downloaded chapter",
                description: (
                    <React.Fragment>
                        &nbsp;
                        <>
                            Vol. {data.chapter.get_volume()} -
                        </>
                        &nbsp;
                        <>
                            Chap {data.chapter.get_chapter()}
                        </>
                        &nbsp;
                        {
                            title
                        }
                    </React.Fragment>
                )
            });
            props.toInvalidate.map((value) => {
                queryClient.refetchQueries({
                    queryKey: value
                });
            })
        },
    })
    return download_query;
}
export function useChapterDataSaverDownloadMutation(props: {
    chapID: string,
    toInvalidate: Array<QueryKey>
}) {

    const client = useHTTPClient();
    const queryClient = useQueryClient()
    const toast = useToast({
        position: "bottom-right",
        duration: 9000,
    });
    const download_query = useMutation({
        mutationKey: "mdx-mutation-chapter-data-saver-download-" + props.chapID,
        mutationFn: async () => {
            toast({
                status: "loading",
                title: "Downloading chapter"
            })
            await Chapter.download_data_saver(props.chapID, client);
            const chapter = (await Chapter.get_ChapterbyId(props.chapID, client)).data;
            const manga = await chapter.get_manga(client);
            return {
                chapter: chapter,
                manga: manga
            }
        },
        onError(error: string) {
            toast({
                status: "error",
                isClosable: true,
                title: "Error on downloading",
                description: error
            });
        },
        onSuccess(data) {
            let title = (<MangaTitle src={data.manga} />)
            toast({
                status: "success",
                isClosable: true,
                title: "Downloaded chapter",
                description: (
                    <React.Fragment>
                        &nbsp;
                        <>
                            Vol. {data.chapter.get_volume()} -
                        </>
                        &nbsp;
                        <>
                            Chap {data.chapter.get_chapter()}
                        </>
                        &nbsp;
                        {
                            title
                        }
                    </React.Fragment>
                )
            });
            props.toInvalidate.map((value) => {
                queryClient.refetchQueries({
                    queryKey: value
                });
            })
        },
    })
    return download_query;
}



export function useChapterDeleteMutation(props: {
    chapID: string,
    toInvalidate: Array<QueryKey>
}) {
    const client = useHTTPClient();
    const queryClient = useQueryClient()
    const toast = useToast({
        position: "bottom-right",
        duration: 9000,
    });
    const toastID = React.useRef<ToastId>()
    const delete_mutation = useMutation<ChapterDeleteMutation_data, Error>({
        mutationKey: `mdx-mutation-delete-chapter-${props.chapID}`,
        mutationFn: async () => {
            const chap = await Chapter.get_ChapterbyId(props.chapID, client);
            const manga = await chap.data.get_manga();
            await chap.data.delete(client);
            return {
                chapter: chap.data,
                manga: manga
            }
        },
        onError(error) {
            toast({
                status: "error",
                isClosable: true,
                title: "Error on deleting",
                description: error.message
            });
        },
        onMutate() {
            toastID.current = toast({
                status: "loading",
                title: "Deleting Chapter",
                description: "It will be quick..."
            })
        },
        onSuccess(data) {
            let title = (<MangaTitle src={data.manga} />);
            if (toastID.current != undefined) {
                toast.update(toastID.current, {
                    status: "success",
                    isClosable: true,
                    title: "Deleted chapter",
                    description: (
                        <React.Fragment>
                            &nbsp;
                            <>
                                Vol. {data.chapter.get_volume()} -
                            </>
                            &nbsp;
                            <>
                                Chap {data.chapter.get_chapter()}
                            </>
                            &nbsp;
                            {
                                title
                            }
                        </React.Fragment>
                    )
                });
            } else {
                toast({
                    status: "success",
                    isClosable: true,
                    title: "Deleted chapter",
                    description: (
                        <React.Fragment>
                            &nbsp;
                            <>
                                Vol. {data.chapter.get_volume()} -
                            </>
                            &nbsp;
                            <>
                                Chap {data.chapter.get_chapter()}
                            </>
                            &nbsp;
                            {
                                title
                            }
                        </React.Fragment>
                    )
                });
            }
            props.toInvalidate.map((value) => {
                queryClient.refetchQueries({
                    queryKey: value
                });
            })
        }
    })
    return delete_mutation;
}
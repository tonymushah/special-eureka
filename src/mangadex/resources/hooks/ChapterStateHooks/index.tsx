import { ToastId } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { Manga } from "@mangadex/api/structures/Manga";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import MangaTitle from "../../componnents/mangas/v1/MangaTitle";
import { get_mangaQueryKey_byID } from "../MangaStateHooks";

export type ChapterDeleteMutation_data = {
    chapter: Chapter,
    manga: Manga
}

export { reset_queue_mutation } from "./reset_queue_mutation";

export { get_chapter_queryKey } from "./get_chapter_queryKey";

export { get_ChapterbyId } from "./get_ChapterbyId";

export { is_chapter_downloaded } from "./is_chapter_downloaded";

export { is_chapter_downloaded_with_ChapID } from "./is_chapter_downloaded_with_ChapID";

export { get_chapter_user_uploader } from "./get_chapter_user_uploader";

export { get_chapter_groups } from "./get_chapter_groups";

export { get_this_chapter_lang } from "./get_this_chapter_lang";

export function useChapterDownloadMutation(props: {
    chapID: string,
    toInvalidate?: Array<QueryKey>,
    onSuccess?: (data : ChapterDeleteMutation_data & {
        hasFailed : boolean
    }) => void
}) {
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const toast = useChakraToast({
        id : `mdx-mutation-chapter-${props.chapID}-download`,
        position: "bottom-right",
        duration: 9000,
    });
    const download_query = useQuery<ChapterDeleteMutation_data & {
        hasFailed : boolean
    }, Error>({
        // [ ] Refactor query key into new function
        queryKey: ["mdx", "mutation", "chapter", props.chapID, "download"],
        queryFn: async () => {
            toast({
                status: "loading",
                title: "Downloading chapter"
            });
            const res = await Chapter.download(props.chapID, client);
            const chapter = (await Chapter.get_ChapterbyId(props.chapID, client)).data;
            const manga = await chapter.get_manga(client);
            return {
                chapter: chapter,
                manga: manga,
                hasFailed : res.errors.length != 0
            };
        },
        onError(error) {
            if(typeof error == "string"){
                toast({
                    status: "error",
                    isClosable: true,
                    title: "Error on downloading",
                    description: error
                });
            }else if (typeof error == "object" && error instanceof Error){
                toast({
                    status: "error",
                    title: "Error on executing",
                    description : error.message,
                    isClosable: true
                });
            }else{
                toast({
                    status: "error",
                    isClosable: true,
                    title: "Error on downloading",
                    description: JSON.stringify(error)
                });
            }
            
            props.toInvalidate?.map((value) => {
                queryClient.refetchQueries({
                    queryKey: value
                });
            });
        },
        onSuccess(data) {
            const title = (<MangaTitle src={data.manga} />);
            toast({
                status: data.hasFailed? "warning" : "success",
                isClosable: true,
                title: "Downloaded chapter",
                description: (
                    <React.Fragment>
                        &nbsp;
                        <React.Fragment>
                            Vol. {data.chapter.get_volume()} -
                        </React.Fragment>
                        &nbsp;
                        <React.Fragment>
                            Chap {data.chapter.get_chapter()}
                        </React.Fragment>
                        &nbsp;
                        {
                            title
                        }
                    </React.Fragment>
                )
            });
            if(props.onSuccess != undefined) props.onSuccess(data);
            props.toInvalidate?.map((value) => {
                queryClient.refetchQueries({
                    queryKey: value,
                    exact : true
                });
            });
        },
        retry : 0,
        enabled : false,
        "networkMode" : "online"
    });
    return download_query;
}

export function useChapterDataSaverDownloadMutation(props: {
    chapID: string,
    toInvalidate?: Array<QueryKey>,
    onSuccess?: (data : ChapterDeleteMutation_data & {
        hasFailed : boolean
    }) => void
}) {

    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const toast = useChakraToast({
        id : `mdx-mutation-chapter-${props.chapID}-download-data-saver`,
        position: "bottom-right",
        duration: 9000,
    });
    const download_query = useQuery<ChapterDeleteMutation_data & {
        hasFailed : boolean
    }, Error>({
        queryKey: ["mdx", "mutation", "chapter",  props.chapID, "data", "saver", "download"],
        queryFn: async () => {
            toast({
                status: "loading",
                title: "Downloading chapter"
            });
            const res = await Chapter.download_data_saver(props.chapID, client);
            const chapter = (await Chapter.get_ChapterbyId(props.chapID, client)).data;
            const manga = await chapter.get_manga(client);
            return {
                chapter: chapter,
                manga: manga,
                hasFailed : res.errors.length != 0
            };
        },
        onError(error) {
            if(typeof error == "string"){
                toast({
                    status: "error",
                    isClosable: true,
                    title: "Error on downloading",
                    description: error
                });
            }else if (typeof error == "object" && error instanceof Error){
                toast({
                    status: "error",
                    title: "Error on executing",
                    description : error.message,
                    isClosable: true
                });
            }else{
                toast({
                    status: "error",
                    isClosable: true,
                    title: "Error on downloading",
                    description: JSON.stringify(error)
                });
            }
            
        },
        onSuccess(data) {
            const title = (<MangaTitle src={data.manga} />);
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
            if(props.onSuccess != undefined) props.onSuccess(data);
            props.toInvalidate?.map((value) => {
                queryClient.refetchQueries({
                    queryKey: value
                });
            });
        },
        retry : 0,
        enabled : false,
        "networkMode" : "online"
    });
    return download_query;
}

export function useChapterDeleteMutation(props: {
    chapID: string,
    toInvalidate?: Array<QueryKey>,
    onSuccess?: (data : ChapterDeleteMutation_data) => void
}) {
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const toast = useChakraToast({
        id : `mdx-mutation-chapter-${props.chapID}-delete`,
        position: "bottom-right",
        duration: 9000,
    });
    const toastID = React.useRef<ToastId>();
    const delete_mutation = useQuery<ChapterDeleteMutation_data, Error>({
        // [ ] Refactor queryKey into a new function
        queryKey: ["mdx", "mutation", props.chapID, "chapter", "delete"],
        queryFn: async () => {
            const chap = await Chapter.get_ChapterbyId(props.chapID, client);
            const manga = await chap.data.get_manga();
            await chap.data.delete(client);
            toast({
                status: "loading",
                title: "Deleting Chapter",
                description: "It will be quick..."
            });
            return {
                chapter: chap.data,
                manga: manga
            };
        },
        onError(error) {
            toast({
                status: "error",
                isClosable: true,
                title: "Error on deleting",
                description: error.message
            });
        },
        onSuccess(data) {
            const title = (<MangaTitle src={data.manga} />);
            if (toastID.current != undefined) {
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
            if(props.onSuccess != undefined) props.onSuccess(data);
            props.toInvalidate?.map((value) => {
                queryClient.refetchQueries({
                    queryKey: value
                });
            });
        },
        retry : 0,
        enabled : false
    });
    return delete_mutation;
}

export function get_manga_of_chapter(props : {
    chapter : Chapter
}){
    // [ ] Refactor `queryKey` into a function
    const queryKey = ["mdx", "chapter", props.chapter.get_id(), "manga"];
    const queryClient = useQueryClient();
    const query = useQuery<Manga, Error>(queryKey, async () => {
        try {
            const manga_id = props.chapter.get_manga_id();
            const mangaQueryKey = get_mangaQueryKey_byID({
                mangaID : manga_id
            });
            const queryData = queryClient.getQueryData<Manga>(mangaQueryKey);
            if(queryData == undefined) {
                //Manga_with_allRelationship.getMangaByID(manga_id);
                const manga = await props.chapter.get_manga();
                return queryClient.setQueryData(mangaQueryKey, manga) ?? manga;
            }else{
                return queryData;
            }
        } catch (error) {
            const manga = await props.chapter.get_manga();
            const manga_id = manga.get_id();
            const mangaQueryKey = get_mangaQueryKey_byID({
                mangaID : manga_id
            });
            return queryClient.setQueryData(mangaQueryKey, manga) ?? manga;
        }
    });
    return {
        query,
        queryKey
    };
}
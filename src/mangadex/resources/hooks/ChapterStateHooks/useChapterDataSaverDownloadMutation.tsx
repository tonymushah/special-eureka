import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import MangaTitle from "../../componnents/mangas/v1/MangaTitle";
import { ChapterDeleteMutation_data } from "./ChapterDeleteMutation_data";


export function useChapterDataSaverDownloadMutation(props: {
    chapID: string;
    toInvalidate?: Array<QueryKey>;
    onSuccess?: (data: ChapterDeleteMutation_data & {
        hasFailed: boolean;
    }) => void;
}) {

    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const toast = useChakraToast({
        id: `mdx-mutation-chapter-${props.chapID}-download-data-saver`,
        position: "bottom-right",
        duration: 9000,
    });
    const download_query = useQuery<ChapterDeleteMutation_data & {
        hasFailed: boolean;
    }, Error>({
        queryKey: ["mdx", "mutation", "chapter", props.chapID, "data", "saver", "download"],
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
                hasFailed: res.errors.length != 0
            };
        },
        onError(error) {
            if (typeof error == "string") {
                toast({
                    status: "error",
                    isClosable: true,
                    title: "Error on downloading",
                    description: error
                });
            } else if (typeof error == "object" && error instanceof Error) {
                toast({
                    status: "error",
                    title: "Error on executing",
                    description: error.message,
                    isClosable: true
                });
            } else {
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
                        {title}
                    </React.Fragment>
                )
            });
            if (props.onSuccess != undefined) props.onSuccess(data);
            props.toInvalidate?.map((value) => {
                queryClient.refetchQueries({
                    queryKey: value
                });
            });
        },
        retry: 0,
        enabled: false,
        "networkMode": "online"
    });
    return download_query;
}

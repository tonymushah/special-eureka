import { ToastId } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import MangaTitle from "../../componnents/mangas/v1/MangaTitle";
import { ChapterDeleteMutation_data } from "./ChapterDeleteMutation_data";


export function useChapterDeleteMutation(props: {
    chapID: string;
    toInvalidate?: Array<QueryKey>;
    onSuccess?: (data: ChapterDeleteMutation_data) => void;
}) {
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const toast = useChakraToast({
        id: `mdx-mutation-chapter-${props.chapID}-delete`,
        position: "bottom-right",
        duration: 9000,
    });
    const toastID = React.useRef<ToastId>();
    const _queryKey_ = React.useMemo(() => queryKey(props), []);
    const delete_mutation = useQuery<ChapterDeleteMutation_data, Error>({
        // [x] Refactor queryKey into a new function
        queryKey: _queryKey_,
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
                            <React.Fragment>
                                Vol. {data.chapter.get_volume()} -
                            </React.Fragment>
                            &nbsp;
                            <React.Fragment>
                                Chap {data.chapter.get_chapter()}
                            </React.Fragment>
                            &nbsp;
                            {title}
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
                            <React.Fragment>
                                Vol. {data.chapter.get_volume()} -
                            </React.Fragment>
                            &nbsp;
                            <React.Fragment>
                                Chap {data.chapter.get_chapter()}
                            </React.Fragment>
                            &nbsp;
                            {title}
                        </React.Fragment>
                    )
                });
            }
            if (props.onSuccess != undefined) props.onSuccess(data);
            props.toInvalidate?.map((value) => {
                queryClient.refetchQueries({
                    queryKey: value
                });
            });
        },
        retry: 0,
        enabled: false
    });
    return delete_mutation;
}

export function queryKey(props: { chapID: string; toInvalidate?: QueryKey[] | undefined; onSuccess?: ((data: ChapterDeleteMutation_data) => void) | undefined; }) {
    return ["mdx", "mutation", props.chapID, "chapter", "delete"];
}
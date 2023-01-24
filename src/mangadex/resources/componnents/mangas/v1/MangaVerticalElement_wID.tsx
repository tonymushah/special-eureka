import { useToast } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";
import { Manga } from "../../../../api/structures/Manga";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaVerticalElementFallback from "./MangaVerticalElementFallback";

const MangaVerticalElement = React.lazy(() => import("./MangaVerticalElement"));

export default function MangaVerticalElement_wID(props: {
    mangaID: string
}) {
    const toast = useToast({
        position: "bottom-right"
    });
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const key = "mdx-manga:" + props.mangaID;
    const query = useQuery<Manga, Error>(key, () => {
        return Manga.getMangaByID(props.mangaID, client);
    }, {
        "staleTime": Infinity
    });
    const delete_ = useMutation({
        mutationFn: () => {
            toast({
                position: "bottom-right",
                title: "Deleting manga...",
                status: "loading",
                duration: 9000,
                isClosable: true
            });
            return query.data!.delete_this(client)
        },
        onSuccess: () => {
            toast({
                position: "bottom-right",
                title: "Deleted manga",
                status: "success",
                duration: 9000,
                isClosable: true
            })
            queryClient.removeQueries({
                queryKey: key
            })
        },
        onError(error: any, variables, context) {
            toast({
                position: "bottom-right",
                title: "Error on deleting manga",
                status: "error",
                description: error.message,
                variant: "solid",
                duration: 9000,
                isClosable: true
            })
        },
    });
    const download_ = useMutation({
        mutationFn: () => {
            toast({
                title: "Downloading manga...",
                status: "loading",
                duration: 9000
            });
            return Manga.download_manga(query.data!.get_id(), client)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: key
            })
        },
        onError(error: Error, variables, context) {
            toast({
                position: "bottom-right",
                title: "Error on downloading manga",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true
            })
        },
    })
    if (query.isLoading) {
        return (
            <MangaVerticalElementFallback />
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        )
    }
    return (
        <React.Suspense fallback={
            <MangaVerticalElementFallback />
        }>
            <MangaVerticalElement 
                src={query.data!}
                isRefetching={query.isRefetching}
                refetch={query.refetch}
                download={download_.mutate}
                delete={delete_.mutate}
            />
        </React.Suspense>
    )
}
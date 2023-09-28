import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import Manga from "@mangadex/api/structures/Manga";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { get_manga_byId } from "./get_manga_byId";
import React from "react";

export function useMangaDelete(props: {
    mangaID: string;
}) {
    const client = useHTTPClient();
    const toast = useChakraToast({
        id: `mdx-mutation-manga-${props.mangaID}-delete`,
        position: "bottom-right",
        duration: 9000
    });
    const manga_query = get_manga_byId({
        mangaID: props.mangaID
    });
    // [x] Refactor query key into a new function
    const key = React.useMemo<QueryKey>(() => queryKey(props), []);
    const query = useQuery(key, () => {
        toast({
            title: "Deleting manga...",
            status: "loading",
            isClosable: true
        });
        return Manga.delete_aDownloaded_manga(props.mangaID, client);
    }, {
        onSuccess: () => {
            toast({
                title: "Deleted manga",
                status: "success",
                isClosable: true
            });
            manga_query.query.refetch();
        },
        onError(error) {
            toast({
                title: "Error on deleting manga",
                status: "error",
                description: JSON.stringify(error),
                variant: "solid",
                isClosable: true
            });
        },
        enabled: false
    });
    return query;
}

export function queryKey(props: { mangaID: string; }) {
    return ["mdx", "manga", props.mangaID, "mutation", "delete"];
}
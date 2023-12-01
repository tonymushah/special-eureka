import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { Alt_title } from "@mangadex/api/internal/Utils";
import Manga from "@mangadex/api/structures/Manga";
import { QueryKey, useQuery } from "@tanstack/react-query";
import get_manga_byId from "./get_manga_byId";
import React from "react";
import isMangaDonwloaded from "./isMangaDownloaded";

export default function useMangaDownload(props: {
    mangaID: string;
}) {
    const client = useHTTPClient();
    const toast = useChakraToast({
        id: `manga-download-${props.mangaID}`,
        position: "bottom-right",
        duration: 9000
    });
    const is_downloaded = isMangaDonwloaded({
        variables: {
            mangaId: props.mangaID,
            client
        }
    });
    const manga_query = get_manga_byId({
        mangaID: props.mangaID
    });
    // [x] Refactor query into a new function 
    const key = React.useMemo<QueryKey>(() => queryKey(props), []);
    const query = useQuery(key, async () => {
        toast({
            title: "Downloading manga...",
            status: "loading",
            duration: 9000
        });
        return await Manga.download_manga(props.mangaID, client);
    }, {
        onSuccess: (manga) => {
            let title = "";
            if (manga.get_title().en == null) {
                title = new Alt_title(manga.get_alt_title()).get_quicklang() ?? manga.get_id();
            } else {
                title = manga.get_title().en;
            }
            toast({
                title: "Downloaded manga",
                status: "success",
                description: title,
                isClosable: true
            });
            manga_query.query.refetch();
            is_downloaded.refetch();
        },
        onError(error) {
            toast({
                title: "Error on downloading manga",
                description: JSON.stringify(error),
                status: "error",
                isClosable: true
            });
        },
        enabled: false,
        "networkMode": "online"
    });
    return query;
}
function queryKey(props: { mangaID: string; }) {
    return ["mdx", "manga", props.mangaID, "mutation", "download"];
}


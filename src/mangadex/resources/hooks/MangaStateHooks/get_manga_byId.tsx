import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import Manga, { GetMangaByIDResponse, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import React from "react";
import get_mangaQueryKey_byID from "./get_mangaQueryKey_byID";


export default function get_manga_byId(props: {
    mangaID: string;
    with_all_includes?: boolean;
    options?: Omit<UseQueryOptions<GetMangaByIDResponse, Error>, "queryKey" | "queryFn">;
}) {
    const client = useHTTPClient();
    // [x] use `React.useMemo()` for optimization
    const key = React.useMemo(() => get_mangaQueryKey_byID(props), []);
    const query = useQuery<GetMangaByIDResponse, Error>(key, () => {
        if (props.with_all_includes == true) {
            return Manga_with_allRelationship.getMangaByID(props.mangaID, client);
        } else {
            return Manga.getMangaByID(props.mangaID, client);
        }
    }, props.options == undefined ? {
        "staleTime": Infinity
    } : {
        ...props.options,
        "staleTime": Infinity
    });
    return {
        key,
        query
    };
}

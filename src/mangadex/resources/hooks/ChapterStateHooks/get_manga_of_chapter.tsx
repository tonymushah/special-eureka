import { Chapter } from "@mangadex/api/structures/Chapter";
import Manga, { GetMangaByIDResponse } from "@mangadex/api/structures/Manga";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import get_mangaQueryKey_byID from "../MangaStateHooks/get_mangaQueryKey_byID";
import React from "react";


export function get_manga_of_chapter(props: {
    chapter: Chapter;
}) {
    // [x] Refactor `_queryKey_` into a function
    const _queryKey_ = React.useMemo(() => queryKey(props), []);
    const queryClient = useQueryClient();
    const query = useQuery<Manga, Error>(_queryKey_, async () => {
        try {
            const manga_id = props.chapter.get_manga_id();
            const mangaQueryKey = get_mangaQueryKey_byID({
                mangaID: manga_id
            });
            const queryData = queryClient.getQueryData<GetMangaByIDResponse>(mangaQueryKey);
            if (queryData == undefined) {
                //Manga_with_allRelationship.getMangaByID(manga_id);
                const manga = await props.chapter.get_manga();
                return queryClient.setQueryData<GetMangaByIDResponse>(mangaQueryKey, {
                    isOffline : false,
                    manga
                })?.manga ?? manga;
            } else {
                return queryData.manga;
            }
        } catch (error) {
            const manga = await props.chapter.get_manga();
            const manga_id = manga.get_id();
            const mangaQueryKey = get_mangaQueryKey_byID({
                mangaID: manga_id
            });
            return queryClient.setQueryData<GetMangaByIDResponse>(mangaQueryKey, {
                isOffline : false,
                manga
            })?.manga ?? manga;
        }
    });
    return {
        query,
        queryKey : _queryKey_
    };
}

export function queryKey(props: { chapter: Chapter; }) {
    return ["mdx", "chapter", props.chapter.get_id(), "manga"];
}


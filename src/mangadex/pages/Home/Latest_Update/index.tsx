import React from "react";
import { QueryClient, UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Chapter, Chapter_withAllIncludes } from "@mangadex/api/structures/Chapter";
import Collection from "@mangadex/api/structures/Collection";
import { get_chapter_queryKey } from "@mangadex/resources/hooks/ChapterStateHooks/get_chapter_queryKey";
import GetChapterByIdResult from "@mangadex/api/structures/additonal_types/GetChapterByIdResult";
import { GetMangaByIDResponse, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { get_mangaQueryKey_byID } from "@mangadex/resources/hooks/MangaStateHooks/get_mangaQueryKey_byID";
import { Client } from "@tauri-apps/api/http";
import UserOptions from "@mangadex/api/internal/UserOptions";
import { OnError } from "./OnError";
import { OnSuccess } from "./OnSuccess";
import { OnLoading } from "./OnLoading";

const limit = 12;

export async function loader({
    client,
    queryClient
}: {
    client: Client | undefined,
    queryClient: QueryClient
}) {
    const offset_limits_2: Offset_limits = new Offset_limits();
    offset_limits_2.set_limits(limit);
    const search_result = await Chapter_withAllIncludes.search({
        offset_limits: offset_limits_2,
        order: new Order("desc"),
        translatedLanguage: (await new UserOptions().getLanguages()).map((value) => value.get_two_letter()),
        client: client
    });
    search_result.get_data().forEach((chapter) => {
        Chapter.downloaded(chapter.get_id(), client).then((value) => {
            const queryKey = get_chapter_queryKey({
                id: chapter.get_id()
            });
            queryClient.fetchQuery<GetChapterByIdResult>(queryKey, async () => {
                return await Chapter.get_ChapterbyId(chapter.get_id(), client);
            }, {
                initialData: {
                    "data": chapter,
                    hasFailed: value.hasFailed,
                    "isDownloaded": value.isDownloaded
                }
            });
        });
    });
    const mangaIDs = search_result.get_data().map((value) => value.get_manga_id());
    const newMangaOffset = new Offset_limits();
    newMangaOffset.set_limits(mangaIDs.length);
    (await Manga_with_allRelationship.search({
        offset_Limits: newMangaOffset,
        mangaIDs: mangaIDs
    })).get_data().forEach((manga) => {
        const mangaQueryKey = get_mangaQueryKey_byID({
            mangaID: manga.get_id()
        });
        queryClient.fetchQuery<GetMangaByIDResponse>(mangaQueryKey, async function () {
            return await Manga_with_allRelationship.getMangaByID(manga.get_id());
        }, {
            initialData: {
                isOffline: false,
                manga: manga
            }
        });
    });
    return search_result;
}

/// [x] Refactor into a function
export function queryKey() {
    return ["mdx", "home_page", "latest_update"];
}

const context = React.createContext<UseQueryResult<Collection<Chapter_withAllIncludes>, Error> | undefined>(undefined);

export function useHomeLatest_Updates() {
    const data = React.useContext(context);
    if (data) {
        return data;
    } else {
        throw new Error("The Home Latest Updates Provider is not defined! Somehow...");
    }
}

export function HomeLatest_UpdatesProvider({ query, children }: React.PropsWithChildren<{
    query: UseQueryResult<Collection<Chapter_withAllIncludes>, Error>
}>) {
    return (
        <context.Provider value={query}>
            {
                children
            }
        </context.Provider>
    );
}

export default function Latest_Updates() {
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const key = React.useMemo(() => queryKey(), []);
    const query = useQuery<Collection<Chapter_withAllIncludes>, Error>(key, () => {
        return loader({
            client,
            queryClient
        });
    }, {
        staleTime: Infinity,
    });
    if (query.isError) {
        return (
            <HomeLatest_UpdatesProvider query={query}>
                <OnError />
            </HomeLatest_UpdatesProvider>
        );
    }
    if (query.isSuccess) {
        return (
            <HomeLatest_UpdatesProvider query={query}>
                <OnSuccess />
            </HomeLatest_UpdatesProvider>
        );
    }
    return (
        <HomeLatest_UpdatesProvider query={query}>
            <OnLoading fallbacksNumber={limit} />
        </HomeLatest_UpdatesProvider>
    );
}

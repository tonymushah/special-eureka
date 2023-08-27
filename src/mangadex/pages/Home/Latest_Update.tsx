import * as Chakra from "@chakra-ui/react";
import React from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Chapter, Chapter_withAllIncludes } from "@mangadex/api/structures/Chapter";
import { Collection } from "@mangadex/api/structures/Collection";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MangaElementFallback from "@mangadex/resources/componnents/mangas/v1/MangaElementFallback";
import { get_chapter_queryKey } from "@mangadex/resources/hooks/ChapterStateHooks";
import GetChapterByIdResult from "@mangadex/api/structures/additonal_types/GetChapterByIdResult";
import { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { get_mangaQueryKey_byID } from "@mangadex/resources/hooks/MangaStateHooks";
import { Client } from "@tauri-apps/api/http";
import UserOptions from "@mangadex/api/internal/UserOptions";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

const MangaFeedElement = React.lazy(() => import("@mangadex/resources/componnents/chapter/v1/MangaFeedElement"));

export async function loader({
    client,
    queryClient
}: {
    client: Client,
    queryClient: QueryClient
}) {
    const offset_limits_2: Offset_limits = new Offset_limits();
    offset_limits_2.set_limits(12);
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
            queryClient.setQueryData<GetChapterByIdResult>(queryKey, {
                "data": chapter,
                hasFailed: value.hasFailed,
                "isDownloaded": value.isDownloaded
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
        queryClient.setQueryData(mangaQueryKey, manga);
    });
    return search_result;
}

/// [x] Refactor into a function
export function queryKey() {
    return ["mdx", "home_page", "latest_update"];
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
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"}>Latest Updates</Chakra.Heading>
                <Chakra.Button
                    colorScheme={"orange"}
                    onClick={() => query.refetch()}
                    isLoading={query.isLoading || query.isRefetching}
                >
                    Refetch
                </Chakra.Button>
                <ErrorEL1 error={query.error} />
            </Chakra.Box>
        );
    }
    if (query.isSuccess) {
        return (
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"}>Latest Updates</Chakra.Heading>
                <Chakra.Button
                    colorScheme={"orange"}
                    onClick={() => query.refetch()}
                    isLoading={query.isLoading || query.isRefetching}
                >
                    Refetch
                </Chakra.Button>
                <Chakra.Wrap>
                    {query.data.get_data().map((value: Chapter) => (
                        <Chakra.WrapItem key={value.get_id()}>
                            <React.Suspense
                                fallback={
                                    <MangaElementFallback />
                                }
                            >
                                <MangaFeedElement src={value} />
                            </React.Suspense>
                        </Chakra.WrapItem>
                    ))}
                </Chakra.Wrap>
            </Chakra.Box>
        );
    }
    return (
        <Chakra.Box>
            <Chakra.Heading fontFamily={"inherit"}>Latest Updates</Chakra.Heading>
            <Chakra.Button
                colorScheme={"orange"}
                onClick={() => query.refetch()}
                isLoading={query.isLoading}
            >
                Refetch
            </Chakra.Button>
            <Chakra.Box
                marginTop={"25px"}
                marginBottom={"25px"}
            >
                <Chakra.Center>
                    <MangadexSpinner
                        size="xl"
                        color='orange.500'
                        thickness='4px'
                    />
                </Chakra.Center>
            </Chakra.Box>
        </Chakra.Box>
    );
}

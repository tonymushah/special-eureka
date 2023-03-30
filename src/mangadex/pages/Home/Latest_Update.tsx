import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Chapter, Chapter_withAllIncludes } from "@mangadex/api/structures/Chapter";
import { Collection } from "@mangadex/api/structures/Collection";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MangaElementFallback from "@mangadex/resources/componnents/mangas/v1/MangaElementFallback";
import { get_chapter_queryKey } from "@mangadex/resources/hooks/ChapterStateHooks";
import GetChapterByIdResult from "@mangadex/api/structures/additonal_types/GetChapterByIdResult";

const MangaFeedElement = React.lazy(() => import("@mangadex/resources/componnents/chapter/v1/MangaFeedElement"));

export default function Latest_Updates() {
    const offset_limits_2: Offset_limits = new Offset_limits();
    offset_limits_2.set_limits(12);
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const key = "mdx-home_page-latest_update";
    const query = useQuery<Collection<Chapter_withAllIncludes>, Error>(key, async () => {
        const search_result = await Chapter_withAllIncludes.search({
            offset_limits: offset_limits_2,
            order: new Order("desc"),
            client: client
        });
        search_result.get_data().forEach((chapter) => {
            Chapter.downloaded(chapter.get_id(), client).then((value) => {
                const queryKey = get_chapter_queryKey({
                    id : chapter.get_id()
                });
                queryClient.setQueryData<GetChapterByIdResult>(queryKey, {
                    "data" : chapter,
                    hasFailed : value.hasFailed,
                    "isDownloaded" : value.isDownloaded
                });
            });
        });
        return search_result;
    }, {
        staleTime: Infinity
    });
    if (query.isLoading) {
        return (
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"}>Latest Updates</Chakra.Heading>
                <Chakra.Button
                    colorScheme={"orange"}
                    onClick={() => query.refetch()}
                >
                    Refetch
                </Chakra.Button>
                <Chakra.Box
                    marginTop={"25px"}
                    marginBottom={"25px"}
                >
                    <Chakra.Center>
                        <Chakra.Spinner
                            size="xl"
                            color='orange.500'
                            thickness='4px'
                        />
                    </Chakra.Center>
                </Chakra.Box>
            </Chakra.Box>
        );
    }
    if (query.isError) {
        return (
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"}>Latest Updates</Chakra.Heading>
                <Chakra.Button
                    colorScheme={"orange"}
                    onClick={() => query.refetch()}
                >
                    Refetch
                </Chakra.Button>
                <ErrorEL1 error={query.error} />
            </Chakra.Box>
        );
    }
    return (
        <Chakra.Box>
            <Chakra.Heading fontFamily={"inherit"}>Latest Updates</Chakra.Heading>
            <Chakra.Button
                colorScheme={"orange"}
                onClick={() => query.refetch()}
            >
                Refetch
            </Chakra.Button>
            <Chakra.Wrap>
                {query.data!.get_data().map((value: Chapter) => (
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

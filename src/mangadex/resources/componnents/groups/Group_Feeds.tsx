import React from "react";
import * as Chakra from "@chakra-ui/react";

import TryCatch from "@commons-res/components/TryCatch";
import { Asc_Desc, get_MangaChapter_Accordions_byChapterArray, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Collection } from "@mangadex/api/structures/Collection";
import { CollectionComponnent_WithQuery } from "@mangadex/resources/componnents/Collection/Collection";
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";

import { Chapter } from "@mangadex/api/structures/Chapter";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useQueryClient } from "@tanstack/react-query";
import GetChapterByIdResult from "@mangadex/api/structures/additonal_types/GetChapterByIdResult";
import { get_chapter_queryKey } from "@mangadex/resources/hooks/ChapterStateHooks";

const MangaChapterAccordion_Element = React.lazy(() => import("../mangas/v1/MangaChapterAccordion_Element"));


export default function Group_Feeds(props: {
    id: string
}) {
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    return (
        <CollectionComponnent_WithQuery<Chapter>
            queryKey={["mdx", "group_feeds", props.id]}
            fn={async () => {
                const offset_Limits = new Offset_limits();
                offset_Limits.set_limits(25);
                const search_result = await Chapter.search({
                    offset_limits: offset_Limits,
                    "group": [
                        props.id
                    ],
                    order: new Order(Asc_Desc.desc()),
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
                return search_result;
            }}
            query_options={{
                staleTime: Infinity
            }}
        >
            {
                (value1: Collection<Chapter>) => (
                    <TryCatch
                        catch={(error) => (
                            <Chakra.Alert status="error">
                                <Chakra.AlertIcon />
                                <Chakra.AlertTitle>
                                    {
                                        error.name
                                    }
                                </Chakra.AlertTitle>
                                <Chakra.AlertDescription>
                                    {
                                        error.message
                                    }
                                </Chakra.AlertDescription>
                            </Chakra.Alert>
                        )}
                    >
                        <React.Suspense
                            fallback={<div>Loading...</div>}
                        >
                            <Chakra.Stack>
                                {
                                    get_MangaChapter_Accordions_byChapterArray(value1.get_data()).map(value2 => (
                                        <React.Suspense
                                            fallback={
                                                <MangaFallback2 />
                                            }
                                            key={value2.$mangaid}
                                        >
                                            <MangaChapterAccordion_Element src={value2} />
                                        </React.Suspense>
                                    ))
                                }
                            </Chakra.Stack>
                        </React.Suspense>
                    </TryCatch>
                )
            }
        </CollectionComponnent_WithQuery>
    );
}

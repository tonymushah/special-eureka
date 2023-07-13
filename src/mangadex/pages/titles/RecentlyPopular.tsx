import CollectionComponnent_WithQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_WithQuery";
import * as Chakra from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { formatDate, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Asc_Desc } from "@mangadex/api/internal/Utils";
import { Manga, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTrackEvent } from "@mangadex/index";

const MangaPopularElement = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangadexPopularElement"));

export default function RecentlyPopularPage() {
    const client = useHTTPClient();
    const offset_limits = new Offset_limits();
    offset_limits.set_limits(10);
    const order = new Order();
    order.set_followedCount(Asc_Desc.desc());
    const touse_date_ = new Date();
    touse_date_.setMonth(touse_date_.getMonth() - 1);
    const touse_date = formatDate(touse_date_);
    const queryKey = ["mdx", "popular-recent-titles"];
    const queryClient = useQueryClient();
    useTrackEvent("mangadex-latest-update-entrance");
    return (
        <React.Fragment>
            <Chakra.Heading fontFamily={"inherit"}>Recent Popular Titles</Chakra.Heading>
            <CollectionComponnent_WithQuery<Manga>
                queryKey={queryKey}
                fn={() => {
                    return Manga_with_allRelationship.search({
                        offset_Limits: offset_limits,
                        order: order,
                        client,
                        createdAtSince: touse_date,
                        hasAvailableChapters: true
                    });
                }}
                query_options={{
                    staleTime: Infinity
                }}
            >
                {(data) => (
                    <Chakra.Box>
                        <Chakra.VStack display={"block"} divider={
                            <Chakra.Divider />
                        }>
                            {data.get_data().map((value, index) => {
                                queryClient.setQueryData(["mdx", "manga", value.get_id()], value);
                                return (
                                    <Chakra.Card key={value.get_id()}>
                                        {
                                            data.get_offset() + index == 0 ? (
                                                <Heading m={2} fontFamily={"inherit"} color={"orange"} size={"sm"}>No.{data.get_offset() + index + 1}</Heading>
                                            ) : (
                                                <Heading m={2} fontFamily={"inherit"} size={"sm"}>No.{data.get_offset() + index + 1}</Heading>
                                            )
                                        }
                                        <React.Suspense
                                            fallback={
                                                <MangaFallback2 />
                                            }
                                        >
                                            <MangaPopularElement src={value} />
                                        </React.Suspense>
                                    </Chakra.Card>
                                );
                            })}
                        </Chakra.VStack>
                    </Chakra.Box>
                )}
            </CollectionComponnent_WithQuery>

        </React.Fragment>
    );
}
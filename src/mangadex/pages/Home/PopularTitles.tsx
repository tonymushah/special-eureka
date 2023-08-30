import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { formatDate, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Asc_Desc } from "@mangadex/api/internal/Utils";
import { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Keyboard, Navigation } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Heading } from "@chakra-ui/react";
import { Client } from "@tauri-apps/api/http";
import randomInteger from "random-int";

const MangaPopularElement = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangadexPopularElement"));

export async function loader({
    client
}: {
    client: Client
}) {
    const offset_limits = new Offset_limits();
    offset_limits.set_limits(10);
    const order = new Order();
    order.set_followedCount(Asc_Desc.desc());
    const touse_date_ = new Date();
    touse_date_.setMonth(touse_date_.getMonth() - 1);
    const touse_date = formatDate(touse_date_);
    return await Manga_with_allRelationship.search({
        offset_Limits: offset_limits,
        order: order,
        client,
        createdAtSince: touse_date,
        hasAvailableChapters: true
    });
}

export const queryKey = () => ["mdx", "popular-recent-titles"];

export default function RecentlyPopular() {
    const client = useHTTPClient();
    const key = React.useMemo(() => queryKey(), []);
    const query = useQuery(key, () => {
        return loader({ client });
    }, {
        staleTime: Infinity
    });
    const queryClient = useQueryClient();
    if (query.isSuccess == true) {
        return (
            <Chakra.Box width={"100%"}>
                <Chakra.Heading fontFamily={"inherit"}>Recent Popular Titles</Chakra.Heading>
                <Chakra.Box>
                    {query.isSuccess == true ? (
                        <Swiper
                            tabIndex={randomInteger(0, query.data.get_data().length - 1)}
                            navigation={true}
                            keyboard={true}
                            modules={[Navigation, Keyboard]}
                        >
                            {
                                query.data.get_data().map((value, index) => {
                                    /// Refactor into a function
                                    queryClient.setQueryData(["mdx", "manga", value.get_id()], value);
                                    return (
                                        <SwiperSlide
                                            key={value.get_id()}
                                        >
                                            {
                                                index == 0 ? (
                                                    <Heading m={2} fontFamily={"inherit"} color={"orange"} size={"sm"}>No.{index + 1}</Heading>
                                                ) : (
                                                    <Heading m={2} fontFamily={"inherit"} size={"sm"}>No.{index + 1}</Heading>
                                                )
                                            }
                                            <React.Suspense
                                                fallback={
                                                    <MangaFallback2 />
                                                }
                                            >
                                                <MangaPopularElement src={value}/>
                                            </React.Suspense>
                                        </SwiperSlide>
                                    );
                                })}
                        </Swiper>
                    ) : (
                        <></>
                    )}
                </Chakra.Box>
            </Chakra.Box>
        );
    }
    return (
        <MangaFallback2 />
    );
}
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Asc_Desc, formatDate, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Keyboard, Navigation } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Heading } from "@chakra-ui/react";

const MangaPopularElement = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangadexPopularElement"))


export default function RecentlyPopular() {
    const client = useHTTPClient();
    const offset_limits = new Offset_limits();
    offset_limits.set_limits(10)
    const order = new Order();
    order.set_followedCount(Asc_Desc.desc());
    const touse_date_ = new Date();
    touse_date_.setMonth(touse_date_.getMonth() - 1);
    const touse_date = formatDate(touse_date_);
    const queryKey = "mdx-popular-recent-titles";
    const query = useQuery(queryKey, () => {
        return Manga_with_allRelationship.search({
            offset_Limits: offset_limits,
            order: order,
            client,
            createdAtSince: touse_date,
            hasAvailableChapters: true
        })
    }, {
        staleTime: Infinity
    });
    const queryClient = useQueryClient();
    if (query.isSuccess == true) {
        return (
            <React.Fragment>
                <Chakra.Heading fontFamily={"inherit"}>Recent Popular Titles</Chakra.Heading>
                <Chakra.Box>
                    {query.isSuccess == true ? (
                        <Swiper
                            navigation={true}
                            keyboard={true}
                            modules={[Navigation, Keyboard]}
                        >
                            {query.data.get_data().map((value, index) => {
                                queryClient.setQueryData("mdx-manga:" + value.get_id(), value);
                                return (
                                    <SwiperSlide>
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
                                            <MangaPopularElement src={value} />
                                        </React.Suspense>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    ) : (
                        <></>
                    )}
                </Chakra.Box>
            </React.Fragment>
        )
    }
    return (
        <MangaFallback2 />
    )
}
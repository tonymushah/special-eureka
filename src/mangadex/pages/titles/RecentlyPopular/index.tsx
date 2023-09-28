import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Asc_Desc, formatDate, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import Manga, { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { useTrackEvent } from "@mangadex/index";
import CollectionComponnent_withInfiniteQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_withInfiniteQuery";
import { InfiniteQueryConsumer } from "@mangadex/resources/componnents/Collection/InfiniteQueryConsumer";
import React from "react";
import { MangaComponnent } from "./MangaComponnent";

export const MangaPopularElement = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangadexPopularElement"));

export default function RecentlyPopularPage() {
    const client = useHTTPClient();
    const { offset_limits, order, touse_date } = useState();
    /// [x] Refactor into a function
    const query_Key = React.useMemo(() => queryKey(), []);
    useTrackEvent("mangadex-latest-update-entrance");
    return (
        <React.Fragment>
            <Chakra.Heading fontFamily={"inherit"}>Recent Popular Titles</Chakra.Heading>
            <CollectionComponnent_withInfiniteQuery<Manga>
                queryKey={query_Key}
                queryFn={() => {
                    return Manga_with_allRelationship.search({
                        offset_Limits: offset_limits,
                        order: order,
                        client,
                        createdAtSince: touse_date,
                        hasAvailableChapters: true
                    });
                }}
                options={{
                    staleTime: Infinity
                }}
            >
                {(query) => (
                    <InfiniteQueryConsumer<Manga> query={query}>
                        {(collections) => (
                            <React.Fragment>
                                {
                                    collections.map((data) => (
                                        <Chakra.Box key={`${data.get_current_page()}-popular`}>
                                            <Chakra.VStack display={"block"} divider={
                                                <Chakra.Divider />
                                            }>
                                                {data.get_data().map((value, index) => (
                                                    <MangaComponnent value={value} data={data} index={index} key={`recently-popular-${value.get_id()}`} />
                                                ))}
                                            </Chakra.VStack>
                                        </Chakra.Box>
                                    ))
                                }
                            </React.Fragment>
                        )}
                    </InfiniteQueryConsumer>
                )}
            </CollectionComponnent_withInfiniteQuery>

        </React.Fragment>
    );
}

export function queryKey() {
    return ["mdx", "popular-recent-titles"];
}

function useState() {
    return React.useMemo(() => {
        const offset_limits = new Offset_limits();
        offset_limits.set_limits(10);
        const order = new Order();
        order.set_followedCount(Asc_Desc.desc());
        const touse_date_ = new Date();
        touse_date_.setMonth(touse_date_.getMonth() - 1);
        const touse_date = formatDate(touse_date_);
        return { offset_limits, order, touse_date };
    }, []);
}

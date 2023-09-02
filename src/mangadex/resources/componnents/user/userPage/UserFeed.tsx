import { Box } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Asc_Desc, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Chapter, Chapter_withAllIncludes } from "@mangadex/api/structures/Chapter";
import { getUserFeedQueryKey } from "@mangadex/resources/hooks/UserPageHooks/getUserFeedQueryKey";
import React from "react";
import CollectionComponnent_withInfiniteQuery from "../../Collection/CollectionComponnent_withInfiniteQuery";
import { InfiniteQueryConsumer } from "../../Collection/InfiniteQueryConsumer";
import ChapterCollectionToAccordion from "../../mangas/v1/ChapterCollectionToAccordion";

export default function UserFeed(props: {
    user_id: string
}) {
    const client = useHTTPClient();
    const queryKey = React.useMemo(() => getUserFeedQueryKey(props), []);
    return (
        <Box>
            <CollectionComponnent_withInfiniteQuery<Chapter>
                queryFn={async ({ pageParam: offset_limits = new Offset_limits(0, 25) }) => {
                    const order: Order = new Order().set_createdAt(Asc_Desc.desc());
                    return Chapter_withAllIncludes.search({
                        client: client,
                        "uploader": props.user_id,
                        offset_limits: offset_limits,
                        order
                    });
                }}
                queryKey={queryKey}
            >
                {(query) => (
                    <InfiniteQueryConsumer<Chapter> query={query}>
                        {(collections) => {
                            console.log(collections);
                            return (
                                <React.Fragment>
                                    {
                                        collections?.map((value) => (
                                            <ChapterCollectionToAccordion value={value} key={`${value.get_current_page()}`} />
                                        )) ?? <React.Fragment />
                                    }
                                </React.Fragment>
                            );
                        }}
                    </InfiniteQueryConsumer>
                )}
            </CollectionComponnent_withInfiniteQuery>
        </Box>
    );
}

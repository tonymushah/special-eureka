import * as Chakra from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { get_MangaChapter_Accordions_byChapterArray, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Asc_Desc } from "@mangadex/api/internal/Utils";
import { Chapter, Chapter_withAllIncludes } from "@mangadex/api/structures/Chapter";
import CollectionComponnent_WithQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_WithQuery";
import MangaChapterAccordion_Element from "@mangadex/resources/componnents/mangas/v1/MangaChapterAccordion_Element";
import { getUserFeedQueryKey } from "@mangadex/resources/hooks/UserPageHooks/getUserFeedQueryKey";

export default function UserFeed(props : {
    user_id : string
}){
    const client = useHTTPClient();
    const queryKey = getUserFeedQueryKey(props);
    return (
        <Box>
            <CollectionComponnent_WithQuery<Chapter>
                fn={() => {
                    const offset_limits = new Offset_limits();
                    offset_limits.set_limits(25);
                    const order : Order = new Order().set_readableAt(Asc_Desc.desc());
                    return Chapter_withAllIncludes.search({
                        client: client,
                        "uploader": props.user_id,
                        offset_limits: offset_limits,
                        order
                    });
                }}
                queryKey={queryKey}
            >
                {(value) => {
                    const chapter_accordion = get_MangaChapter_Accordions_byChapterArray(value.get_data());
                    return (
                        <Chakra.Box>
                            {
                                chapter_accordion.map((value_) => (
                                    <Chakra.Box key={value_.$mangaid}
                                        m={2}
                                    >
                                        <MangaChapterAccordion_Element src={value_} />
                                    </Chakra.Box>
                                ))
                            }
                        </Chakra.Box>
                    );
                }}
            </CollectionComponnent_WithQuery>
        </Box>
    );
}

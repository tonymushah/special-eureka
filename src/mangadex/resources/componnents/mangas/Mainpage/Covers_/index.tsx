import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Cover } from "@mangadex/api/structures/Cover";
import Manga from "@mangadex/api/structures/Manga";
import { CollectionComponnent_WithQuery } from "../../../Collection/Collection";
import MangadexSpinner from "../../../kuru_kuru/MangadexSpinner";
import MangaPage_Cover from "../covers";
import { useState } from "./useState";
import { Order } from "@mangadex/api/internal/Utils";

//const Cover_Plus_Zoom = React.lazy(() => import("../../covers/utils/Cover_Plus_Zoom"));

export type MangaPageProps = {
    src: Manga
}

export function Covers_Manga(props: MangaPageProps) {
    const client = useHTTPClient();
    const { offset_limits, queryKey } = useState(props);
    return (
        <CollectionComponnent_WithQuery<Cover>
            fn={() => {
                return Cover.search({
                    offset_Limits: offset_limits,
                    mangaIDs: [
                        props.src.get_id()
                    ],
                    order : new Order().set_volume("asc"),
                    client: client
                });
            }}
            queryKey={queryKey}
            query_options={{
                staleTime: 1000 * 60 * 30
            }}
            onLoading={
                <Chakra.Box
                    width={"full"}
                    height={"100vh"}
                >
                    <Chakra.Center>
                        <MangadexSpinner
                            size={"lg"}
                            thickness={"2px"}
                            color={"orange"}
                        />
                    </Chakra.Center>
                </Chakra.Box>
            }
        >
            {(getted_collection) => (
                <MangaPage_Cover covers={getted_collection.get_data()} />
            )}
        </CollectionComponnent_WithQuery>
    );
}


import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Asc_Desc } from "@mangadex/api/internal/Utils";
import { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import CollectionComponnent_WithQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_WithQuery";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { Client } from "@tauri-apps/api/http";
import React from "react";

const MangaSwipperWithMangaObjects = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaSwipperWithMangaObjects"));

export async function loader({ client }: {
    client: Client
}) {
    const offset_limits = new Offset_limits();
    offset_limits.set_limits(25);
    return await Manga_with_allRelationship.search({
        offset_Limits: offset_limits,
        order: new Order(Asc_Desc.desc()),
        client
    });
}

export const queryKey = () => ["mdx", "recently-added"];

export default function RecentlyAdded() {
    const client = useHTTPClient();
    const key = React.useMemo(() => queryKey(), []);
    return (
        <React.Fragment>
            <Chakra.Heading fontFamily={"inherit"}>Recently Added</Chakra.Heading>
            <CollectionComponnent_WithQuery
                fn={() => {
                    return loader({ client });
                }}
                queryKey={key}
                withoutNavigation
            >
                {(value) => (
                    <React.Suspense
                        fallback={
                            <Chakra.Box>
                                <Chakra.Center>
                                    <MangadexSpinner
                                        size={"xl"}
                                    />
                                </Chakra.Center>
                            </Chakra.Box>
                        }
                    >
                        <MangaSwipperWithMangaObjects
                            mangaArray={value.get_data()}
                            isVertical
                        />
                    </React.Suspense>

                )}
            </CollectionComponnent_WithQuery>
        </React.Fragment>
    );
}
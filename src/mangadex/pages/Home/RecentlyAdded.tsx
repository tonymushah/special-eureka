import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import React from "react";
import CollectionComponnent_WithQuery from "../../resources/componnents/Collection/CollectionComponnent_WithQuery";
import { Manga } from "../../api/structures/Manga";
import { Asc_Desc, Offset_limits, Order } from "../../api/internal/Utils";
import * as Chakra from "@chakra-ui/react";

const MangaSwipperWithMangaObjects = React.lazy(() => import("../../resources/componnents/mangas/v1/MangaSwipperWithMangaObjects"))

export default function RecentlyAdded() {
    const client = useHTTPClient();
    const offset_limits = new Offset_limits();
    offset_limits.set_limits(25)
    return (
        <React.Fragment>
            <Chakra.Heading fontFamily={"inherit"}>Recently Added</Chakra.Heading>
            <CollectionComponnent_WithQuery
                fn={() => {
                    return Manga.search({
                        offset_Limits: offset_limits,
                        order: new Order(Asc_Desc.desc()),
                        client
                    })
                }}
                queryKey={"mdx-recently-added"}
                withoutNavigation
            >
                {(value) => (
                    <React.Suspense
                        fallback={
                            <Chakra.Box>
                                <Chakra.Center>
                                    <Chakra.Spinner
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
    )
}
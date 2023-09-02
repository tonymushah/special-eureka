import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Asc_Desc } from "@mangadex/api/internal/Utils";
import { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { useMangaDexPath } from "@mangadex/index";
import CollectionComponnent_WithQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_WithQuery";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";

const MangaSwipperWithMangaObjects = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaSwipperWithMangaObjects"));

export async function loader({ client }: {
    client?: Client
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

function Title() {
    const key = React.useMemo(() => queryKey(), []);
    const MangaDexPath = useMangaDexPath();
    const headingColor = Chakra.useColorModeValue("black", "white");
    const query = useQuery(key, {
        enabled: false
    });
    return (
        <Chakra.HStack m={2}>
            <Chakra.Link as={Link} to={`${MangaDexPath}/titles/recently-added`} color={headingColor} textDecoration={"none"} _hover={{
                color: "orange.500",
                textDecoration: "underline"
            }}>
                <Chakra.Heading fontFamily={"inherit"}>Recently Added</Chakra.Heading>
            </Chakra.Link>
            <Chakra.IconButton
                colorScheme={"orange"}
                variant={"outline"}
                onClick={() => query.refetch()}
                isLoading={query.isLoading || query.isRefetching}
                aria-label="Refresh"
                icon={<FiRefreshCw />}
            />
        </Chakra.HStack>
    );
}

export default function RecentlyAdded() {
    const client = useHTTPClient();
    const key = React.useMemo(() => queryKey(), []);
    return (
        <React.Fragment>
            <Title/>
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
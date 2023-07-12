import React from "react";
import { Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Asc_Desc } from "@mangadex/api/internal/Utils";
import * as Chakra from "@chakra-ui/react";
import { CollectionComponnent_WithQuery } from "@mangadex/resources/componnents/Collection/Collection";
import { Manga } from "@mangadex/api/structures/Manga";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Mangadex_suspense, useTrackEvent } from "@mangadex/index";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";

const MangaList = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaList"));
const IsPingable = React.lazy(() => import("@mangadex/resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("@mangadex/resources/componnents/IsPingable_defaultError"));

export default function RecentlyAdded() {
    const { offset_limit, queryKey } = React.useMemo(() => {
        const offset_limit = new Offset_limits();
        offset_limit.set_limits(25);
        const queryKey = ["mdx", "recently-added"];
        return {
            offset_limit,
            queryKey
        };
    }, []);
    const client = useHTTPClient();
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("Recently Added | Mangadex");
    });
    useTrackEvent("mangadex-recently-added-entrance");
    return (
        <Mangadex_suspense>
            <IsPingable
                onLoading={
                    <Chakra.Box
                        width={"full"}
                        height={"100vh"}
                    >
                        <Chakra.Center>
                            <Chakra.Spinner
                                size={"lg"}
                                thickness={"2px"}
                                color={"orange"}
                            />
                        </Chakra.Center>
                    </Chakra.Box>
                }
                client={client}
                onError={(query) => (
                    <Mangadex_suspense>
                        <IsPingable_defaultError
                            query={query}
                        />
                    </Mangadex_suspense>
                )}
                onSuccess={() => (
                    <ChakraContainer>
                        <Chakra.Box>
                            <Chakra.Heading
                                fontFamily={"inherit"}
                            >
                                Recently Added
                            </Chakra.Heading>
                            <Chakra.Box>
                                <CollectionComponnent_WithQuery<Manga>
                                    fn={() => {
                                        return Manga.search({
                                            offset_Limits: offset_limit,
                                            order: new Order(Asc_Desc.desc()),
                                            client: client
                                        });
                                    }}
                                    queryKey={queryKey}
                                >
                                    {
                                        (collection) => (
                                            <Mangadex_suspense>
                                                <MangaList
                                                    src={collection.get_data()}
                                                />
                                            </Mangadex_suspense>
                                        )
                                    }
                                </CollectionComponnent_WithQuery>
                            </Chakra.Box>
                        </Chakra.Box>
                    </ChakraContainer>
                )}
            />
        </Mangadex_suspense>
    );
}
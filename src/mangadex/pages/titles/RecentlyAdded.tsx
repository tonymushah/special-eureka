import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Asc_Desc, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import { Mangadex_suspense, useTrackEvent } from "@mangadex/index";
import { CollectionComponnent_WithQuery } from "@mangadex/resources/componnents/Collection/Collection";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { UseQueryResult } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import React from "react";

const MangaList = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaList"));
const IsPingable = React.lazy(() => import("@mangadex/resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("@mangadex/resources/componnents/IsPingable_defaultError"));

export default function RecentlyAdded() {
    const { offset_limit, query_Key } = React.useMemo(() => {
        const offset_limit = new Offset_limits();
        offset_limit.set_limits(25);
        /// [x] Refactor into a fucntion
        const query_Key = queryKey();
        return {
            offset_limit,
            query_Key
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
                            <MangadexSpinner
                                size={"lg"}
                                thickness={"2px"}
                                color={"orange"}
                            />
                        </Chakra.Center>
                    </Chakra.Box>
                }
                client={client}
                onError={(query) => OnError({ query })}
                onSuccess={() => OnSuccess({ offset_limit, client, query_Key })}
            />
        </Mangadex_suspense>
    );
}

export function OnError({ query }: { query: UseQueryResult<boolean, Error>; }): React.ReactNode {
    return <Mangadex_suspense>
        <IsPingable_defaultError
            query={query} />
    </Mangadex_suspense>;
}

export function OnSuccess({ offset_limit, client, query_Key }: { offset_limit: Offset_limits; client: Client; query_Key: string[]; }) {
    return (
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
                        queryKey={query_Key}
                    >
                        {(collection) => (
                            <Mangadex_suspense>
                                <MangaList
                                    src={collection.get_data()} />
                            </Mangadex_suspense>
                        )}
                    </CollectionComponnent_WithQuery>
                </Chakra.Box>
            </Chakra.Box>
        </ChakraContainer>
    );
}

function queryKey() {
    return ["mdx", "recently-added"];
}

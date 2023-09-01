import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useCatch } from "@commons-res/components/TryCatch";
import UserOptions from "@mangadex/api/internal/UserOptions";
import { Offset_limits, Order, get_MangaChapter_Accordions_byChapterArray } from "@mangadex/api/internal/Utils";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { Mangadex_suspense, useTrackEvent } from "@mangadex/index";
import { CollectionComponnent_WithQuery } from "@mangadex/resources/componnents/Collection/Collection";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import { useUserOption } from "@mangadex/resources/componnents/userOption/UserOptionProvider";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import handleRouteError from "@mangadex/resources/hooks/handleRouteError";
import { UseQueryResult } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { LoaderFunction } from "react-router";
import { OnSuccess } from "./OnSuccess";

const IsPingable = React.lazy(() => import("@mangadex/resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("@mangadex/resources/componnents/IsPingable_defaultError"));
const MangaChapterAccordion_Element = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaChapterAccordion_Element"));

export function Error_() {
    const error = useCatch();
    return (
        <ErrorEL1 error={error} />
    );
}

export default function LatestUpdates() {
    const { offset_limit, query_Key } = React.useMemo(() => {
        const offset_limit = new Offset_limits();
        offset_limit.set_limits(25);
        /// [x] Refactor into a new function
        const query_Key = queryKey();
        return {
            offset_limit,
            query_Key
        };
    }, []);
    const client = useHTTPClient();
    const userOption = useUserOption();
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("Latest Updates | Mangadex");
    }, []);
    useTrackEvent("mangadex-latest-update-entrance");
    return (
        <ChakraContainer>
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
                    onError={(query) => OnError(query)}
                    onSuccess={() => OnSuccess({ userOption, offset_limit, client, queryKey: query_Key })}
                />
            </Mangadex_suspense>
        </ChakraContainer>
    );
}
export function queryKey() {
    return ["mdx", "latest-updates"];
}

export function OnError(query: UseQueryResult<boolean, Error>) {
    return (
        <Mangadex_suspense>
            <IsPingable_defaultError
                query={query} />
        </Mangadex_suspense>
    );
}
export async function queryFn({ offset_Limits : offset_limit, client, userOption }: {
    offset_Limits: Offset_limits,
    client: Client,
    userOption: UserOptions
}) {
    const userLanguages = await userOption.getLanguages();
    return await Chapter.search({
        offset_limits: offset_limit,
        order: new Order("desc"),
        client: client,
        translatedLanguage: userLanguages.map((lang) => lang.get_two_letter())
    });
}

export const loader: LoaderFunction = async function () {
    const { Api_Request } = await import("@mangadex/api/internal/Api_Request");
    const { queryClient } = await import("@mangadex/resources/query.client");
    const { getClient } = await import("@tauri-apps/api/http");
    const client = await getClient();
    const userOption = new UserOptions();
    try {
        const startOffsetLimit = new Offset_limits(0, 25);
        if (await Api_Request.ping(client)) {
            await queryClient.prefetchInfiniteQuery(queryKey(), async function ({ pageParam: offset_Limits = startOffsetLimit }) {
                return await queryFn({
                    offset_Limits,
                    client,
                    userOption
                });
            });
            return new Response(null, {
                status: 204,
                statusText: "Loaded"
            });
        } else {
            throw new Response("Please verify your internet connection", {
                status: 503,
                statusText: "Unaccesible MangaDex API"
            });
        }
    } catch (error) {
        throw handleRouteError(error);
    } finally {
        await client.drop();
    }
};
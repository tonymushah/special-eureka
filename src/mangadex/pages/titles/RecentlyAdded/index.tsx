import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Asc_Desc, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import { Mangadex_suspense, useTrackEvent } from "@mangadex/index";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { LoaderFunction } from "react-router";
import { OnSuccess } from "./OnSuccess";
import handleRouteError from "@mangadex/resources/hooks/handleRouteError";

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
            <OnSuccess
                client={client}
                offset_limit={offset_limit}
                query_Key={query_Key}
            />
        </Mangadex_suspense>
    );
}

export function queryKey() {
    return ["mdx", "recently-added"];
}

export function queryFn({ offset_Limits, client }: {
    offset_Limits: Offset_limits,
    client?: Client,
}) {
    return Manga.search({
        offset_Limits,
        order: new Order(Asc_Desc.desc()),
        client
    });
}

export const loader : LoaderFunction =async function () {
    const { Api_Request } = await import("@mangadex/api/internal/Api_Request");
    const { queryClient } = await import("@mangadex/resources/query.client");
    try {
        const startOffsetLimit = new Offset_limits(0, 25);
        if(await Api_Request.ping()){
            await queryClient.prefetchInfiniteQuery(queryKey(), async function({ pageParam : offset_Limits = startOffsetLimit }) {
                return await queryFn({
                    offset_Limits,
                });
            });
            return new Response(null, {
                status : 204,
                statusText : "Loaded"
            });
        }else{
            throw new Response("Please verify your internet connection", {
                status : 503,
                statusText : "Unaccesible MangaDex API"
            });
        }
    } catch (error) {
        throw handleRouteError(error);
    }
};
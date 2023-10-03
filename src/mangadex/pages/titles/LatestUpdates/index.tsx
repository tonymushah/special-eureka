import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import UserOptions from "@mangadex/api/internal/UserOptions";
import { Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { Mangadex_suspense, useTrackEvent } from "@mangadex/index";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { useUserOption } from "@mangadex/resources/componnents/userOption/utils/UserOptionProvider";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import handleRouteError from "@mangadex/resources/hooks/handleRouteError";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { LoaderFunction } from "react-router";
import { OnSuccess } from "./OnSuccess";


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
                <OnSuccess client={client} offset_limit={offset_limit} userOption={userOption} queryKey={query_Key}/>
            </Mangadex_suspense>
        </ChakraContainer>
    );
}
export function queryKey() {
    return ["mdx", "latest-updates"];
}

export async function queryFn({ offset_Limits : offset_limit, client, userOption }: {
    offset_Limits: Offset_limits,
    client?: Client,
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
    const userOption = new UserOptions();
    try {
        const startOffsetLimit = new Offset_limits(0, 25);
        if (await Api_Request.ping()) {
            await queryClient.prefetchQuery(queryKey(), async function ({ pageParam: offset_Limits = startOffsetLimit }) {
                return await queryFn({
                    offset_Limits,
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
    }
};
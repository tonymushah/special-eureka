import { useQuery } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import DesktopApi from "@mangadex/api/offline/DeskApiRequest";
import React from "react";

export function useServerStateQuery() {
    const client = useHTTPClient();

    // [x] Refactor this into a new function
    const key = React.useMemo(querykey, []);

    const query = useQuery(key, async () => {
        const getted = await DesktopApi.ping(client);
        return getted;
    }, {
        "staleTime": 0,
        "refetchOnWindowFocus": true,
        retry: 0
    });
    return { key, query };
}

export function querykey() {
    return ["mdx", "offline_server"];
}
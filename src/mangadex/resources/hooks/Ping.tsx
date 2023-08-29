import { Api_Request } from "@mangadex/api/internal/Api_Request";
import { Client } from "@tauri-apps/api/http";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export async function queryFn(client : Client) {
    return await Api_Request.ping(client);
}

export default function usePingQuery(props : {
    client : Client
}){
    // [x] Refactor this query key into a function
    const query_key = React.useMemo(() => queryKey(), []);
    const query = useQuery<boolean, Error>(query_key, () => queryFn(props.client), {
        staleTime : 0,
        refetchOnMount : false,
        refetchOnReconnect : true,
        refetchOnWindowFocus : true
    });
    return {
        query,
        query_key
    };
}

export function queryKey() {
    return ["mdx", "ping"];
}
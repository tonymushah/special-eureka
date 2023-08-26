import { Api_Request } from "@mangadex/api/internal/Api_Request";
import { Client } from "@tauri-apps/api/http";
import { useQuery } from "@tanstack/react-query";

export default function usePingQuery(props : {
    client : Client
}){
    // [ ] Refactor this query key into a function
    const query_key = ["mdx", "ping"];
    const query = useQuery<boolean, Error>(query_key, () => {
        return Api_Request.ping(props.client);
    }, {
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
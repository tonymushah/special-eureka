import { useQuery } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { List } from "@mangadex/api/structures/List";
import React from "react";

export function useState(props: { listID: string; }) {
    const client = useHTTPClient();
    // [x] Refactor into a function
    const key = React.useMemo(() => queryKey(props), []);
    const query = useQuery<List, Error>(key, () => {
        return List.getListByID_includes_manga(props.listID, client);
    }, {
        "staleTime": Infinity
    });
    return query;
}

export function queryKey(props: { listID: string; }) {
    return ["mdx", "custom_list", props.listID];
}
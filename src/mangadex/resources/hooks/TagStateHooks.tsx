import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Tag } from "@mangadex/api/structures/Tag";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function get_all_tag(){
    const client = useHTTPClient();
    // [x] Refactor this query key into a function
    const _queryKey_ = React.useMemo(() => queryKey(), []);
    const query = useQuery(_queryKey_, () => {
        return Tag.get_all_tag(client);
    });
    return {
        query,
        queryKey : _queryKey_
    };
}

export function queryKey() {
    return ["mdx", "tags"];
}

import { useQuery } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Cover } from "@mangadex/api/structures/Cover";
import React from "react";

export default function get_cover_art_byId(props: {
    coverID: string;
}) {
    const client = useHTTPClient();
    // [x] Refactor `queryKey` into a new file
    const cover_key = React.useMemo(() => queryKey(props), []);
    const coverQuery = useQuery(cover_key, () => {
        return Cover.getById(props.coverID, client);
    }, {
        "staleTime": Infinity
    });
    return {
        cover_key,
        coverQuery
    };
}

export function queryKey(props: { coverID: string; }) {
    return ["mdx", "cover", props.coverID];
}


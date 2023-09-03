import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserFeedQueryKey } from "./getUserFeedQueryKey";


export function getUserFeedQuery(props: {
    user_id: string;
}) {
    const client = useHTTPClient();
    // [x] use `React.useMemo` for optimization
    const queryKey = React.useMemo(() => getUserFeedQueryKey(props).concat(["speq"]), []);
    const query = useQuery(queryKey, () => {
        return Chapter.search({
            client: client,
            "uploader": props.user_id,
            offset_limits: new Offset_limits()
        });
    });
    return {
        queryKey,
        query
    };
}

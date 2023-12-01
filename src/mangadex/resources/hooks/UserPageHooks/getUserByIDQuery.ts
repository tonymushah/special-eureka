import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { User } from "@mangadex/api/structures/User";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserByIDQueryKey } from "./getUserByIDQueryKey";


export function getUserByIDQuery(props: {
    user_id: string;
}) {
    const client = useHTTPClient();
    // [x] use `React.useMemo` for optimization
    const queryKey = React.useMemo(() => getUserByIDQueryKey(props), []);
    const query = useQuery(queryKey, () => {
        return User.getUserById(props.user_id, client);
    });
    return {
        query,
        queryKey
    };
}

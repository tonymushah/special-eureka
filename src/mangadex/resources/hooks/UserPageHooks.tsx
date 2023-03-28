import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { User } from "@mangadex/api/structures/User";
import { useQuery } from "react-query";


export function getUserFeedQueryKey(props: {
    user_id: string
}) {
    return `mdx-user:${props.user_id}-feed`;
}

export function getUserFeedQuery(props: {
    user_id: string
}) {
    const client = useHTTPClient();
    const queryKey = getUserFeedQueryKey(props);
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

export function getUserByIDQueryKey(props: {
    user_id : string
}){
    return `mdx-user:${props.user_id}`;
}

export function getUserByIDQuery(props : {
    user_id : string
}){
    const client = useHTTPClient();
    const queryKey = getUserByIDQueryKey(props);
    const query = useQuery(queryKey, () => {
        return User.getUserById(props.user_id, client);
    });
    return {
        query,
        queryKey
    };
}
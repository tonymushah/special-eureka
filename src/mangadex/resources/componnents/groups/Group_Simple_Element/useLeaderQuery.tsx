import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Group } from "@mangadex/api/structures/Group";
import { useQuery } from "@tanstack/react-query";

export function useLeaderQuery(props: { src: Group; }) {
    const client = useHTTPClient();
    // [x] Refactor into a function
    const leader_queryKey = queryKey(props);
    const leader_query = useQuery(leader_queryKey, () => {
        return props.src.getLeader(client);
    }, {
        staleTime: Infinity
    });
    return leader_query;
}

export function queryKey(props: { src: Group; }) {
    return ["mdx", "user", props.src.getLeaderID()];
}


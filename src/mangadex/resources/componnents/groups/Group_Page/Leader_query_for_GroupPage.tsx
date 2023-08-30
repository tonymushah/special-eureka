import React from "react";
import * as Chakra from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useMangaDexPath } from "@mangadex/index";
import { Link as ReactRouterLink } from "react-router-dom";
import { useGroupPageContext } from ".";
import { Group } from "@mangadex/api/structures/Group";

export function Leader_query_for_GroupPage() {
    const client = useHTTPClient();
    const src = useGroupPageContext();
    // [x] Refactor into a function
    const leader_queryKey = React.useMemo(() => queryKey(src), []);
    const leader_query = useQuery(leader_queryKey, () => {
        return src.getLeader(client);
    }, {
        staleTime: Infinity
    });
    const MangaDexPath = useMangaDexPath();
    return (
        <React.Fragment>
            {leader_query.isSuccess ? (
                <Chakra.Heading fontSize={"lg"}>Leader : <Chakra.Link as={ReactRouterLink} to={`${MangaDexPath}/user/${leader_query.data.get_id()}`}>{leader_query.data.get_username()}</Chakra.Link></Chakra.Heading>
            ) : (
                <React.Fragment />
            )}
        </React.Fragment>
    );
}
function queryKey(src: Group) {
    return ["mdx", "user", src.getLeaderID()];
}


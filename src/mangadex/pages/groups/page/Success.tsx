import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Group } from "@mangadex/api/structures/Group";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router-dom";
import { queryKey, queryFn, Group_Page_Suspense, Group_Page } from ".";

export function Success({ id }: {
    id: string;
}) {
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    /// [x] Put this in a new function
    const query_key = React.useMemo(() => queryKey(id), []);
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        queryClient.removeQueries(query_key, {
            exact: true
        });
        setTitle("Loading... | Mangadex");
    }, []);
    const query = useQuery<Group, Error>(query_key, () => queryFn(id, client), {
        staleTime: Infinity
    });
    if (query.isLoading || query.isRefetching) {

        return (
            <Chakra.AbsoluteCenter>
                <Chakra.Box>
                    <MangadexSpinner
                        size={"lg"} />
                </Chakra.Box>
            </Chakra.AbsoluteCenter>
        );
    }
    if (query.isSuccess) {
        return (
            <Group_Page_Suspense>
                <Group_Page src={query.data}>
                    <Outlet context={{
                        group: query.data
                    }} />
                </Group_Page>
            </Group_Page_Suspense>
        );
    }
    return (
        <Chakra.AbsoluteCenter>
            <Chakra.Box>
                <MangadexSpinner
                    size={"lg"} />
            </Chakra.Box>
        </Chakra.AbsoluteCenter>
    );
}

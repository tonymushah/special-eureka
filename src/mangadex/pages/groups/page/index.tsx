import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Group } from "@mangadex/api/structures/Group";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";

const Group_Page = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Page"));

function Group_Page_Suspense(props: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={
                <Chakra.AbsoluteCenter>
                    <Chakra.Box>
                        <MangadexSpinner
                            size={"lg"}
                        />
                    </Chakra.Box>
                </Chakra.AbsoluteCenter>
            }
        >
            {
                props.children
            }
        </React.Suspense>
    );
}

export type GroupRouteOutletContext = {
    group: Group
}

export function useGroupRouteOutletContext(): GroupRouteOutletContext {
    return useOutletContext<GroupRouteOutletContext>();
}

function Success({ id }: {
    id: string
}) {
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    const query_key = ["mdx", "group", id];
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        queryClient.removeQueries(query_key, {
            exact: true
        });
        setTitle("Loading... | Mangadex");
    }, []);
    const query = useQuery<Group, Error>(query_key, () => {
        return Group.get_groupById(id, client);
    }, {
        staleTime: Infinity
    });
    if (query.isLoading || query.isRefetching) {

        return (
            <Chakra.AbsoluteCenter>
                <Chakra.Box>
                    <MangadexSpinner
                        size={"lg"}
                    />
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
                    size={"lg"}
                />
            </Chakra.Box>
        </Chakra.AbsoluteCenter>
    );
}

export default function Group_Page_() {
    const { id } = useParams();
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("Loading... | Mangadex");
    }, []);
    if (id != undefined) {
        return (
            <Success id={id} />
        );
    } else {
        setTitle("Error on loading the group page | Mangadex");
        return (
            <Chakra.Alert status="error">
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>
                    The group id is null
                </Chakra.AlertTitle>
            </Chakra.Alert>
        );
    }
}
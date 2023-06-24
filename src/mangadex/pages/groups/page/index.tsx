import React, { useMemo } from "react";
import * as Chakra from "@chakra-ui/react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Group } from "@mangadex/api/structures/Group";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { appWindow } from "@tauri-apps/api/window";

const Group_Page = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Page"));

function Group_Page_Suspense(props : React.PropsWithChildren){
    return (
        <React.Suspense
            fallback={
                <Chakra.AbsoluteCenter>
                    <Chakra.Box>
                        <Chakra.Spinner
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
    group : Group
}

export function useGroupRouteOutletContext() : GroupRouteOutletContext{
    return useOutletContext<GroupRouteOutletContext>();
}

export default function Group_Page_(){
    const { id } = useParams();
    appWindow.setTitle("Loading... | Mangadex").then();
    if(id != undefined){
        const client = useHTTPClient();
        const queryClient = useQueryClient();
        const query_key = ["mdx", "group", id];
        useMemo(() => {
            queryClient.removeQueries(query_key, {
                exact : true
            });
        },[]);
        const query = useQuery<Group, Error>(query_key, () => {
            return Group.get_groupById(id, client);
        }, {
            staleTime : Infinity
        });
        if(query.isLoading || query.isRefetching){
            appWindow.setTitle("Loading... | Mangadex").then();
            return (
                <Chakra.AbsoluteCenter>
                    <Chakra.Box>
                        <Chakra.Spinner
                            size={"lg"}
                        />
                    </Chakra.Box>
                </Chakra.AbsoluteCenter>
            );
        }
        if(query.isSuccess){
            return (
                <Group_Page_Suspense>
                    <Group_Page src={query.data}>
                        <Outlet context={{
                            group : query.data
                        }}/>
                    </Group_Page>
                </Group_Page_Suspense>
            );
        }
        return (
            <Chakra.AbsoluteCenter>
                    <Chakra.Box>
                        <Chakra.Spinner
                            size={"lg"}
                        />
                    </Chakra.Box>
                </Chakra.AbsoluteCenter>
        );
    }else{
        appWindow.setTitle("Error on loading the group page | Mangadex").then();
        return (
            <Chakra.Alert status="error">
                <Chakra.AlertIcon/>
                <Chakra.AlertTitle>
                    The group id is null
                </Chakra.AlertTitle>
            </Chakra.Alert>
        );
    }
}
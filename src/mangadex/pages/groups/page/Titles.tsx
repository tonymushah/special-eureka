import { Group_Page_Suspense } from "@mangadex/resources/componnents/groups/Group_Page/Group_Page_Suspense";
import React from "react";
import { GroupRouteOutletContext, useGroupRouteOutletContext } from ".";
import { LoaderFunction } from "react-router";
import handleRouteError from "@mangadex/resources/hooks/handleRouteError";

const Group_Titles = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Titles"));

export default function Group_Titles_Page() {
    const { group } = useGroupRouteOutletContext();
    return (
        <Group_Page_Suspense>
            <Group_Titles id={group.get_id()} />
        </Group_Page_Suspense>
    );
}

export const loader: LoaderFunction = async function ({ context: RealContext }) {
    const context: GroupRouteOutletContext | undefined = RealContext;
    if (context != undefined) {
        const { group } = context;
        if (group != undefined) {
            const { queryKey, queryFn } = await import("@mangadex/resources/componnents/groups/Group_Titles");
            const { queryClient } = await import("@mangadex/resources/query.client");
            const { Offset_limits } = await import("@mangadex/api/internal/Utils");
            try{
                const startOffsetLimit = new Offset_limits(0, 10);
                await queryClient.prefetchInfiniteQuery(queryKey({
                    id : group.get_id()
                }), async function({ pageParam = startOffsetLimit} ) {
                    return await queryFn({
                        offset_limit : pageParam,
                        id : group.get_id(),
                    });
                },{
                    getNextPageParam(lastPage) {
                        try{
                            return lastPage.next_offset_limit();
                        }catch{
                            return undefined;
                        }
                    },
                    getPreviousPageParam(lastPage){
                        try{
                            return lastPage.previous_offset_limit();
                        }catch{
                            return undefined;
                        }
                    }
                });
                return new Response(null, {
                    status: 204,
                    statusText: "Loaded"
                });
            }catch(e){
                throw handleRouteError(e);
            }
            
        } else {
            throw new Response(null, {
                status: 404,
                statusText: "Group Context not Found"
            });
        }
    } else {
        throw new Response(null, {
            status: 404,
            statusText: "Group Context not Found"
        });
    }
};
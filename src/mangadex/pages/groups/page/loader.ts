import handleRouteError from "@mangadex/resources/hooks/handleRouteError";
import { LoaderFunction } from "react-router";

export const loader : LoaderFunction = async function({ params }){
    const { id } = params;
    const { queryClient } = await import("@mangadex/resources/query.client");
    const { queryKey, queryFn } = await import(".");
    if(id != undefined){
        try{
            await queryClient.prefetchQuery(queryKey(id), () => queryFn(id));
            return new Response(null, {
                status : 204,
                statusText : "Loaded"
            });
        }catch(e){
            throw handleRouteError(e);
        }
    }else {
        throw new Response("The Group id is null", {
            "status" : 403,
            "statusText" : "Group ID not found"
        });
    }
};
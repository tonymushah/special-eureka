import handleRouteError from "@mangadex/resources/hooks/handleRouteError";
import { LoaderFunction } from "react-router";
import { queryClient } from "@mangadex/resources/query.client";
import { queryKey, queryFn } from ".";

export const loader : LoaderFunction = async function({ params }){
    const { id } = params;
    
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
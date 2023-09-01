import handleRouteError from "@mangadex/resources/hooks/handleRouteError";
import { LoaderFunction } from "react-router";

export const loader : LoaderFunction = async function({ params }){
    const { id } = params;
    const { queryClient } = await import("@mangadex/resources/query.client");
    const { getClient } = await import("@tauri-apps/api/http");
    const { queryKey, queryFn } = await import(".");
    if(id != undefined){
        const client = await getClient();
        try{
            await queryClient.prefetchQuery(queryKey(id), () => queryFn(id, client));
            return new Response(null, {
                status : 204,
                statusText : "Loaded"
            });
        }catch(e){
            throw handleRouteError(e);
        }finally{
            await client.drop();
        }
    }else {
        throw new Response("The Group id is null", {
            "status" : 403,
            "statusText" : "Group ID not found"
        });
    }
};
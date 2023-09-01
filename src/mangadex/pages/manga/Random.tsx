import { LoaderFunction, json, redirect } from "react-router";


export const loader : LoaderFunction = async function () {
    const { Manga } = await import("@mangadex/api/structures/Manga");
    const { getClient } = await import("@tauri-apps/api/http");
    const { queryClient } = await import("@mangadex/resources/query.client");
    const { Api_Request } = await import("@mangadex/api/internal/Api_Request");
    const { get_mangaQueryKey_byID } = await import("@mangadex/resources/hooks/MangaStateHooks/get_mangaQueryKey_byID");
    const client = await getClient();
    const { getMangaDexPath } = await import("@mangadex/index");
    const MangaDexPath = getMangaDexPath();
    try {
        if(await Api_Request.ping(client)){
            const getted = await Manga.getRandom(client);
            queryClient.prefetchQuery(get_mangaQueryKey_byID({
                mangaID : getted.get_id()
            }), async () => (await Manga.getMangaByID(getted.get_id(), client)), {
                initialData : {
                    isOffline : false,
                    manga : getted
                }
            });
            return redirect(`${MangaDexPath}/manga/${getted.get_id()}`);
        }else{
            // TODO Add Random manga for offline
            throw json({
                "message": "can't access to the mangadex api"
            }, {
                status : 503,
                statusText : "MangaDex API Access Error"
            });
        }
    } catch (error) {
        if(error instanceof Response || error instanceof Error){
            throw error;
        }else{
            throw new Response(JSON.stringify(error), {
                "status" : 500,
                "statusText" : "loader Loading Error"
            });
        }
    }finally{
        client.drop();
    }
};
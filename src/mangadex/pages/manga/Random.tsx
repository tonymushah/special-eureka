import { LoaderFunction, json, redirect } from "react-router";
import Manga from "@mangadex/api/structures/Manga";
import { getClient } from "@tauri-apps/api/http";
import { queryClient } from "@mangadex/resources/query.client";
import { Api_Request } from "@mangadex/api/internal/Api_Request";
import get_mangaQueryKey_byID from "@mangadex/resources/hooks/MangaStateHooks/get_mangaQueryKey_byID";
import { getMangaDexPath } from "@mangadex/index";

export const loader: LoaderFunction = async function () {
    const client = await getClient();
    
    const MangaDexPath = getMangaDexPath();
    try {
        if (await Api_Request.ping(client)) {
            const getted = await Manga.getRandom(client);
            queryClient.prefetchQuery(get_mangaQueryKey_byID({
                mangaID: getted.get_id()
            }), async () => (await Manga.getMangaByID(getted.get_id(), client)), {
                initialData: {
                    isOffline: false,
                    manga: getted
                }
            });
            return redirect(`${MangaDexPath}/manga/${getted.get_id()}`);
        } else {
            // TODO Add Random manga for offline
            throw json({
                "message": "can't access to the mangadex api"
            }, {
                status: 503,
                statusText: "MangaDex API Access Error"
            });
        }
    } catch (error) {
        if (error instanceof Response || error instanceof Error) {
            throw error;
        } else {
            throw new Response(JSON.stringify(error), {
                "status": 500,
                "statusText": "loader Loading Error"
            });
        }
    } finally {
        client.drop();
    }
};
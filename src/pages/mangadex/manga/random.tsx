import { LoaderFunction, json } from "react-router";
import Manga from "@mangadex/api/structures/Manga";
import { getClient } from "@tauri-apps/api/http";
import { queryClient } from "@mangadex/resources/query.client";
import { Api_Request } from "@mangadex/api/internal/Api_Request";
import get_mangaQueryKey_byID from "@mangadex/resources/hooks/MangaStateHooks/get_mangaQueryKey_byID";

import { redirect } from "@router";

export const Loader: LoaderFunction = async function () {
    const client = await getClient();
    try {
        if (await Api_Request.ping(client)) {
            const getted = await Manga.getRandom(client);
            const inQuery = queryClient.getQueryData<Manga>(get_mangaQueryKey_byID({
                mangaID: getted.get_id()
            }));
            if (inQuery) {
                queryClient.prefetchQuery(get_mangaQueryKey_byID({
                    mangaID: getted.get_id()
                }), async () => (await Manga.getMangaByID(getted.get_id(), client)), {
                    initialData: getted
                });
            } else {
                queryClient.prefetchQuery(get_mangaQueryKey_byID({
                    mangaID: getted.get_id()
                }), async () => (await Manga.getMangaByID(getted.get_id(), client)), {
                    initialData: getted
                });
            }

            return redirect("/mangadex/manga/:id", {
                params: {
                    id: getted.get_id()
                }
            });
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

export { default as Catch } from "@mangadex/resources/componnents/router/error/Boundary";
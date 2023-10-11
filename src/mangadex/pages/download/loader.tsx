import handleRouteError from "@mangadex/resources/hooks/handleRouteError";
import { LoaderFunction } from "react-router";


export const loader: LoaderFunction = async function () {

    try {
        const { queryKey } = await import("@mangadex/resources/componnents/download/All_downloaded_Manga_Consumer");
        const { default: Manga } = await import("@mangadex/api/structures/Manga");
        const { queryClient } = await import("@mangadex/resources/query.client");
        const { Offset_limits } = await import("@mangadex/api/internal/Utils");
        const { default: Api_Requests } = await import("@mangadex/api/offline/DeskApiRequest");
        if (await Api_Requests.ping()) {
            await queryClient.prefetchInfiniteQuery(queryKey(), async function ({ pageParam = new Offset_limits() }) {
                return await Manga.getAllDownloadedMangaID(pageParam);
            }, {
                getNextPageParam(lastPage) {
                    try {
                        return lastPage.next_offset_limit();
                    } catch {
                        return undefined;
                    }
                },
                getPreviousPageParam(lastPage) {
                    try {
                        return lastPage.previous_offset_limit();
                    } catch {
                        return undefined;
                    }
                }
            });
            return new Response(null, {
                status: 204,
                statusText: "Loaded"
            });
        } else {
            throw new Response("Please launch the offline server before any download actions", {
                status: 503,
                statusText: "Inactive Offline Server"
            });
        }
    } catch (error) {
        throw handleRouteError(error);
    }
};

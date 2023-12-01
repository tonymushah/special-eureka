import handleRouteError from "@mangadex/resources/hooks/handleRouteError";
import { LoaderFunction } from "react-router";
import { queryKey } from "@mangadex/resources/componnents/download/All_downloaded_Manga_Consumer/queryKey";
import Manga from "@mangadex/api/structures/Manga";
import { queryClient } from "@mangadex/resources/query.client";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import Api_Requests from "@mangadex/api/offline/DeskApiRequest";

export const loader: LoaderFunction = async function () {
    try {
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

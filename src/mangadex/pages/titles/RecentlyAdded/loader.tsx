import { Offset_limits } from "@mangadex/api/internal/Utils";
import { LoaderFunction } from "react-router";
import handleRouteError from "@mangadex/resources/hooks/handleRouteError";
import { queryKey, queryFn } from ".";


export const loader: LoaderFunction = async function () {
    const { Api_Request } = await import("@mangadex/api/internal/Api_Request");
    const { queryClient } = await import("@mangadex/resources/query.client");
    try {
        const startOffsetLimit = new Offset_limits(0, 25);
        if (await Api_Request.ping()) {
            await queryClient.prefetchInfiniteQuery(queryKey(), async function ({ pageParam: offset_Limits = startOffsetLimit }) {
                return await queryFn({
                    offset_Limits,
                });
            });
            return new Response(null, {
                status: 204,
                statusText: "Loaded"
            });
        } else {
            throw new Response("Please verify your internet connection", {
                status: 503,
                statusText: "Unaccesible MangaDex API"
            });
        }
    } catch (error) {
        throw handleRouteError(error);
    }
};

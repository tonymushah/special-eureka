import UserOptions from "@mangadex/api/internal/UserOptions";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import handleRouteError from "@mangadex/resources/hooks/handleRouteError";
import { LoaderFunction } from "react-router";
import { queryKey, queryFn } from ".";
import { Api_Request } from "@mangadex/api/internal/Api_Request";
import { queryClient } from "@mangadex/resources/query.client";

export const loader: LoaderFunction = async function () {
    const userOption = new UserOptions();
    try {
        const startOffsetLimit = new Offset_limits(0, 25);
        if (await Api_Request.ping()) {
            await queryClient.prefetchQuery(queryKey(), async function ({ pageParam: offset_Limits = startOffsetLimit }) {
                return await queryFn({
                    offset_Limits,
                    userOption
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
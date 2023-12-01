import Manga from "@mangadex/api/structures/Manga";
import { LoaderFunction } from "react-router-dom";
import { queryKey, queryFn } from ".";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "@mangadex/resources/query.client";
import Api_Request from "@mangadex/api/offline/DeskApiRequest";

export const loader: LoaderFunction = async function ({ params }) {
    const { id } = params;
    if (id != undefined) {
        try {
            const _queryKey_ = queryKey(id);
            if (await Api_Request.ping()) {
                return await prefetch({
                    queryClient,
                    _queryKey_,
                    id
                });
            } else {
                const queryData = queryClient.getQueryData<Manga>(_queryKey_, {
                    exact: true
                });
                if (queryData != undefined) {
                    return await prefetch({ queryClient, _queryKey_, id });
                } else {
                    return response();
                }
            }
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Response(JSON.stringify(e), {
                    status: 500,
                    statusText: "Internal Loader Error"
                });
            }
        }
    } else {
        throw new Response(undefined, {
            "status": 404,
            "statusText": "MangaID Undefined"
        });
    }
};

function response() {
    return new Response(null, {
        "status": 204,
        "statusText": "Loaded"
    });
}

async function prefetch({ queryClient, _queryKey_, id }: { queryClient: QueryClient; _queryKey_: (string | undefined)[]; id: string; }) {
    await queryClient.prefetchQuery(_queryKey_, () => queryFn(id));
    return response();
}


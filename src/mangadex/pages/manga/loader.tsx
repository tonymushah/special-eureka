import Manga, { GetMangaByIDResponse, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { LoaderFunction } from "react-router-dom";
import { queryKey, queryFn } from ".";
import { QueryClient } from "@tanstack/react-query";

export const loader: LoaderFunction = async function ({ params }) {
    const { id } = params;
    if (id != undefined) {
        try {
            const { queryClient } = await import("@mangadex/resources/query.client");
            const _queryKey_ = queryKey(id);
            const queryData = queryClient.getQueryData<GetMangaByIDResponse>(_queryKey_, {
                exact: true
            });
            if (queryData != undefined) {
                const { manga, isOffline } = queryData;
                if (!isOffline) {
                    return await prefetch({ queryClient, _queryKey_, id });
                } else {
                    if (manga instanceof Manga_with_allRelationship) {
                        if (manga.$artists != undefined && manga.$authors != undefined && manga.$cover != undefined && manga.$related_manga != undefined) {
                            return await prefecth2({ queryClient, _queryKey_, id, manga, isOffline });
                        } else {
                            return await prefetch({ queryClient, _queryKey_, id });
                        }
                    } else {
                        if (manga.get_relationships() == undefined || manga.get_relationships()?.length == 0) {
                            return await prefetch({ queryClient, _queryKey_, id });
                        } else {
                            return response();
                        }
                    }
                }
            } else {
                return await prefetch({ queryClient, _queryKey_, id });
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

async function prefecth2({ queryClient, _queryKey_, id, manga, isOffline }: { queryClient: QueryClient; _queryKey_: (string | undefined)[]; id: string; manga: Manga; isOffline: boolean; }) {
    await queryClient.prefetchQuery(_queryKey_, () => queryFn(id), {
        initialData: {
            manga,
            isOffline
        }
    });
    return response();
}

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


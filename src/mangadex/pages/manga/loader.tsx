import { GetMangaByIDResponse, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { LoaderFunction } from "react-router-dom";
import { queryKey, queryFn } from ".";


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
                if (manga instanceof Manga_with_allRelationship) {
                    if (manga.$artists != undefined && manga.$authors != undefined && manga.$cover != undefined && manga.$related_manga != undefined) {
                        await queryClient.prefetchQuery(_queryKey_, () => queryFn(id), {
                            initialData: {
                                manga,
                                isOffline
                            }
                        });
                        return new Response(null, {
                            "status": 204,
                            "statusText": "Loaded"
                        });
                    } else {
                        await queryClient.prefetchQuery(_queryKey_, () => queryFn(id));
                        return new Response(null, {
                            "status": 204,
                            "statusText": "Loaded"
                        });
                    }
                } else {
                    if (manga.get_relationships() == undefined || manga.get_relationships()?.length == 0) {
                        await queryClient.prefetchQuery(_queryKey_, () => queryFn(id));
                        return new Response(null, {
                            "status": 204,
                            "statusText": "Loaded"
                        });
                    } else {
                        return new Response(null, {
                            "status": 204,
                            "statusText": "Loaded"
                        });
                    }
                }
            } else {
                await queryClient.prefetchQuery(_queryKey_, () => queryFn(id), {});
                return new Response(null, {
                    "status": 204,
                    "statusText": "Loaded"
                });
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

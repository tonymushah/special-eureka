import { Api_Request } from "@mangadex/api/internal/Api_Request";
import { Author } from "@mangadex/api/structures/Author";
import get_author_queryKey_byID from "@mangadex/resources/hooks/AuthorState/get_author_queryKey_byID";
import { LoaderFunction } from "react-router-dom";


export const loader: LoaderFunction = async function ({ params }) {
    if (await Api_Request.ping()) {
        const { id } = params;
        if (id != undefined) {
            try {
                const { queryClient } = await import("@mangadex/resources/query.client");
                const _queryKey_ = get_author_queryKey_byID({
                    author_id: id
                });
                const queryData = queryClient.getQueryData<Author>(_queryKey_, {
                    exact: true
                });
                if (queryData != undefined) {
                    if (queryData.get_relationships() == undefined || queryData.get_relationships()?.length == 0) {
                        await queryClient.prefetchQuery(_queryKey_, () => Author.getAuthorById(id));
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
                } else {
                    await queryClient.prefetchQuery(_queryKey_, () => Author.getAuthorById(id));
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
                "statusText": "Author ID Undefined"
            });
        }
    } else {
        throw new Response("Please check your internet connection", {
            "status": 503,
            "statusText": "Inaccessible MangaDex API"
        });
    }
};

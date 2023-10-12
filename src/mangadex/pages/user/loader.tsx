import { Api_Request } from "@mangadex/api/internal/Api_Request";
import { User } from "@mangadex/api/structures/User";
import { getUserByIDQueryKey } from "@mangadex/resources/hooks/UserPageHooks/getUserByIDQueryKey";
import { LoaderFunction } from "react-router";
import { queryClient } from "@mangadex/resources/query.client";

export const loader: LoaderFunction = async function ({ params }) {
    if (await Api_Request.ping()) {
        const { id } = params;
        if (id != undefined) {
            try {
                const _queryKey_ = getUserByIDQueryKey({
                    user_id: id
                });
                const queryData = queryClient.getQueryData<User>(_queryKey_, {
                    exact: true
                });
                if (queryData != undefined) {
                    if (queryData.get_relationships().length === 0) {
                        await queryClient.fetchQuery(_queryKey_, async () => { 
                            return User.getUserById(id); 
                        });
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
                    await queryClient.fetchQuery(_queryKey_, () => User.getUserById(id));
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
                "statusText": "User ID Undefined"
            });
        }
    } else {
        throw new Response("Please check your internet connection", {
            "status": 503,
            "statusText": "Inaccessible MangaDex API"
        });
    }
};

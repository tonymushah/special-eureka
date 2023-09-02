import { Api_Request } from "@mangadex/api/internal/Api_Request";
import { User } from "@mangadex/api/structures/User";
import { Mangadex_suspense, Mangadex_suspense__ } from "@mangadex/index";
import { getUserByIDQuery } from "@mangadex/resources/hooks/UserPageHooks/getUserByIDQuery";
import { getUserByIDQueryKey } from "@mangadex/resources/hooks/UserPageHooks/getUserByIDQueryKey";
import React from "react";
import { LoaderFunction, useParams } from "react-router";

const UserPageSuccess = React.lazy(() => import("./index"));

export default function UserPage_w_Loader() {
    const { id } = useParams();
    const { query } = getUserByIDQuery({
        user_id: id!
    });
    if (query.isSuccess) {
        return (
            <Mangadex_suspense>
                <UserPageSuccess
                    user={query.data}
                />
            </Mangadex_suspense>
        );
    }
    if (query.isError) {
        throw query.error;
    }
    return (
        <Mangadex_suspense__ />
    );
}

export const loader: LoaderFunction = async function ({ params }) {
    if (await Api_Request.ping()) {
        const { id } = params;
        if (id != undefined) {
            try {
                const { queryClient } = await import("@mangadex/resources/query.client");
                const _queryKey_ = getUserByIDQueryKey({
                    user_id: id
                });
                const queryData = queryClient.getQueryData<User>(_queryKey_, {
                    exact: true
                });
                if (queryData != undefined) {
                    if (queryData.get_relationships() == undefined || queryData.get_relationships()?.length == 0) {
                        await queryClient.prefetchQuery(_queryKey_, () => User.getUserById(id));
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
                    await queryClient.prefetchQuery(_queryKey_, () => User.getUserById(id));
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
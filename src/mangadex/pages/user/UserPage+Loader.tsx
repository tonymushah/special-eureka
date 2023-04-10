import { Mangadex_suspense, Mangadex_suspense__ } from "@mangadex";
import { getUserByIDQuery, getUserByIDQueryKey } from "@mangadex/resources/hooks/UserPageHooks";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

const UserPageSuccess = React.lazy(() => import("./index"));

export default function UserPage_w_Loader(){
    const { user_id } = useParams();
    const queryKey = getUserByIDQueryKey({
        user_id : user_id!
    });
    const queryClient = useQueryClient();
    React.useMemo<void>(() => {
        queryClient.removeQueries(queryKey);
    }, [user_id]);
    const { query } = getUserByIDQuery({
        user_id : user_id!
    });
    if(query.isSuccess){
        return (
            <Mangadex_suspense>
                <UserPageSuccess
                    user={query.data}
                />
            </Mangadex_suspense>
        );
    }
    if(query.isError){
        throw query.error;
    }
    return (
        <Mangadex_suspense__/>
    );
}
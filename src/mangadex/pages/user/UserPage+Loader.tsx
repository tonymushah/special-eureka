import { Mangadex_suspense, Mangadex_suspense__ } from "@mangadex/index";
import { getUserByIDQuery } from "@mangadex/resources/hooks/UserPageHooks/getUserByIDQuery";
import React from "react";
import { useParams } from "react-router";

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

export { loader } from "./loader";
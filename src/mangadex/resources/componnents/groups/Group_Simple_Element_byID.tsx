import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Group } from "@mangadex/api/structures/Group";
import ErrorEL1 from "../error/ErrorEL1";
import GroupFallBackElement from "./GroupFallBackElement";

const Group_Simple_Element = React.lazy(() => import("./Group_Simple_Element"));

export default function Group_Simple_Element_ByID(props: {
    id: string
}) {
    // [x] Refactor into a function
    const query_key =  React.useMemo(() => queryKey(props), []);
    const query = useQuery<Group, Error>(query_key, () => {
        return Group.get_groupById(props.id);
    });
    if (query.isSuccess) {
        return (
            <React.Suspense
                fallback={
                    <GroupFallBackElement />
                }
            >
                <Group_Simple_Element
                    src={query.data}
                />
            </React.Suspense>
        );
    }
    if (query.isLoading) {
        return (
            <GroupFallBackElement />
        );
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    return (
        <React.Fragment />
    );
}

export function queryKey(props: { id: string; }) {
    return ["mdx", "groups", props.id];
}
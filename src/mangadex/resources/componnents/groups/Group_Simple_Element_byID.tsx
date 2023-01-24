import React from "react";
import { useQuery } from "react-query";
import { useHTTPClient } from "../../../../commons-res/components/HTTPClientProvider";
import { Group } from "../../../api/structures/Group";
import ErrorEL1 from "../error/ErrorEL1";
import GroupFallBackElement from "./GroupFallBackElement";

const Group_Simple_Element = React.lazy(() => import("./Group_Simple_Element"));

export default function Group_Simple_Element_ByID(props: {
    id: string
}) {
    const client = useHTTPClient();
    const query_key = "mdx-groups-" + props.id;
    const query = useQuery<Group, Error>(query_key, () => {
        return Group.get_groupById(props.id);
    });
    if (query.isLoading) {
        return (
            <GroupFallBackElement />
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    return (
        <React.Suspense
            fallback={
                <GroupFallBackElement />
            }
        >
            <Group_Simple_Element
                src={query.data!}
            />
        </React.Suspense>

    );
}
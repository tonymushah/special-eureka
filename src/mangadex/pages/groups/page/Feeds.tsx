import { Group_Page_Suspense } from "@mangadex/resources/componnents/groups/Group_Page/Group_Page_Suspense";
import React from "react";
import { useGroupRouteOutletContext } from ".";

const Group_Feeds = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Feeds"));

export default function Group_Feeds_Page() {
    const { group } = useGroupRouteOutletContext();
    return (
        <Group_Page_Suspense>
            <Group_Feeds id={group.get_id()} />
        </Group_Page_Suspense>
    );
}
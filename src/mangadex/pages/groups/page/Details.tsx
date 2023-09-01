import { Group_Page_Suspense } from "@mangadex/resources/componnents/groups/Group_Page/Group_Page_Suspense";
import React from "react";

const Group_Details = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Details"));

export default function Group_Details_Page() {
    return (
        <Group_Page_Suspense>
            <Group_Details />
        </Group_Page_Suspense>
    );
}
import { TabPanel } from "@chakra-ui/react";
import { Group_Page_Suspense } from "@mangadex/resources/componnents/groups/Group_Page";
import { useGroupRouteOutletContext } from ".";
import React from "react";

const Group_Details = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Details"));

export default function Group_Details_Page() {
    const { group } = useGroupRouteOutletContext();
    return (<TabPanel>
        <Group_Page_Suspense>
            <Group_Details src={group} />
        </Group_Page_Suspense>
    </TabPanel>);
}
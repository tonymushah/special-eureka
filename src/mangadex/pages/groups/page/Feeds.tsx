import { Group_Page_Suspense } from "@mangadex/resources/componnents/groups/Group_Page";
import { useGroupRouteOutletContext } from ".";
import { TabPanel } from "@chakra-ui/react";
import React from "react";

const Group_Feeds = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Feeds"));

export default function Group_Feeds_Page() {
    const { group } = useGroupRouteOutletContext();
    return (
        <TabPanel>
            <Group_Page_Suspense>
                <Group_Feeds id={group.get_id()} />
            </Group_Page_Suspense>
        </TabPanel>
    );
}
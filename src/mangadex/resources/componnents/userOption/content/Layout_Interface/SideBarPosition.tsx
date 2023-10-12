import * as Chakra from "@chakra-ui/react";
import React from "react";
import BasicTwoElement from "../Base";

const RtlSidebarOption = React.lazy(() => import("@mangadex/resources/componnents/userOption/utils/RTLSidebar"));

export function SideBarPosition() {
    return (
        <BasicTwoElement title="Sidebar Position">
            <React.Suspense
                fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
            >
                <RtlSidebarOption />
            </React.Suspense>
        </BasicTwoElement>
    );
}

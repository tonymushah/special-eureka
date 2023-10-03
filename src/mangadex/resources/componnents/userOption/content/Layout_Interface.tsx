import * as Chakra from "@chakra-ui/react";
import React from "react";
import { FiLayout } from "react-icons/fi";

const RtlSidebarOption = React.lazy(() => import("@mangadex/resources/componnents/userOption/RTLSidebar"));

const ColorMode = React.lazy(() => import("@mangadex/resources/componnents/userOption/utils/ColorMode"));

export function Layout_InterfaceTab() {
    return (
        <Chakra.Tab>
            <Chakra.HStack>
                <Chakra.Icon as={FiLayout} />
                <Chakra.Text as={"span"}>
                    Layout and interface
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Tab>
    );
}

export default function Layout_Interface() {
    return (
        <Chakra.TabPanel>
            <Chakra.VStack alignItems={"start"}>
                <Chakra.HStack>
                    <Chakra.Text as={"span"}>Sidebar Position : </Chakra.Text>
                    <React.Suspense
                        fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                    >
                        <RtlSidebarOption />
                    </React.Suspense>
                </Chakra.HStack>
                <Chakra.HStack>
                    <Chakra.Text as={"span"}>Color Mode : </Chakra.Text>
                    <React.Suspense
                        fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                    >
                        <ColorMode />
                    </React.Suspense>
                </Chakra.HStack>
            </Chakra.VStack>
        </Chakra.TabPanel>
    );
}
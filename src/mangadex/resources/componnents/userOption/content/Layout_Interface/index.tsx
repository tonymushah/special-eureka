import * as Chakra from "@chakra-ui/react";
import { FiLayout } from "react-icons/fi";
import { SideBarPosition } from "./SideBarPosition";
import { ColorModeOption } from "./ColorModeOption";

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
                <SideBarPosition />
                <ColorModeOption />
            </Chakra.VStack>
        </Chakra.TabPanel>
    );
}



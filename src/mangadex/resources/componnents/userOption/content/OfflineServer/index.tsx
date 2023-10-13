import * as Chakra from "@chakra-ui/react";
import { FiServer } from "react-icons/fi";
import ServerAutoStartPart from "./ServerAutoStartPart";
import TasksPart from "./TasksPart";
import ServerPart from "./ServerPart";

export function OfflineServerTab() {
    return (
        <Chakra.Tab>
            <Chakra.HStack>
                <Chakra.Icon as={FiServer} />
                <Chakra.Text as={"span"}>
                    Offline Server
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Tab>
    );
}

export default function OfflineServer() {
    return (
        <Chakra.TabPanel>
            <ServerPart />
            <ServerAutoStartPart />
            <TasksPart />
        </Chakra.TabPanel>
    );
}
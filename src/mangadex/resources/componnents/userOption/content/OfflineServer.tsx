import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { FiServer } from "react-icons/fi";

const ServerAutoStart = React.lazy(() => import("@mangadex/resources/componnents/userOption/utils/ServerAutoStart"));

const Tasks = React.lazy(() => import("@mangadex/resources/componnents/userOption/utils/ServerTasksInfo"));

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
            <Chakra.HStack>
                <Chakra.Text as={"span"}>Server Auto Start : <Chakra.Tooltip
                    label={"The server will start before the Mangadex Page is loaded. Only works after the page refresh"}
                >
                    <ChakraIcons.QuestionIcon />
                </Chakra.Tooltip></Chakra.Text>
                <React.Suspense
                    fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                >
                    <ServerAutoStart />
                </React.Suspense>
            </Chakra.HStack>
            <Chakra.HStack>
                <Chakra.Text as={"span"}>Tasks&nbsp;:</Chakra.Text>
                <Chakra.Box display={"block"} width={"100%"}>
                    <React.Suspense
                        fallback={<Chakra.Progress isIndeterminate />}
                    >
                        <Tasks />
                    </React.Suspense>
                </Chakra.Box>
            </Chakra.HStack>
        </Chakra.TabPanel>
    );
}
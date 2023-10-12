import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import BasicTwoElement from "../Base";

const ServerAutoStart = React.lazy(() => import("@mangadex/resources/componnents/userOption/utils/ServerAutoStart"));

export default function ServerAutoStartPart() {
    return (
        <BasicTwoElement title="Server Auto Start">
            <Chakra.Tooltip
                label={"The server will start before the Mangadex Page is loaded. Only works after the page refresh"}
            >
                <ChakraIcons.QuestionIcon />
            </Chakra.Tooltip>
            <React.Suspense
                fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
            >
                <ServerAutoStart />
            </React.Suspense>
        </BasicTwoElement>
    );
}

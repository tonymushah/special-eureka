import React from "react";
import * as Chakra from "@chakra-ui/react";
import { writeText } from "@tauri-apps/api/clipboard";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { useGroupRouteOutletContext } from "@mangadex/pages/groups/page";


export function IrcChannel() {
    const { group: src } = useGroupRouteOutletContext();
    const toast = useChakraToast({
        position: "bottom-right",
        duration: 9000,
        isClosable: true
    });
    const ircChannel = React.useMemo(() => src.get_ircChannel(), [src]);
    if (ircChannel != undefined && ircChannel != null) {
        return (
            <Chakra.Button onClick={() => {
                writeText(ircChannel).then(() => {
                    toast({
                        status: "success",
                        title: "IrcChannel copied to clipboard"
                    });
                }).catch(() => {
                    toast({
                        status: "error",
                        title: "Error on copying IrcChannel to clipboard"
                    });
                });
            }}>IrcChannel</Chakra.Button>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}

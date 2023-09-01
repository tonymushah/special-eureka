import React from "react";
import * as Chakra from "@chakra-ui/react";
import { writeText } from "@tauri-apps/api/clipboard";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { useGroupRouteOutletContext } from "@mangadex/pages/groups/page";


export function IrcServer() {
    const toast = useChakraToast({
        position: "bottom-right",
        duration: 9000,
        isClosable: true
    });
    const { group: src } = useGroupRouteOutletContext();
    const ircServer = React.useMemo(() => src.get_ircServer(), [src]);
    if (ircServer != undefined && ircServer != null) {
        return (
            <Chakra.Button onClick={() => {
                writeText(ircServer).then(() => {
                    toast({
                        status: "success",
                        title: "IrcServer copied to clipboard"
                    });
                }).catch(() => {
                    toast({
                        status: "error",
                        title: "Error on copying IrcServer to clipboard"
                    });
                });
            }}>IrcServer</Chakra.Button>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}

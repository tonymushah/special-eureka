import React from "react";
import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { writeText } from "@tauri-apps/api/clipboard";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { useGroupRouteOutletContext } from "@mangadex/pages/groups/page";


export function ContactEmail() {
    const { group: src } = useGroupRouteOutletContext();
    const contactEmail = React.useMemo(() => src.get_contactEmail(), [src]);
    const toast = useChakraToast({
        position: "bottom-right",
        duration: 9000,
        isClosable: true
    });
    if (contactEmail != undefined && contactEmail != null) {
        return (
            <Chakra.Button onClick={() => {
                writeText(contactEmail).then(() => {
                    toast({
                        status: "success",
                        title: "Email copied to clipboard"
                    });
                }).catch(() => {
                    toast({
                        status: "error",
                        title: "Error on copying to clipboard"
                    });
                });
            }}
                leftIcon={<ChakraIcon.EmailIcon />}
            >
                Email
            </Chakra.Button>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}

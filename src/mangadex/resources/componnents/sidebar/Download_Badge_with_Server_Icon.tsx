import React from "react";
import MangaManagerState from "../../hooks/MangaManagerState";
import * as Chakra from "@chakra-ui/react";
import { FaServer } from "react-icons/fa";



export default function Downloads_badge_With_Server_Icon() {
    const server_state = MangaManagerState()
    const toast = Chakra.useToast();
    const toastIdRef = React.useRef<Chakra.ToastId>();
    server_state.server_query.isRefetching ? toastIdRef.current = toast({
        title: "Sending operation...",
        status: "loading",
        position: "bottom-right"
    })! : null;
    server_state.server_query.data == true ? toast.update(toastIdRef.current!, {
        title: "Server Started",
        isClosable: true,
        duration: 9000,
        status: "success"
    }) : null;
    server_state.server_query.data == false ? toast.update(toastIdRef.current!, {
        title: "Server Stopped",
        isClosable: true,
        duration: 9000,
        status: "success"
    }) : null;

    return (
        <Chakra.Icon
            as={FaServer}
            onClick={() => {
                server_state.switch_server_state.mutate()
            }}
            color={server_state.server_query.data == true ? (
                'green.500'
            ) : (
                'red.500'
            )
            }
        />
    )
}

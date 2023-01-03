import React from "react";
import MangaManagerState from "../../hooks/MangaManagerState";
import * as Chakra from "@chakra-ui/react";

export default function Downloads_badge_(){
    const server_state = MangaManagerState()
    const toast = Chakra.useToast();
    const toastIdRef = React.useRef<Chakra.ToastId>();
    server_state.server_query.isRefetching ? toastIdRef.current = toast({
        title: "Sending operation...",
        status: "loading",
        position: "bottom-right"
    })! : null;
    server_state.server_query.data == true? toast.update(toastIdRef.current!, {
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
        <Chakra.Box onClick={() => {
            server_state.switch_server_state.mutate()
        }}>
            {
                server_state.server_query.data == true ? (
                    <Chakra.Badge bg='green.500'>ON</Chakra.Badge>
                ) : (
                    <Chakra.Badge bg='red.500'>OFF</Chakra.Badge>
                )
            }
        </Chakra.Box>
    )
}

import React from "react";
import MangaManagerState from "../../hooks/MangaManagerState";
import * as Chakra from "@chakra-ui/react";



export default function Downloads_badge_(){
    const server_state = MangaManagerState();
    return (
        <Chakra.Box onClick={() => {
            server_state.switch_server_state.mutate();
        }}>
            {
                server_state.server_query.data == true ? (
                    <Chakra.Badge bg='green.500'>ON</Chakra.Badge>
                ) : (
                    <Chakra.Badge bg='red.500'>OFF</Chakra.Badge>
                )
            }
        </Chakra.Box>
    );
}
